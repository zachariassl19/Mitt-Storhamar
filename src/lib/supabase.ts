import { createClient } from '@supabase/supabase-js'

// These are public client credentials. Private user data is protected by
// Supabase Auth + Row Level Security in the database.
const SUPABASE_URL = 'https://wjmnuajgdcstbkghimuj.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_PcKUAV6FSQMFqJu80qZfHg_jTQCl9Tt'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
