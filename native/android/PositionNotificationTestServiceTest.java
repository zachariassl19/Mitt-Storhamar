package no.zacharias.mittstorhamar;

import static org.junit.Assert.*;

import android.Manifest;
import android.app.Application;
import android.app.KeyguardManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.location.LocationManager;
import android.os.Looper;
import android.os.PowerManager;
import android.os.SystemClock;

import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.Shadows;
import org.robolectric.android.controller.ServiceController;
import org.robolectric.annotation.Config;
import org.robolectric.annotation.LooperMode;
import org.robolectric.shadows.ShadowGeocoder;
import org.robolectric.shadows.ShadowPowerManager;

import java.time.Duration;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 33, application = Application.class)
@LooperMode(LooperMode.Mode.PAUSED)
public class PositionNotificationTestServiceTest {
    private Application app;
    private ServiceController<PositionNotificationTestService> controller;
    private PositionNotificationTestService service;
    private LocationManager locationManager;
    private NotificationManager notifications;
    private SharedPreferences prefs;

    @Before
    public void setup() {
        app = RuntimeEnvironment.getApplication();
        Shadows.shadowOf(app).grantPermissions(Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION, Manifest.permission.POST_NOTIFICATIONS, Manifest.permission.WAKE_LOCK);
        locationManager = app.getSystemService(LocationManager.class);
        notifications = app.getSystemService(NotificationManager.class);
        prefs = app.getSharedPreferences(PositionNotificationTestService.PREFS, Context.MODE_PRIVATE);
        Shadows.shadowOf(locationManager).setProviderEnabled(LocationManager.GPS_PROVIDER, true);
        Shadows.shadowOf(locationManager).setProviderEnabled(LocationManager.NETWORK_PROVIDER, true);
        Shadows.shadowOf(app.getSystemService(PowerManager.class)).setIsInteractive(true);
        Shadows.shadowOf(app.getSystemService(KeyguardManager.class)).setIsKeyguardLocked(false);
        ShadowGeocoder.setIsPresent(false);
        // Give old and new measurements distinct monotonic timestamps.
        advance(1);
        controller = Robolectric.buildService(PositionNotificationTestService.class).create();
        service = controller.get();
    }

    @After
    public void tearDown() {
        controller.destroy();
    }

    private void start() {
        service.onStartCommand(new Intent(app, PositionNotificationTestService.class)
            .putExtra("scheduledAt", System.currentTimeMillis()), 0, 1);
    }

    private void advance(long seconds) {
        Shadows.shadowOf(Looper.getMainLooper()).idleFor(Duration.ofSeconds(seconds));
    }

    private JSONObject status() throws Exception {
        return new JSONObject(prefs.getString("status", "{}"));
    }

    private Notification result() {
        return Shadows.shadowOf(notifications).getNotification(PositionNotificationTestService.RESULT_ID);
    }

    private Location fix(long elapsedNanos) {
        Location location = new Location(LocationManager.GPS_PROVIDER);
        location.setLatitude(59.10012);
        location.setLongitude(11.20045);
        location.setAccuracy(12);
        location.setTime(System.currentTimeMillis());
        location.setElapsedRealtimeNanos(elapsedNanos);
        return location;
    }

    @Test
    public void countdownWaitsFiveSecondsAndContinuesWithTheScreenLocked() throws Exception {
        start();
        Shadows.shadowOf(app.getSystemService(PowerManager.class)).setIsInteractive(false);
        advance(4);
        assertNull("No result notification before the requested delay", result());
        advance(1);
        assertNotNull("The phone posts a test notification at five seconds", result());
        assertEquals("waiting", status().getString("state"));
        Shadows.shadowOf(locationManager).simulateLocation(fix(SystemClock.elapsedRealtimeNanos()));
        Shadows.shadowOf(Looper.getMainLooper()).idle();
        assertEquals("sent", status().getString("state"));
        assertTrue(status().getBoolean("measuredWithScreenLocked"));
        assertTrue(result().extras.getString(Notification.EXTRA_TEXT).contains("59.10012, 11.20045"));
        assertTrue(result().extras.getString(Notification.EXTRA_TEXT).contains("skjermen var låst"));
        assertFalse(status().getBoolean("running"));
        assertFalse(ShadowPowerManager.getLatestWakeLock().isHeld());
    }

    @Test
    public void aPointFromBeforeTheTestDoesNotCountAsSuccessfulBackgroundGps() throws Exception {
        long beforeTest = SystemClock.elapsedRealtimeNanos() - 500_000_000L;
        start();
        Shadows.shadowOf(app.getSystemService(PowerManager.class)).setIsInteractive(false);
        advance(5);
        Shadows.shadowOf(locationManager).simulateLocation(fix(beforeTest));
        Shadows.shadowOf(Looper.getMainLooper()).idle();
        assertEquals("waiting", status().getString("state"));
        assertFalse(status().has("latitude"));
        advance(25);
        assertEquals("error", status().getString("state"));
        assertFalse(status().getBoolean("running"));
        assertFalse(ShadowPowerManager.getLatestWakeLock().isHeld());
    }

    @Test
    public void anUnlockedMeasurementDoesNotProveGpsWorksAfterLocking() throws Exception {
        start();
        advance(1);
        Shadows.shadowOf(locationManager).simulateLocation(fix(SystemClock.elapsedRealtimeNanos()));
        Shadows.shadowOf(Looper.getMainLooper()).idle();
        Shadows.shadowOf(app.getSystemService(PowerManager.class)).setIsInteractive(false);
        advance(4);
        assertEquals("waiting", status().getString("state"));
        advance(1);
        Shadows.shadowOf(locationManager).simulateLocation(fix(SystemClock.elapsedRealtimeNanos()));
        Shadows.shadowOf(Looper.getMainLooper()).idle();
        assertEquals("sent", status().getString("state"));
        assertTrue(status().getBoolean("measuredWithScreenLocked"));
    }

    @Test
    public void gpsDisabledPostsAnHonestFailureAfterFiveSeconds() throws Exception {
        Shadows.shadowOf(locationManager).setProviderEnabled(LocationManager.GPS_PROVIDER, false);
        Shadows.shadowOf(locationManager).setProviderEnabled(LocationManager.NETWORK_PROVIDER, false);
        start();
        advance(4);
        assertNull(result());
        advance(1);
        assertEquals("error", status().getString("state"));
        assertTrue(result().extras.getString(Notification.EXTRA_TEXT).contains("posisjon er slått av"));
        assertFalse(status().getBoolean("running"));
    }

    @Test
    public void theTestLeavesExistingMatchTrackingAndEventsAlone() throws Exception {
        SharedPreferences match = app.getSharedPreferences("mitt_storhamar_native_gameday", Context.MODE_PRIVATE);
        match.edit().putBoolean("running", true).putString("gameId", "existing-game")
            .putString("events", "[{\"type\":\"near_arena\"}]").commit();
        start();
        advance(5);
        Shadows.shadowOf(locationManager).simulateLocation(fix(SystemClock.elapsedRealtimeNanos()));
        Shadows.shadowOf(Looper.getMainLooper()).idle();
        assertEquals("sent", status().getString("state"));
        assertTrue(match.getBoolean("running", false));
        assertEquals("existing-game", match.getString("gameId", null));
        assertEquals("[{\"type\":\"near_arena\"}]", match.getString("events", null));
    }

    @Test
    public void aKilledTestIsNotRestartedWithoutAnotherUserAction() throws Exception {
        assertEquals(android.app.Service.START_NOT_STICKY, service.onStartCommand(null, 0, 1));
        advance(35);
        assertNull(result());
    }
}
