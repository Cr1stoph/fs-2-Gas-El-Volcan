import { Navigate, Outlet } from 'react-router-dom';
import { getSesion } from '../data/api';

/**
 * Protege rutas por autenticación y rol.
 *
 * Uso en el router:
 *   element: <ProtectedRoute roles={['ROLE_ADMIN']} />
 *
 * Si no hay sesión  → redirige a /login
 * Si el rol no está en la lista → redirige a /
 * Si pasa la validación → renderiza <Outlet /> (ruta anidada)
 */
export function ProtectedRoute({ roles }) {
  const sesion = getSesion();

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(sesion.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
