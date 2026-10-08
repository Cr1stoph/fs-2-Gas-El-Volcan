import { Link } from 'react-router-dom';

export function AdminPage() {
  return (
    <div className="">
      {/* Menú Lateral Sidebar */}
     
      {/* Áreas de Contenido Principal */}
      
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
      
    </div>
  );
}