import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useAuth } from '@/auth/auth-context'
import { SignIn } from '@/auth/sign-in'

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInRouteComponent,
})

function SignInRouteComponent() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: '/' })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    )
  }

  if (user) {
    return null
  }

  return <SignIn />
}
