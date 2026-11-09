import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { isNativeAndroid, syncNativeNotifications } from '../lib/nativeNotifications'
import { subscribeNotificationSettings } from '../lib/notificationSettings'
import { subscribeTrips } from '../lib/trips'

/**
 * Schedule actual Android notifications in advance, so closing the WebView
 * doesn't stop reminders. Browser notifications retain their existing behavior.
 */
export function NativeNotificationManager() {
  useEffect(()=>{
    if(!isNativeAndroid())return
    let busy=false
    let dirty=false
    async function refresh() {
      if(busy){dirty=true;return}
      busy=true
      do {
        dirty=false
        try { await syncNativeNotifications() }
        catch(error) { console.warn('Native notification sync failed', error instanceof Error?error.message:'unknown') }
      } while(dirty)
      busy=false
    }
    const unsubscribeSettings=subscribeNotificationSettings(()=>void refresh())
    const unsubscribeTrips=subscribeTrips(()=>void refresh())
    const onVisible=()=>{if(!document.hidden)void refresh()}
    document.addEventListener('visibilitychange',onVisible)
    void refresh()
    return ()=>{unsubscribeSettings();unsubscribeTrips();document.removeEventListener('visibilitychange',onVisible)}
  },[])
  return null
}

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform()
}
