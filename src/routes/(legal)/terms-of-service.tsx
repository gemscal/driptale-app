import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(legal)/terms-of-service")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Terms of Service</h1>
    </div>
  );
}
