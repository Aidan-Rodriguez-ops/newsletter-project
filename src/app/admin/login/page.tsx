import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { LoginForm } from '@/components/admin/login-form'
import { Button } from '@/components/ui/button'

export default async function AdminLoginPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (profile?.role === 'admin') {
      redirect('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to access the admin panel</p>
        </div>
        <div className="border border-border rounded-lg p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
