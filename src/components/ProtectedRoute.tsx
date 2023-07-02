import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "~/utils";
interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const [user] = useLocalStorage("user", null);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <>{props.children}</>;
}

export { ProtectedRoute };
