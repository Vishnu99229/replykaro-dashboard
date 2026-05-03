import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('[ReplyKaro] Missing VITE_SUPABASE_URL — using placeholder. Data will not load.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
