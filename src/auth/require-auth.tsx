import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth/auth-context";

type RequireAuthProps = {
  children: React.ReactNode;
  /** Paths anyone can access without auth (no loading, no redirects) */
  publicPaths?: string[];
  /** Paths only for guests (e.g. sign-in). Logged-in users are redirected away. */
  guestOnlyPaths?: string[];
  signInPath?: string;
};

function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function RequireAuth({
  children,
  publicPaths = [],
  guestOnlyPaths = ["/auth/sign-in"],
  signInPath = "/auth/sign-in",
}: RequireAuthProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isPublicPath = matchesPath(pathname, publicPaths);
  const isGuestOnlyPath = matchesPath(pathname, guestOnlyPaths);

  useEffect(() => {
    if (loading) return;

    if (user && isGuestOnlyPath) {
      navigate({ to: "/" });
      return;
    }

    if (!user && !isPublicPath && !isGuestOnlyPath) {
      navigate({ to: signInPath });
    }
  }, [
    user,
    loading,
    isPublicPath,
    isGuestOnlyPath,
    pathname,
    navigate,
    signInPath,
  ]);

  if (isPublicPath) {
    return <>{children}</>;
  }

  if (isGuestOnlyPath) {
    if (loading) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      );
    }
    if (user) return null;
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
