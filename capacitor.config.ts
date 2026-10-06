import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'no.zacharias.mittstorhamar',
  appName: 'Mitt Storhamar Beta',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#F2C94C',
    },
  },
}

export default config
