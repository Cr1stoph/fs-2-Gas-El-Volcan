import { Outlet, Link } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen flex flex-col md:flex-row">
      {/* Sidebar del Administrador */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col justify-between min-h-screen">
        <div>
          <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
            <span className="text-3xl">🌋</span>
            <div>
              <h1 className="font-extrabold text-lg leading-tight text-white">Gas El Volcán</h1>
              <p className="text-xs text-orange-400 font-semibold">Panel Admin</p>
            </div>
          </div>
          <nav className="p-4 space-y-1.5">
            <Link to="/admin" className="flex items-center space-x-3 bg-orange-600 text-white px-4 py-3 rounded-xl font-medium">
              <span>📊</span> <span>Dashboard</span>
            </Link>
            <Link to="/admin/productos" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-xl font-medium">
              <span>🛢️</span> <span>Inventario</span>
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm">
            <span>🌐</span> <span>Volver a la Tienda</span>
          </Link>
        </div>
      </aside>

      {/* Aquí React Router inyectará las páginas del admin (Dashboard, Inventario, etc.) */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}