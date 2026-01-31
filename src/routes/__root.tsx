import { ThemeProvider } from "@/components/theme-provider";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { user, signOut } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="driptale-theme">
      <div className="min-h-screen bg-background">
        <header className="border-b border-border px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-foreground hover:text-primary">
              Driptale
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Link to="/auth/sign-in">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
