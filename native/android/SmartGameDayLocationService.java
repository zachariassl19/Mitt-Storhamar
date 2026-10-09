package no.zacharias.mittstorhamar;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ServiceInfo;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class SmartGameDayLocationService extends Service implements LocationListener {
    public static final String ACTION_START = "no.zacharias.mittstorhamar.START_SMART_GAMEDAY";
    public static final String ACTION_STOP = "no.zacharias.mittstorhamar.STOP_SMART_GAMEDAY";

    private static final String CHANNEL_ID = "smart_gameday_location";
    private static final int NOTIFICATION_ID = 2601;
    private static final String PREFS = "mitt_storhamar_native_gameday";

    private LocationManager locationManager;
    private SharedPreferences prefs;

    private String gameId;
    private String arenaId;
    private String arenaName;
    private double arenaLat;
    private double arenaLon;
    private int nearRadiusMeters;
    private int arrivalRadiusMeters;
    private String proximity = "outside";

    @Override
    public void onCreate() {
        super.onCreate();
        prefs = getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent != null ? intent.getAction() : null;

        if (ACTION_STOP.equals(action)) {
            stopTracking();
            stopForeground(true);
            stopSelf();
            return START_NOT_STICKY;
        }

        if (intent != null && ACTION_START.equals(action)) {
            saveConfig(intent);
        } else {
            loadConfig();
        }

        if (gameId == null || arenaId == null) {
            stopSelf();
            return START_NOT_STICKY;
        }

        proximity = prefs.getString("proximity", "outside");
        prefs.edit().putBoolean("running", true).apply();

        Notification notification = buildNotification("Starter GPS for " + arenaName + "…");
        if (Build.VERSION.SDK_INT >= 29) {
            startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION);
        } else {
            startForeground(NOTIFICATION_ID, notification);
        }

        requestUpdates();
        return START_STICKY;
    }

    private void saveConfig(Intent intent) {
        gameId = intent.getStringExtra("gameId");
        arenaId = intent.getStringExtra("arenaId");
        arenaName = intent.getStringExtra("arenaName");
        arenaLat = intent.getDoubleExtra("arenaLat", 0);
        arenaLon = intent.getDoubleExtra("arenaLon", 0);
        nearRadiusMeters = intent.getIntExtra("nearRadiusMeters", 1000);
        arrivalRadiusMeters = intent.getIntExtra("arrivalRadiusMeters", 250);

        prefs.edit()
            .putString("gameId", gameId)
            .putString("arenaId", arenaId)
            .putString("arenaName", arenaName)
            .putLong("arenaLatBits", Double.doubleToRawLongBits(arenaLat))
            .putLong("arenaLonBits", Double.doubleToRawLongBits(arenaLon))
            .putInt("nearRadiusMeters", nearRadiusMeters)
            .putInt("arrivalRadiusMeters", arrivalRadiusMeters)
            .apply();
    }

    private void loadConfig() {
        gameId = prefs.getString("gameId", null);
        arenaId = prefs.getString("arenaId", null);
        arenaName = prefs.getString("arenaName", "Arena");
        arenaLat = Double.longBitsToDouble(prefs.getLong("arenaLatBits", Double.doubleToRawLongBits(0)));
        arenaLon = Double.longBitsToDouble(prefs.getLong("arenaLonBits", Double.doubleToRawLongBits(0)));
        nearRadiusMeters = prefs.getInt("nearRadiusMeters", 1000);
        arrivalRadiusMeters = prefs.getInt("arrivalRadiusMeters", 250);
    }

    @SuppressWarnings("MissingPermission")
    private void requestUpdates() {
        if (locationManager == null) return;
        try {
            if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10_000L, 10f, this);
            }
            if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 15_000L, 20f, this);
            }
        } catch (SecurityException error) {
            prefs.edit().putBoolean("running", false).apply();
            stopSelf();
        }
    }

    @Override
    public void onLocationChanged(Location location) {
        float[] result = new float[1];
        Location.distanceBetween(
            location.getLatitude(),
            location.getLongitude(),
            arenaLat,
            arenaLon,
            result
        );

        double distance = result[0];
        double accuracy = Math.max(0, location.getAccuracy());
        String previous = proximity;
        String next = classify(distance, accuracy, previous);
        boolean reliable = accuracy <= Math.min(300.0, nearRadiusMeters / 2.0);

        proximity = next;
        String observedAt = isoTime(location.getTime());

        prefs.edit()
            .putString("proximity", next)
            .putInt("distanceMeters", (int) Math.round(distance))
            .putInt("accuracyMeters", (int) Math.round(accuracy))
            .putString("observedAt", observedAt)
            .putBoolean("reliable", reliable)
            .putBoolean("running", true)
            .apply();

        if (reliable) {
            String eventType = transitionEvent(previous, next);
            if (eventType != null) appendEvent(eventType, distance, accuracy, observedAt);
        }

        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) manager.notify(NOTIFICATION_ID, buildNotification(statusText(next, distance, accuracy, reliable)));
    }

    private String classify(double distance, double accuracy, String previous) {
        if (distance + accuracy <= arrivalRadiusMeters) return "arrived";
        if (distance + accuracy <= nearRadiusMeters) return "near";
        if (distance - accuracy > nearRadiusMeters) return "outside";
        return previous;
    }

    private String transitionEvent(String previous, String next) {
        if ("arrived".equals(next) && !"arrived".equals(previous)) return "arrived_at_arena";
        if ("near".equals(next) && "outside".equals(previous)) return "near_arena";
        if ("outside".equals(next) && !"outside".equals(previous)) return "left_arena";
        return null;
    }

    private void appendEvent(String type, double distance, double accuracy, String observedAt) {
        try {
            JSONArray events = new JSONArray(prefs.getString("events", "[]"));
            JSONObject event = new JSONObject();
            event.put("gameId", gameId);
            event.put("arenaId", arenaId);
            event.put("type", type);
            event.put("observedAt", observedAt);
            event.put("distanceMeters", Math.round(distance));
            event.put("accuracyMeters", Math.round(accuracy));
            events.put(event);

            // Hold køen liten selv hvis appen ikke åpnes på lenge.
            JSONArray trimmed = new JSONArray();
            int start = Math.max(0, events.length() - 30);
            for (int i = start; i < events.length(); i++) trimmed.put(events.get(i));
            prefs.edit().putString("events", trimmed.toString()).apply();
        } catch (Exception ignored) {
        }
    }

    private String statusText(String state, double distance, double accuracy, boolean reliable) {
        String place;
        if ("arrived".equals(state)) place = "Ved " + arenaName;
        else if ("near".equals(state)) place = "Nær " + arenaName;
        else if (distance < 1000) place = Math.round(distance) + " m fra " + arenaName;
        else place = String.format(Locale.getDefault(), "%.1f km fra %s", distance / 1000.0, arenaName);

        if (!reliable) return place + " · svak GPS ±" + Math.round(accuracy) + " m";
        return place + " · Smart Kampdag følger posisjonen";
    }

    private Notification buildNotification(String text) {
        Intent openIntent = new Intent(this, MainActivity.class);
        openIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this,
            2601,
            openIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Notification.Builder builder = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
            ? new Notification.Builder(this, CHANNEL_ID)
            : new Notification.Builder(this);

        return builder
            .setContentTitle("Mitt Storhamar · Smart Kampdag")
            .setContentText(text)
            .setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setCategory(Notification.CATEGORY_SERVICE)
            .build();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationChannel channel = new NotificationChannel(
            CHANNEL_ID,
            "Smart Kampdag",
            NotificationManager.IMPORTANCE_LOW
        );
        channel.setDescription("Vises mens Mitt Storhamar følger posisjonen på kampdag.");
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null) manager.createNotificationChannel(channel);
    }

    private String isoTime(long millis) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
        format.setTimeZone(TimeZone.getTimeZone("UTC"));
        return format.format(new Date(millis));
    }

    private void stopTracking() {
        if (locationManager != null) {
            try {
                locationManager.removeUpdates(this);
            } catch (SecurityException ignored) {
            }
        }
        prefs.edit().putBoolean("running", false).apply();
    }

    @Override
    public void onDestroy() {
        stopTracking();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onProviderEnabled(String provider) {
    }

    @Override
    public void onProviderDisabled(String provider) {
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
    }
}
