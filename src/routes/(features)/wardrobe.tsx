import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(features)/wardrobe")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(features)/wardrobe"!</div>;
}
