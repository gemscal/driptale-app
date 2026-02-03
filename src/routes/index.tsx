import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  const { user, signOut } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Welcome to Driptale
      </h1>
      <p className="text-muted-foreground">
        Your app is now set up with TanStack Router and TanStack Query.
      </p>
      <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
        <h2 className="mb-2 text-lg font-semibold">Getting Started</h2>
        <p className="text-sm text-muted-foreground">
          Add more routes by creating files in the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">src/routes</code>{" "}
          directory. The file structure automatically maps to your URL paths.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user?.email}</span>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
