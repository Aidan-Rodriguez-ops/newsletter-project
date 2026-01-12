import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Cache configuration
let cachedData: any = null
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const now = Date.now()

    // Generate cache key based on params
    const cacheKey = `${category || 'all'}-${limit}`

    // Return cached data if still valid
    if (cachedData?.[cacheKey] && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({ ...cachedData[cacheKey], cached: true })
    }

    // Build query
    let query = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published') // Only fetch published articles
      .order('published_at', { ascending: false })
      .limit(limit)

    // Add category filter if specified
    if (category) {
      query = query.eq('category_slug', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch articles', details: error.message },
        { status: 500 }
      )
    }

    const responseData = {
      articles: data || [],
      count: data?.length || 0,
      timestamp: new Date().toISOString(),
      cached: false
    }

    // Update cache
    if (!cachedData) cachedData = {}
    cachedData[cacheKey] = responseData
    lastFetchTime = now

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching articles:', error)

    // Return cached data if available
    if (cachedData) {
      const { searchParams } = new URL(request.url)
      const category = searchParams.get('category')
      const limit = parseInt(searchParams.get('limit') || '10')
      const cacheKey = `${category || 'all'}-${limit}`

      if (cachedData[cacheKey]) {
        return NextResponse.json({ ...cachedData[cacheKey], cached: true, error: 'Using stale cache' })
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
