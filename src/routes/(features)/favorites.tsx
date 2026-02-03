import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(features)/favorites"!</div>;
}
