'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleEmailSignIn() {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  async function handleDiscordSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-4 overflow-hidden relative">

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan opacity-[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-magenta opacity-[0.06] blur-[120px]" />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center mb-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="20,4 37,34 3,34" stroke="#00F0FF" strokeWidth="2" fill="none" strokeLinejoin="round"/>
              <line x1="20" y1="4" x2="20" y2="14" stroke="#00F0FF" strokeWidth="1.5" opacity="0.5"/>
              <line x1="20" y1="14" x2="26" y2="14" stroke="#00F0FF" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="26" cy="14" r="1.5" fill="#00F0FF"/>
              <circle cx="20" cy="4" r="2" fill="#00F0FF"/>
            </svg>
          </div>
          <p className="text-text-muted text-sm tracking-widest uppercase font-mono">Delta Terminal</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-elevated rounded-lg p-8 space-y-5">
          <div>
            <h1 className="text-text-main text-xl font-semibold">Sign in to your workspace</h1>
            <p className="text-text-muted text-sm mt-1">Connect your account to access your streams and signals.</p>
          </div>

          {/* Discord button */}
          <button
            onClick={handleDiscordSignIn}
            className="w-full flex items-center justify-center gap-3 bg-[#5865F2] text-white font-medium py-3 rounded-md text-sm transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_16px_rgba(88,101,242,0.5)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Continue with Discord
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-elevated" />
            <span className="text-text-muted text-xs">or sign in with email</span>
            <div className="flex-1 h-px bg-elevated" />
          </div>

          {/* Email / password */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-text-muted text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-primary border border-elevated rounded-md px-4 py-3 text-text-main text-sm outline-none focus:border-cyan transition-colors"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-text-muted text-sm">Password</label>
                <span className="text-text-muted text-xs hover:text-cyan cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmailSignIn()}
                className="w-full bg-primary border border-elevated rounded-md px-4 py-3 text-text-main text-sm outline-none focus:border-cyan transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <p className="text-error text-sm">{error}</p>
          )}

          {/* Sign in button with cyan glow on hover */}
          <button
            onClick={handleEmailSignIn}
            disabled={loading}
            className="w-full bg-cyan text-primary font-semibold py-3 rounded-md text-sm transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-text-muted text-xs">
            Don't have an account?{' '}
            <span className="text-cyan cursor-pointer hover:underline">
              Request early access
            </span>
          </p>
        </div>

        {/* Policy links */}
        <p className="text-center text-text-muted text-xs mt-6">
          By signing in you agree to our{' '}
          <span className="hover:text-cyan cursor-pointer transition-colors">Terms of Service</span>
          {' '}and{' '}
          <span className="hover:text-cyan cursor-pointer transition-colors">Privacy Policy</span>
        </p>

      </div>
    </main>
  )
}