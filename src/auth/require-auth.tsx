import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useAuth } from '@/auth/auth-context'

type RequireAuthProps = {
  children: React.ReactNode
  /** Paths anyone can access without auth (no loading, no redirects) */
  publicPaths?: string[]
  /** Paths only for guests (e.g. sign-in). Logged-in users are redirected away. */
  guestOnlyPaths?: string[]
  signInPath?: string
}

function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

function LoadingScreen() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  )
}

export function RequireAuth({
  children,
  publicPaths = [],
  guestOnlyPaths = ['/auth/sign-in'],
  signInPath = '/auth/sign-in',
}: RequireAuthProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const isPublicPath = matchesPath(pathname, publicPaths)
  const isGuestOnlyPath = matchesPath(pathname, guestOnlyPaths)

  // Determine if we need to redirect
  const shouldRedirectToSignIn =
    !loading && !user && !isPublicPath && !isGuestOnlyPath
  const shouldRedirectToHome = !loading && user && isGuestOnlyPath

  useEffect(() => {
    if (shouldRedirectToHome) {
      navigate({ to: '/' })
      return
    }

    if (shouldRedirectToSignIn) {
      navigate({ to: signInPath })
    }
  }, [shouldRedirectToHome, shouldRedirectToSignIn, navigate, signInPath])

  // Public paths: render immediately without any auth checks
  if (isPublicPath) {
    return <>{children}</>
  }

  // Show loading while auth state is being determined
  if (loading) {
    return <LoadingScreen />
  }

  // Guest-only paths (e.g., sign-in): only render for unauthenticated users
  if (isGuestOnlyPath) {
    // If user is logged in, show loading while redirecting to home
    if (user) {
      return <LoadingScreen />
    }
    return <>{children}</>
  }

  // Protected routes: only render for authenticated users
  // If not authenticated, show loading while redirecting to sign-in
  if (!user) {
    return <LoadingScreen />
  }

  return <>{children}</>
}
