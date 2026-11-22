import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerMisPedidos } from '../data/api';

/** Historial de boletas del CLIENTE autenticado (el backend filtra por su email). */
export function MisPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerMisPedidos()
      .then(setPedidos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 text-white shadow-lg">
        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-200">Mi cuenta</p>
        <h1 className="mb-0 text-3xl font-extrabold">Mis pedidos</h1>
      </section>

      {error && <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}
      {cargando ? (
        <p className="rounded-xl bg-orange-50 p-5 text-center text-gray-500">Cargando tus pedidos…</p>
      ) : pedidos.length === 0 ? (
        <p className="rounded-xl bg-orange-50 p-5 text-center text-gray-600">Aún no tienes pedidos registrados.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <article key={pedido.id} className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <strong>#{pedido.id}</strong>
                  <span className="ml-2 text-sm text-gray-500">
                    {new Date(pedido.creadoEn).toLocaleString('es-CL')}
                  </span>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-800">
                  {pedido.estado}
                </span>
              </div>
              <ul className="mb-3 text-sm text-gray-700">
                {pedido.items.map((item, index) => (
                  <li key={`${item.productoId}-${index}`}>{item.cantidad} × {item.nombre}</li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-orange-700">Total: ${Number(pedido.total).toLocaleString('es-CL')}</strong>
                <Link to={`/pago-correcto/${pedido.id}`} className="text-orange-700 underline">
                  Ver comprobante
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
