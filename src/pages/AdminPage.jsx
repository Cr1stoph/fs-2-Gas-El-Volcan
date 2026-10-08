import { Link } from 'react-router-dom';

export function AdminPage() {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen flex flex-col md:flex-row w-full">
      {/* Menú Lateral Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col justify-between min-h-screen">
        <div>
          <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
            <span className="text-3xl">🌋</span>
            <div>
              <h1 className="font-extrabold text-lg leading-tight text-white">Gas El Volcán</h1>
              <p className="text-xs text-orange-400 font-semibold">Panel de Administración</p>
            </div>
          </div>
          
          <nav className="p-4 space-y-1.5">
            <Link to="#" className="flex items-center space-x-3 bg-orange-600 text-white px-4 py-3 rounded-xl font-medium shadow-sm transition">
              <span>📊</span> <span>Resumen</span>
            </Link>
            {/* Otros enlaces del sidebar... */}
            <Link to="#" className="flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-xl font-medium transition">
              <span>📦</span> <span>Pedidos</span>
              <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">5</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link to="/" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm transition">
            <span>🌐</span> <span>Ir a la Web Pública</span>
          </Link>
          <Link to="/login" className="flex items-center space-x-3 text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-lg text-sm font-semibold transition">
            <span>🚪</span> <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>

      {/* Áreas de Contenido Principal */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bienvenida, Administradora 👋</h2>
            <p className="text-sm text-gray-500 mt-1">Control de despacho y ventas activas en Chillán.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Sistema En Línea
            </span>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow transition">
              + Nuevo Pedido Manual
            </button>
          </div>
        </header>

        {/* Tarjetas de Indicadores (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ventas de Hoy</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">$185.000</h3>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">💰</div>
          </div>
          {/* Resto de KPIs omitidos para brevedad, sigue el mismo formato */}
        </div>
      </main>
    </div>
  );
}