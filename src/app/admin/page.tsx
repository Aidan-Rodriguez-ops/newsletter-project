import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminNav } from '@/components/admin/admin-nav'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, PlusCircle, Eye, Clock } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch stats
  const { count: totalArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })

  const { count: publishedArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  const { data: recentArticles } = await supabase
    .from('articles')
    .select('id, title, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-background">
      <AdminNav userEmail={user.email!} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your newsletter articles and content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Articles</h3>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{totalArticles || 0}</p>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-green-600">{publishedArticles || 0}</p>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Drafts</h3>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{draftArticles || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/articles/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Article
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/articles">
                <FileText className="h-4 w-4 mr-2" />
                View All Articles
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
          <div className="border border-border rounded-lg divide-y">
            {recentArticles && recentArticles.length > 0 ? (
              recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="block p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No articles yet. Create your first article!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
