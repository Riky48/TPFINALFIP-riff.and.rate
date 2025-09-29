import { JSX } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  isLoggedIn: boolean;
  children: JSX.Element;
};

export function PrivateRoute({ isLoggedIn, children }: PrivateRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirige al Home si no está logueado
  }
  return children; // Muestra el componente si está logueado
}
