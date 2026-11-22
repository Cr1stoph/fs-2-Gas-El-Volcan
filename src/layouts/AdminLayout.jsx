import { NavLink, Outlet } from 'react-router-dom';
import { Footer } from '../core/Footer';
import { Header } from '../core/Header';

const enlacesAdmin = [
  { to: '/admin', texto: 'Panel', end: true },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/admin/categorias', texto: 'Categorías' },
];

// La protección de rol se hace en App.jsx mediante <ProtectedRoute roles={['ROLE_ADMIN']} />.
// Este layout solo se encarga de la estructura visual y la navegación del panel.
export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 text-gray-800">
      <Header />
      <nav aria-label="Navegación de administración" className="border-b border-orange-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-1 px-3 py-2">
          {enlacesAdmin.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-bold no-underline transition ${
                  isActive
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                }`
              }
            >
              {enlace.texto}
            </NavLink>
          ))}
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
}
