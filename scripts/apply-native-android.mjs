import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
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
const iconDir = resolve(root, 'android/app/src/main/res/drawable-nodpi')
await mkdir(iconDir, { recursive: true })
await copyFile(resolve(nativeRoot, 'app_icon.png'), resolve(iconDir, 'app_icon.png'))
for (const file of ['NativeSmartGameDayPlugin.java', 'SmartGameDayLocationService.java', 'PositionNotificationTestService.java']) {
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
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
`

if (!manifest.includes('android.permission.FOREGROUND_SERVICE_LOCATION')) {
  manifest = manifest.replace('<application', permissions + '\n    <application')
}

manifest = manifest
  .replace(/android:icon="[^"]+"/, 'android:icon="@drawable/app_icon"')
  .replace(/android:roundIcon="[^"]+"/, 'android:roundIcon="@drawable/app_icon"')

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

manifest = await readFile(manifestPath, 'utf8')
if (!manifest.includes('PositionNotificationTestService')) {
  manifest = manifest.replace('</application>', `
        <service android:name=".PositionNotificationTestService"
            android:exported="false" android:foregroundServiceType="location" />
    </application>`)
}
if (!manifest.includes('android.permission.WAKE_LOCK')) {
  manifest = manifest.replace('<application', '<uses-permission android:name="android.permission.WAKE_LOCK" />\n    <application')
}
if (!manifest.includes('android:scheme="geo"')) {
  manifest = manifest.replace('<application', `<queries>
        <intent><action android:name="android.intent.action.VIEW" /><data android:scheme="geo" /></intent>
    </queries>\n    <application`)
}
await writeFile(manifestPath, manifest)

const testsDir = resolve(root, 'android/app/src/test/java/no/zacharias/mittstorhamar')
await mkdir(testsDir, { recursive: true })
await writeFile(resolve(testsDir, 'PositionNotificationTestServiceTest.java'),
  await readFile(resolve(nativeRoot, 'PositionNotificationTestServiceTest.java'), 'utf8'))
const gradlePath = resolve(root, 'android/app/build.gradle')
let gradle = await readFile(gradlePath, 'utf8')
const versionCode = Math.max(2, Number.parseInt(process.env.ANDROID_VERSION_CODE || '2', 10))
gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`)
gradle = gradle.replace(/versionName\s+"[^"]+"/, 'versionName "0.15.1-mirror"')
if (!gradle.includes('org.robolectric:robolectric:')) {
  gradle += `\nandroid { testOptions { unitTests.includeAndroidResources = true } }\n`
  gradle += `dependencies { testImplementation 'junit:junit:4.13.2'; testImplementation 'org.robolectric:robolectric:4.16.1' }\n`
}
await writeFile(gradlePath, gradle)
console.log('Applied Mitt Storhamar native Android Smart Kampdag files.')

