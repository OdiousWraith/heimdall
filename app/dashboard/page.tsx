'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center space-y-3">
        <span className="text-cyan text-5xl font-bold">Δ</span>
        <p className="text-text-main text-xl font-semibold">HEIMDALL</p>
        <p className="text-text-muted text-sm">Dashboard placeholder — auth is working.</p>
        <button
          onClick={handleSignOut}
          className="text-text-muted text-sm hover:text-cyan transition-colors"
        >
          Sign out
        </button>
      </div>
    </main>
  )
}