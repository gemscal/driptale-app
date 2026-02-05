import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

import { useAuth } from '@/auth/auth-context'

export const Route = createFileRoute('/(features)')({
  component: FeaturesLayout,
})

function FeaturesLayout() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
          />
        </header>
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
