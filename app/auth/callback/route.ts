// app/auth/callback/route.ts
// Handles the OAuth callback from Discord (and any future OAuth providers).
// Exchanges the one-time code for a session stored in cookies.
// Then redirects to /dashboard.

import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}