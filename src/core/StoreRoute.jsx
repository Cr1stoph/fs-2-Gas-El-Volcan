import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/** El VENDEDOR sólo puede estar en las vistas de su panel (productos y pedidos). */
export function StoreRoute() {
  const { sesion } = useAuth();
  if (sesion?.rol === 'ROLE_VENDEDOR') {
    return <Navigate to="/vendedor" replace />;
  }
  return <Outlet />;
}
