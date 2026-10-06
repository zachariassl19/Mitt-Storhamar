import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = process.cwd()
const packageDir = resolve(root, 'android/app/src/main/java/no/zacharias/mittstorhamar')
const manifestPath = resolve(root, 'android/app/src/main/AndroidManifest.xml')
const mainActivityPath = resolve(packageDir, 'MainActivity.java')

await mkdir(packageDir, { recursive: true })

const mainActivity = `package no.zacharias.mittstorhamar;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NativeSmartGameDayPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
`
await writeFile(mainActivityPath, mainActivity)

const nativeRoot = resolve(root, 'native/android')
for (const file of ['NativeSmartGameDayPlugin.java', 'SmartGameDayLocationService.java']) {
  const source = await readFile(resolve(nativeRoot, file), 'utf8')
  await writeFile(resolve(packageDir, file), source)
}

let manifest = await readFile(manifestPath, 'utf8')
const permissions = `
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
`

if (!manifest.includes('android.permission.FOREGROUND_SERVICE_LOCATION')) {
  manifest = manifest.replace('<application', permissions + '\n    <application')
}

const service = `
        <service
            android:name=".SmartGameDayLocationService"
            android:enabled="true"
            android:exported="false"
            android:foregroundServiceType="location" />
`

if (!manifest.includes('SmartGameDayLocationService')) {
  manifest = manifest.replace('</application>', service + '\n    </application>')
}

await writeFile(manifestPath, manifest)
console.log('Applied Mitt Storhamar native Android Smart Kampdag files.')
