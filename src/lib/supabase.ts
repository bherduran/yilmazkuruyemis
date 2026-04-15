import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(url, anonKey)

export type Product = {
  id: string
  name: string
  price: number
  unit: 'kg' | 'adet' | 'gr'
  category: string
  photo_url: string | null
  is_active: boolean
  created_at: string
}
