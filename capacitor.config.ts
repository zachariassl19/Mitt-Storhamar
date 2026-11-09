import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'no.mittstorhamar.personal',
  appName: 'Mitt Storhamar',
  webDir: 'dist',
  backgroundColor: '#06162f',
  android: {
    // Background geolocation plugin requires legacy bridge to keep listeners
    // alive for > 5 minutes; temporary compatibility setting for Capacitor 8.
    useLegacyBridge: true,
  },
  plugins: {
    LocalNotifications: {
      iconColor: '#EFCB59',
    },
  },
}

export default config
