import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerPedido } from '../data/api';

export function VendedorPedidoDetallePage() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerPedido(id)
      .then(setPedido)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Panel vendedor</p>
      <h1 className="mb-4 text-3xl font-extrabold">Detalle de pedido</h1>
      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}
      {pedido && (
        <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-2xl font-bold">Pedido #{pedido.id}</h2>
          <p className="mb-4 text-gray-600">{pedido.clienteNombre} · {pedido.clienteCorreo}</p>
          <ul className="mb-4">
            {pedido.items.map((item, index) => (
              <li key={`${item.productoId}-${index}`}>
                {item.cantidad} × {item.nombre} — ${Number(item.precio).toLocaleString('es-CL')}
              </li>
            ))}
          </ul>
          <p>Subtotal: ${Number(pedido.subtotal).toLocaleString('es-CL')}</p>
          <p>Despacho: ${Number(pedido.despacho).toLocaleString('es-CL')}</p>
          <p className="mb-4 text-xl font-extrabold text-orange-700">Total: ${Number(pedido.total).toLocaleString('es-CL')}</p>
          <p>Pago: {pedido.estadoPago} · Estado: {pedido.estado}</p>
          <Link to="/vendedor/pedidos" className="mt-4 inline-block text-orange-700 underline">Volver al listado</Link>
        </article>
      )}
    </main>
  );
}
