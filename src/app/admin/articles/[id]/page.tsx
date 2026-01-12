import { redirect, notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import { ArticleEditor } from '@/components/admin/article-editor'

interface EditArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav userEmail={user.email!} />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Edit Article</h1>
          <p className="text-muted-foreground">
            Make changes to your article
          </p>
        </div>

        <div className="border border-border rounded-lg p-6">
          <ArticleEditor article={article} mode="edit" />
        </div>
      </main>
    </div>
  )
}
