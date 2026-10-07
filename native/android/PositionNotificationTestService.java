package no.zacharias.mittstorhamar;

import android.app.KeyguardManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;
import android.os.SystemClock;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

/** A short, user-started test. Its lifetime and data are independent of match tracking. */
public class PositionNotificationTestService extends Service implements LocationListener {
    public static final String PREFS = "mitt_storhamar_position_test";
    public static final String RESULT_CHANNEL = "position_notification_test";
    public static final long DELAY_MS = 5_000L;
    static final int RESULT_ID = 2603;
    private static final String SERVICE_CHANNEL = "position_test_progress";
    private static final int SERVICE_ID = 2602;
    private static final long GPS_TIMEOUT_MS = 25_000L;

    private final Handler handler = new Handler(Looper.getMainLooper());
    private LocationManager locationManager;
    private NotificationManager notificationManager;
    private SharedPreferences prefs;
    private PowerManager.WakeLock wakeLock;
    private JSONObject status = new JSONObject();
    private Location latest;
    private boolean latestMeasuredWithScreenLocked;
    private boolean deadlineReached;
    private boolean started;
    private boolean completed;
    private boolean finished;
    private long startedElapsedNanos;
    private long lockedSinceNanos = Long.MAX_VALUE;
    private boolean screenReceiverRegistered;
    private String locationError;
    private final BroadcastReceiver screenReceiver = new BroadcastReceiver() {
        @Override public void onReceive(Context context, Intent intent) { screenLocked(); }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        locationManager = getSystemService(LocationManager.class);
        notificationManager = getSystemService(NotificationManager.class);
        createChannels(this);
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        filter.addAction(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_USER_PRESENT);
        if (Build.VERSION.SDK_INT >= 33) registerReceiver(screenReceiver, filter, Context.RECEIVER_NOT_EXPORTED);
        else registerReceiver(screenReceiver, filter);
        screenReceiverRegistered = true;
    }

    public static void createChannels(Context context) {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager == null) return;
        manager.createNotificationChannel(new NotificationChannel(
            SERVICE_CHANNEL, "Posisjonstest pågår", NotificationManager.IMPORTANCE_LOW));
        NotificationChannel result = new NotificationChannel(
            RESULT_CHANNEL, "Test av posisjon og varsler", NotificationManager.IMPORTANCE_HIGH);
        result.setDescription("Testvarsel med telefonens ferske posisjon etter fem sekunder.");
        manager.createNotificationChannel(result);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Never restart a previous test following process death or a phone reboot.
        if (intent == null) {
            stopSelf();
            return START_NOT_STICKY;
        }
        if (started) return START_NOT_STICKY;
        started = true;
        startedElapsedNanos = SystemClock.elapsedRealtimeNanos();
        screenLocked();
        long scheduledAt = intent.getLongExtra("scheduledAt", System.currentTimeMillis());
        put("state", "scheduled");
        put("running", true);
        put("scheduledAt", scheduledAt);
        put("dueAt", scheduledAt + DELAY_MS);
        saveStatus();

