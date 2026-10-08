import { Link, NavLink, Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 md:flex">
      <aside className="flex w-full flex-col justify-between bg-gray-900 text-white md:min-h-screen md:w-64 md:flex-shrink-0">
        <div>
          <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
            <span className="text-3xl">🌋</span>
            <div>
              <h1 className="font-extrabold text-lg leading-tight text-white">Gas El Volcán</h1>
              <p className="text-xs text-orange-400 font-semibold">Panel Admin</p>
            </div>
          </div>
          <nav className="p-4 space-y-1.5">
            <NavLink
              end
              to="/admin"
              className={({ isActive }) =>
                `flex items-center space-x-3 rounded-xl px-4 py-3 font-medium ${
                  isActive
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`
              }
            >
              <span>📊</span> <span>Dashboard</span>
            </NavLink>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm">
            <span>🌐</span> <span>Volver a la Tienda</span>
          </Link>
          <Link to="/login" className="mt-2 flex items-center space-x-3 rounded-lg px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
            <span>🚪</span> <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-grow overflow-y-auto p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}