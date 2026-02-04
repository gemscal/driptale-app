import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(features)/outfits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(features)/outfits"!</div>
}
