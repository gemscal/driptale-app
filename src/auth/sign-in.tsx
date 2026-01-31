import { useAuth } from "@/auth/auth-context";
import { Button } from "@/components/ui/button";

function getAuthErrorMessage(error: string): string {
  if (error.includes("popup-closed-by-user")) return "Sign-in was cancelled.";
  if (error.includes("popup-blocked")) return "Popup was blocked. Allow popups and try again.";
  if (error.includes("network")) return "Network error. Check your connection.";
  if (error.includes("cancelled")) return "Sign-in was cancelled.";
  return error;
}

export function SignIn() {
  const { signInWithGoogle, error, clearError } = useAuth();

  const handleSignIn = async () => {
    clearError();
    await signInWithGoogle();
  };

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Sign in to Driptale</h1>
        <p className="text-sm text-muted-foreground">
          Use your Google account to continue
        </p>
      </div>
      <Button onClick={handleSignIn} size="lg">
        Sign in with Google
      </Button>
      {error && (
        <p className="text-center text-sm text-destructive">
          {getAuthErrorMessage(error)}
        </p>
      )}
    </div>
  );
}
