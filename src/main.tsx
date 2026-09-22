import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './AppV2'
import { CloudSyncManager } from './components/CloudSyncManager'
import './styles.css'
import './logoStyles.css'
import './detailStyles.css'
import './travelPlanner.css'
import './purchases.css'
import './cloudSync.css'
import './gameCards.css'
import './minStorhamar.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <CloudSyncManager />
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => undefined)
  })
}
