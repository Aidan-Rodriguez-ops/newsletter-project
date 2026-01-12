import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import { ArticleEditor } from '@/components/admin/article-editor'

export default async function NewArticlePage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav userEmail={user.email!} />

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Create New Article</h1>
          <p className="text-muted-foreground">
            Write and publish a new article for your newsletter
          </p>
        </div>

        <div className="border border-border rounded-lg p-6">
          <ArticleEditor mode="create" />
        </div>
      </main>
    </div>
  )
}
