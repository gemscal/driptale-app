import { ThemeProvider } from "@/components/theme-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { RequireAuth } from "@/auth/require-auth";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="driptale-theme">
      <RequireAuth
        publicPaths={["/privacy-policy", "/terms-of-service"]}
        guestOnlyPaths={["/auth/sign-in"]}
        signInPath="/auth/sign-in"
      >
        <main>
          <Outlet />
        </main>
      </RequireAuth>
    </ThemeProvider>
  );
}
