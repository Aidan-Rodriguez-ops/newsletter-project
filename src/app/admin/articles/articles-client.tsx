'use client'

import { Article } from '@/lib/supabase'
import { ArticlesTable } from '@/components/admin/articles-table'
import { useRouter } from 'next/navigation'

interface ArticlesClientProps {
  articles: Article[]
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
  const router = useRouter()

  const handleStatusChange = async (id: string, status: 'draft' | 'published') => {
    const response = await fetch(`/api/admin/articles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        published_at: status === 'published' ? new Date().toISOString() : null
      }),
    })

    if (response.ok) {
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/articles/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      router.refresh()
    }
  }

  return (
    <ArticlesTable
      articles={articles}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  )
}
