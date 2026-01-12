import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import { ArticlesClient } from './articles-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'

export default async function AdminArticlesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <AdminNav userEmail={user.email!} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">Articles</h1>
            <p className="text-muted-foreground">
              Manage all your newsletter articles
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/articles/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        <ArticlesClient articles={articles || []} />
      </main>
    </div>
  )
}
