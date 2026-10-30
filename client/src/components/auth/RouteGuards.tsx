import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

function FullScreenSpinner() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f9f9ff]">
      <span className="size-8 animate-spin rounded-full border-4 border-[#006b2c]/20 border-t-[#006b2c]" />
    </div>
  );
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenSpinner />;
  if (!session) return <Navigate to="/auth" replace state={{ from: location }} />;
  return <>{children}</>;
}

export function GuestRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) return <FullScreenSpinner />;
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}