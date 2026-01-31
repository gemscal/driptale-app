import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignIn } from "@/auth/sign-in";
import { useAuth } from "@/auth/auth-context";

export const Route = createFileRoute("/auth/sign-in")({
  component: SignInRouteComponent,
});

function SignInRouteComponent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <SignIn />;
}
