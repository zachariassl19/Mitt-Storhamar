import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './AppV2'
import { CloudSyncManager } from './components/CloudSyncManager'
import { DynamicMatchdayHome } from './components/DynamicMatchdayHome'
import { NotificationManager, NotificationSettingsPortal } from './components/NotificationCenter'
import { SmartGameDayManager, SmartGameDaySettingsPortal } from './components/SmartGameDayGlobal'
import './styles.css'
import './logoStyles.css'
import './detailStyles.css'
import './travelPlanner.css'
import './unifiedTravel.css'
import './gps.css'
import './smartGameDaySettings.css'
import './notifications.css'
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
    <CloudSyncManager />
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => undefined)
  })
}
