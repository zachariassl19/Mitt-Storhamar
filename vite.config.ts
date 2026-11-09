import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Same source runs on GitHub Pages and in the bundled, offline Android WebView.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'android' ? './' : '/Mitt-Storhamar/',
}))
