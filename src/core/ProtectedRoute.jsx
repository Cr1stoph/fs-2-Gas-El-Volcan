import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Protege rutas por autenticación y rol.
 * roles: lista de authorities (ROLE_ADMIN, ROLE_VENDEDOR, ROLE_CLIENTE).
 * redirectTo: destino cuando el rol no está autorizado (por defecto, inicio).
 * children: permite proteger una página concreta dentro de un layout público.
 */
export function ProtectedRoute({ roles, redirectTo, children }) {
  const { sesion, verificando } = useAuth();

  if (verificando) {
    return <main className="mx-auto flex-grow px-4 py-16 text-center text-gray-600">Verificando sesión…</main>;
  }
  if (!sesion) {
    return <Navigate to="/login" replace />;
  }
  if (roles?.length && !roles.includes(sesion.rol)) {
    return <Navigate to={redirectTo ?? '/'} replace />;
  }
  return children ?? <Outlet />;
}
