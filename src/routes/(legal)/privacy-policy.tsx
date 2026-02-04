import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(legal)/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Privacy Policy</h1>
    </div>
  )
}
