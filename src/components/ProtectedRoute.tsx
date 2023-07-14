import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSessionStorage } from "~/utils";
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const [user] = useSessionStorage("cos-host", null);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <>{props.children}</>;
}

export { ProtectedRoute };
