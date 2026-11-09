import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './AppV2'
import { Capacitor } from '@capacitor/core'
import { CalendarSettingsPortal } from './components/CalendarSettings'
import { CloudSyncManager } from './components/CloudSyncManager'
import { DynamicMatchdayHome } from './components/DynamicMatchdayHome'
import { NotificationManager, NotificationSettingsPortal } from './components/NotificationCenter'
import { SmartGameDayManager, SmartGameDaySettingsPortal } from './components/SmartGameDayGlobal'
import './styles.css'
import './logoStyles.css'
import './detailStyles.css'
import './travelPlanner.css'
import './enturRail.css'
import './historyArchive.css'
import './unifiedTravel.css'
import './gps.css'
import './smartGameDaySettings.css'
import './notifications.css'
import './calendarSettings.css'
import './dynamicHome.css'
import './purchases.css'
import './cloudSync.css'
import './gameCards.css'
import './minStorhamar.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <DynamicMatchdayHome />
    <SmartGameDayManager />
    <SmartGameDaySettingsPortal />
    <NotificationManager />
    <NotificationSettingsPortal />
    <CalendarSettingsPortal />
    <CloudSyncManager />
  </React.StrictMode>,
)

// Capacitor packages the local assets itself. Never register the GitHub Pages SW
// inside the native WebView, where its /Mitt-Storhamar scope is not valid.
if (!Capacitor.isNativePlatform() && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => undefined)
  })
}
