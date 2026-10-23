package no.zacharias.mittstorhamar;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONArray;
import org.json.JSONObject;

@CapacitorPlugin(
    name = "NativeSmartGameDay",
    permissions = {
        @Permission(
            alias = "location",
            strings = {
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION
            }
        ),
        @Permission(alias = "notifications", strings = { Manifest.permission.POST_NOTIFICATIONS })
    }
)
public class NativeSmartGameDayPlugin extends Plugin {
    private static final String PREFS = "mitt_storhamar_native_gameday";

    @PluginMethod
    public void startPositionNotificationTest(PluginCall call) {
        if (!hasTestLocationPermission()) {
            requestPermissionForAlias("location", call, "testLocationPermissionCallback");
            return;
        }
        requestTestNotificationPermission(call);
    }

    @PermissionCallback
    private void testLocationPermissionCallback(PluginCall call) {
        if (!hasTestLocationPermission()) {
            call.reject("Tillat posisjon for å teste GPS og varsler.");
            return;
        }
        requestTestNotificationPermission(call);
    }

    private boolean hasTestLocationPermission() {
        return getContext().checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
            || getContext().checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestTestNotificationPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33 && getPermissionState("notifications") != PermissionState.GRANTED) {
            requestPermissionForAlias("notifications", call, "testNotificationPermissionCallback");
            return;
        }
        launchPositionNotificationTest(call);
    }

    @PermissionCallback
    private void testNotificationPermissionCallback(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33 && getPermissionState("notifications") != PermissionState.GRANTED) {
            call.reject("Tillat varsler for Mitt Storhamar i telefonens appinnstillinger.");
            return;
        }
        launchPositionNotificationTest(call);
    }

    private void launchPositionNotificationTest(PluginCall call) {
        Context context = getContext();
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager == null || !manager.areNotificationsEnabled()) {
            call.reject("Varsler er blokkert. Tillat dem i telefonens appinnstillinger.");
            return;
        }
        PositionNotificationTestService.createChannels(context);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = manager.getNotificationChannel(PositionNotificationTestService.RESULT_CHANNEL);
            if (channel != null && channel.getImportance() == NotificationManager.IMPORTANCE_NONE) {
                call.reject("Posisjonstest-varsler er blokkert i telefonens appinnstillinger.");
                return;
            }
        }

        JSObject previous = readPositionTestStatus();
        SharedPreferences testPrefs = context.getSharedPreferences(PositionNotificationTestService.PREFS, Context.MODE_PRIVATE);
        if (previous.optBoolean("running", false)
            && System.currentTimeMillis() - previous.optLong("scheduledAt", 0) < 45_000L) {
            call.resolve(previous);
            return;
        }

        long scheduledAt = System.currentTimeMillis();
        JSObject result = new JSObject();
        result.put("state", "scheduled");
        result.put("running", true);
        result.put("scheduledAt", scheduledAt);
        result.put("dueAt", scheduledAt + PositionNotificationTestService.DELAY_MS);
        testPrefs.edit().putString("status", result.toString()).apply();

        try {
            Intent intent = new Intent(context, PositionNotificationTestService.class);
            intent.putExtra("scheduledAt", scheduledAt);
            if (Build.VERSION.SDK_INT >= 26) context.startForegroundService(intent);
            else context.startService(intent);
            call.resolve(result);
        } catch (Exception error) {
            result.put("running", false);
            result.put("state", "error");
            result.put("error", "Kunne ikke starte posisjonstesten. Åpne appen og prøv igjen.");
            testPrefs.edit().putString("status", result.toString()).apply();
            call.reject("Kunne ikke starte posisjonstesten. Åpne appen og prøv igjen.", error);
        }
    }

    @PluginMethod
    public void getPositionNotificationTestStatus(PluginCall call) {
        call.resolve(readPositionTestStatus());
    }

    private JSObject readPositionTestStatus() {
        SharedPreferences prefs = getContext().getSharedPreferences(PositionNotificationTestService.PREFS, Context.MODE_PRIVATE);
        JSObject result = new JSObject();
        result.put("state", "idle");
        result.put("running", false);
        try {
            JSONObject stored = new JSONObject(prefs.getString("status", "{}"));
            java.util.Iterator<String> keys = stored.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                result.put(key, stored.get(key));
            }
        } catch (Exception ignored) {
        }
        if (result.optBoolean("running", false)
            && System.currentTimeMillis() - result.optLong("scheduledAt", 0) > 45_000L) {
            result.put("running", false);
            result.put("state", "error");
            result.put("error", "Testen ble avbrutt. Prøv igjen med appen åpen.");
        }
        return result;
    }

    @PluginMethod
    public void start(PluginCall call) {
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationPermissionCallback");
            return;
        }
        startService(call);
    }

    @PermissionCallback
    private void locationPermissionCallback(PluginCall call) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            startService(call);
        } else {
            call.reject("Posisjonstillatelse er nødvendig for Smart Kampdag.");
        }
    }

    private void startService(PluginCall call) {
        String gameId = call.getString("gameId");
        String arenaId = call.getString("arenaId");
        String arenaName = call.getString("arenaName", "Arena");
        Double arenaLat = call.getDouble("arenaLat");
        Double arenaLon = call.getDouble("arenaLon");
        Integer nearRadius = call.getInt("nearRadiusMeters", 1000);
        Integer arrivalRadius = call.getInt("arrivalRadiusMeters", 250);

        if (gameId == null || arenaId == null || arenaLat == null || arenaLon == null) {
            call.reject("Mangler kamp- eller arenadata.");
            return;
        }

        Context context = getContext();
        Intent intent = new Intent(context, SmartGameDayLocationService.class);
        intent.setAction(SmartGameDayLocationService.ACTION_START);
        intent.putExtra("gameId", gameId);
        intent.putExtra("arenaId", arenaId);
        intent.putExtra("arenaName", arenaName);
        intent.putExtra("arenaLat", arenaLat);
        intent.putExtra("arenaLon", arenaLon);
        intent.putExtra("nearRadiusMeters", nearRadius);
        intent.putExtra("arrivalRadiusMeters", arrivalRadius);

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            context.startForegroundService(intent);
        } else {
            context.startService(intent);
        }

        JSObject result = readStatus();
        result.put("running", true);
        call.resolve(result);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Intent intent = new Intent(getContext(), SmartGameDayLocationService.class);
        intent.setAction(SmartGameDayLocationService.ACTION_STOP);
        getContext().startService(intent);
        JSObject result = new JSObject();
        result.put("running", false);
        call.resolve(result);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        call.resolve(readStatus());
    }

    @PluginMethod
    public void drainEvents(PluginCall call) {
        SharedPreferences prefs = getContext().getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String raw = prefs.getString("events", "[]");
        JSArray events = new JSArray();

        try {
            JSONArray stored = new JSONArray(raw);
            for (int i = 0; i < stored.length(); i++) {
                JSONObject item = stored.optJSONObject(i);
                if (item != null) events.put(item);
            }
        } catch (Exception ignored) {
        }

        prefs.edit().putString("events", "[]").apply();
        JSObject result = new JSObject();
        result.put("events", events);
        call.resolve(result);
    }

    private JSObject readStatus() {
        SharedPreferences prefs = getContext().getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        JSObject result = new JSObject();
        result.put("running", prefs.getBoolean("running", false));

        String gameId = prefs.getString("gameId", null);
        String proximity = prefs.getString("proximity", null);
        String observedAt = prefs.getString("observedAt", null);

        if (gameId != null) result.put("gameId", gameId);
        if (proximity != null) result.put("proximity", proximity);
        if (observedAt != null) result.put("observedAt", observedAt);
        if (prefs.contains("distanceMeters")) result.put("distanceMeters", prefs.getInt("distanceMeters", 0));
        if (prefs.contains("accuracyMeters")) result.put("accuracyMeters", prefs.getInt("accuracyMeters", 0));
        result.put("reliable", prefs.getBoolean("reliable", false));
        return result;
    }
}

