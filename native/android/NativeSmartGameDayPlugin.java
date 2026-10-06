package no.zacharias.mittstorhamar;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

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
        )
    }
)
public class NativeSmartGameDayPlugin extends Plugin {
    private static final String PREFS = "mitt_storhamar_native_gameday";

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
