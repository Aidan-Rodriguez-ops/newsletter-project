import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role client to bypass RLS for n8n integration
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// This endpoint is for n8n to submit new articles as drafts
export async function POST(request: Request) {
  try {
    // Optional: Add API key authentication for n8n
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.N8N_API_KEY) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, category } = body

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, category' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Generate category slug from category
    const category_slug = category
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Generate excerpt (first 150 characters of content)
    const excerpt = content.substring(0, 150) + '...'

    // Insert into Supabase using admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert([
        {
          title,
          content,
          excerpt,
          category,
          category_slug,
          slug,
          status: 'draft', // Always save as draft for manual review
          type: 'article', // Default type
          author: 'AI Writer'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create article', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      article: data[0],
      message: 'Article created as draft successfully'
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
