import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPedidos } from '../data/api';
import { etiquetaEstado, etiquetaPago } from '../data/estados';

export function VendedorPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerPedidos()
      .then(setPedidos)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Panel vendedor</p>
      <h1 className="mb-4 text-3xl font-extrabold">Pedidos / Boletas (sólo lectura)</h1>
      {error && <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <table className="admin-table mb-0">
          <thead>
            <tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Pago</th><th>Estado</th><th>Detalle</th></tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td><strong>#{pedido.id}</strong></td>
                <td>{pedido.clienteNombre}</td>
                <td>${Number(pedido.total).toLocaleString('es-CL')}</td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${etiquetaPago(pedido.estadoPago).clase}`}>
                    {etiquetaPago(pedido.estadoPago).texto}
                  </span>
                </td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${etiquetaEstado(pedido.estado).clase}`}>
                    {etiquetaEstado(pedido.estado).texto}
                  </span>
                </td>
                <td><Link className="text-orange-700 underline" to={`/vendedor/pedidos/${pedido.id}`}>Ver detalle</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