        try {
            Notification notification = notification(SERVICE_CHANNEL,
                "Posisjonstest starter om 5 sekunder", "Lås skjermen nå. Testen fortsetter på telefonen.", true, null);
            if (Build.VERSION.SDK_INT >= 29) {
                startForeground(SERVICE_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION);
            } else startForeground(SERVICE_ID, notification);

            PowerManager power = getSystemService(PowerManager.class);
            if (power != null) {
                wakeLock = power.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MittStorhamar:PositionTest");
                wakeLock.acquire(DELAY_MS + GPS_TIMEOUT_MS + 5_000L);
            }
            requestFreshUpdates();
            handler.postDelayed(this::onDeadline, DELAY_MS);
        } catch (Exception error) {
            fail("Kunne ikke starte GPS-testen. Kontroller posisjonstillatelsen og prøv igjen.", false);
        }
        return START_NOT_STICKY;
    }

    @SuppressWarnings("MissingPermission")
    private void requestFreshUpdates() {
        boolean requested = false;
        if (locationManager != null) {
            for (String provider : new String[] { LocationManager.GPS_PROVIDER, LocationManager.NETWORK_PROVIDER }) {
                try {
                    if (locationManager.isProviderEnabled(provider)) {
                        locationManager.requestLocationUpdates(provider, 0L, 0f, this, Looper.getMainLooper());
                        requested = true;
                    }
                } catch (SecurityException error) {
                    locationError = "Posisjonstillatelsen mangler. Tillat posisjon og prøv igjen.";
                } catch (IllegalArgumentException ignored) {
                    // Some devices have only one of these providers.
                }
            }
        }
        if (requested) locationError = null;
        else if (locationError == null) {
            locationError = "Telefonens posisjon er slått av. Slå den på og prøv igjen.";
        }
    }

    private void onDeadline() {
        if (finished) return;
        deadlineReached = true;
        if (locationError != null) {
            fail(locationError, true);
            return;
        }
        if (hasUsableFix()) {
            completeWithPosition();
            return;
        }
        put("state", "waiting");
        put("body", "5 sekunder har gått. Venter på en fersk posisjon fra telefonen…");
        saveStatus();
        notificationManager.notify(RESULT_ID, notification(RESULT_CHANNEL,
            "Mitt Storhamar · Posisjonstest", status.optString("body"), false, null));
        handler.postDelayed(() -> fail(
            "Varseltesten kjørte men telefonen fant ikke en fersk posisjon. Kontroller GPS og prøv igjen.", true), GPS_TIMEOUT_MS);
    }

    @Override
    public void onLocationChanged(Location location) {
        if (finished || completed || location == null) return;
        // A cached point predating this test cannot prove background GPS works.
        if (location.getElapsedRealtimeNanos() < startedElapsedNanos) return;
        if (!Double.isFinite(location.getLatitude()) || !Double.isFinite(location.getLongitude())
            || Math.abs(location.getLatitude()) > 90 || Math.abs(location.getLongitude()) > 180) return;
        if (latest != null && location.getElapsedRealtimeNanos() < latest.getElapsedRealtimeNanos()) return;
        latest = new Location(location);
        latestMeasuredWithScreenLocked = screenLocked() && location.getElapsedRealtimeNanos() >= lockedSinceNanos;
        if (deadlineReached && hasUsableFix()) completeWithPosition();
    }

    private boolean hasUsableFix() {
        if (latest == null) return false;
        if (SystemClock.elapsedRealtimeNanos() - latest.getElapsedRealtimeNanos() > 10_000_000_000L) return false;
        // If the screen is now locked, wait for a point actually received while locked.
        return !screenLocked() || latestMeasuredWithScreenLocked;
    }

    private boolean screenLocked() {
        PowerManager power = getSystemService(PowerManager.class);
        KeyguardManager keyguard = getSystemService(KeyguardManager.class);
        boolean locked = (power != null && !power.isInteractive()) || (keyguard != null && keyguard.isKeyguardLocked());
        if (locked && lockedSinceNanos == Long.MAX_VALUE) lockedSinceNanos = SystemClock.elapsedRealtimeNanos();
        if (!locked) lockedSinceNanos = Long.MAX_VALUE;
        return locked;
    }

    private void completeWithPosition() {
        if (finished || completed) return;
        completed = true;
        handler.removeCallbacksAndMessages(null);
        removeLocationUpdates();
        put("state", "sent");
        put("latitude", latest.getLatitude());
        put("longitude", latest.getLongitude());
        if (latest.hasAccuracy()) put("accuracyMeters", Math.round(latest.getAccuracy()));
        put("measuredAt", latest.getTime());
        put("measuredWithScreenLocked", latestMeasuredWithScreenLocked);
        put("screenLockedAtNotification", screenLocked());
        sendPositionResult(null);

        // Coordinates are delivered immediately. An address is optional and bounded.
        if (Build.VERSION.SDK_INT >= 33 && Geocoder.isPresent()) {
            handler.postDelayed(this::finish, 3_000L);
            try {
                new Geocoder(this, Locale.getDefault()).getFromLocation(
                    latest.getLatitude(), latest.getLongitude(), 1, new Geocoder.GeocodeListener() {
                        @Override
                        public void onGeocode(List<Address> addresses) {
                            handler.post(() -> {
                                if (finished) return;
                                if (!addresses.isEmpty()) {
                                    Address address = addresses.get(0);
                                    String line = address.getAddressLine(0);
                                    if (line != null && !line.isEmpty()) sendPositionResult(line);
                                }
                                finish();
                            });
                        }

                        @Override
                        public void onError(String errorMessage) {
                            handler.post(PositionNotificationTestService.this::finish);
                        }
                    });
                return;
            } catch (Exception ignored) {
            }
        }
        finish();
    }

    private void sendPositionResult(String address) {
        String coordinates = String.format(Locale.US, "%.5f, %.5f", latest.getLatitude(), latest.getLongitude());
        String accuracy = latest.hasAccuracy() ? " ±" + Math.round(latest.getAccuracy()) + " m" : " · ukjent nøyaktighet";
        String time = new SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(new Date(latest.getTime()));
        String body = (address == null ? "Posisjon: " : address + "\nGPS: ") + coordinates + accuracy
            + "\nMålt kl. " + time + " · " + (latestMeasuredWithScreenLocked ? "skjermen var låst" : "skjermen var på");
        put("body", body);
        saveStatus();
        Intent map = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:" + coordinates.replace(" ", "") + "?q=" + coordinates.replace(" ", "")));
        if (map.resolveActivity(getPackageManager()) == null) map = new Intent(this, MainActivity.class);
        PendingIntent open = PendingIntent.getActivity(this, RESULT_ID, map,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        notificationManager.notify(RESULT_ID, notification(RESULT_CHANNEL,
            "Mitt Storhamar · Posisjonstest", body, false, open));
    }

    private void fail(String message, boolean showNotification) {
        if (finished) return;
        put("state", "error");
        put("error", message);
        put("body", message);
        saveStatus();
        if (showNotification && notificationManager != null) {
            notificationManager.notify(RESULT_ID, notification(RESULT_CHANNEL,
                "Mitt Storhamar · Posisjonstest", message, false, null));
        }
        finish();
    }

    private Notification notification(String channel, String title, String body, boolean ongoing, PendingIntent open) {
        if (open == null) {
            open = PendingIntent.getActivity(this, SERVICE_ID, new Intent(this, MainActivity.class),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        }
        Notification.Builder builder = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(this, channel) : new Notification.Builder(this);
        return builder.setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setContentTitle(title).setContentText(body)
            .setStyle(new Notification.BigTextStyle().bigText(body))
            .setContentIntent(open).setOngoing(ongoing).setAutoCancel(!ongoing)
            .setOnlyAlertOnce(true).setVisibility(Notification.VISIBILITY_PRIVATE)
            .setCategory(ongoing ? Notification.CATEGORY_SERVICE : Notification.CATEGORY_STATUS)
            .setPriority(ongoing ? Notification.PRIORITY_LOW : Notification.PRIORITY_HIGH).build();
    }

    private void put(String key, Object value) {
        try { status.put(key, value); } catch (Exception ignored) { }
    }

    private void saveStatus() {
        prefs.edit().putString("status", status.toString()).apply();
    }

    private void removeLocationUpdates() {
        if (locationManager == null) return;
        try { locationManager.removeUpdates(this); } catch (SecurityException ignored) { }
    }

    private void finish() {
        if (finished) return;
        finished = true;
        handler.removeCallbacksAndMessages(null);
        removeLocationUpdates();
        if (wakeLock != null && wakeLock.isHeld()) wakeLock.release();
        put("running", false);
        saveStatus();
        stopForeground(true);
        stopSelf();
    }

    @Override
    public void onDestroy() {
        if (!finished && started) {
            put("state", "error");
            put("error", "Posisjonstesten ble avbrutt. Åpne appen og prøv igjen.");
        }
        finish();
        if (screenReceiverRegistered) unregisterReceiver(screenReceiver);
        super.onDestroy();
    }

    @Override public IBinder onBind(Intent intent) { return null; }
    @Override public void onProviderEnabled(String provider) { }
    @Override public void onProviderDisabled(String provider) { }
    @Override public void onStatusChanged(String provider, int status, Bundle extras) { }
}
