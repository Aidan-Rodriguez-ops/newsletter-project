import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for our articles table
export interface Article {
  id: string
  title: string
  content: string
  excerpt: string | null
  category: string
  category_slug: string
  slug: string
  author: string
  status: 'draft' | 'published'
  type: 'article' | 'weekly-brief' | 'daily-snapshot' | 'stock-pitch' | 'contrarian'
  created_at: string
  updated_at: string
  published_at: string | null
}
