import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'no.zacharias.mittstorhamar',
  appName: 'Mitt Storhamar',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
}

export default config
