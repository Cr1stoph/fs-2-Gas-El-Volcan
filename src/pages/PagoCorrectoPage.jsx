import { Link, useParams } from 'react-router-dom';
import { getPedidoById } from '../data/mockDb';

export function PagoCorrectoPage() {
  const { pedidoId } = useParams();
  const pedido = pedidoId ? getPedidoById(pedidoId) : null;

  return (
    <main className="container-fluid page-content flex-grow px-3 px-lg-5 py-5">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">
        <div className="bg-green-600 px-6 py-8 text-center text-white">
          <span className="mb-3 block text-6xl" aria-hidden="true">✓</span>
          <h1 className="mb-2 text-3xl font-black">¡Compra exitosa!</h1>
          <p className="mb-0">Tu pedido fue confirmado y ya está en preparación.</p>
        </div>
        <div className="p-5 md:p-8">
          {pedido ? (
            <>
              <div className="mb-4 flex flex-wrap justify-between gap-2 border-b border-orange-100 pb-3">
                <span className="font-semibold text-gray-600">Número de pedido</span>
                <strong className="text-orange-700">#{pedido.id}</strong>
              </div>
              <h2 className="mb-3 text-lg font-bold">Resumen</h2>
              <div className="mb-4 space-y-2">
                {pedido.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm">
                    <span>{item.cantidad} × {item.nombre}</span>
                    <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-orange-100 pt-3 text-sm">
                <div className="flex justify-between"><span>Entrega</span><span>{pedido.tipoEntrega === 'retiro' ? 'Retiro en tienda' : pedido.cliente.direccion}</span></div>
                <div className="flex justify-between"><span>Despacho</span><span>{pedido.despacho ? `$${pedido.despacho.toLocaleString('es-CL')}` : 'Gratis'}</span></div>
                <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span className="text-orange-700">${pedido.total.toLocaleString('es-CL')}</span></div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Tu compra quedó registrada correctamente.</p>
          )}
          <Link to="/" className="btn btn-primary mt-5 w-100 rounded-lg py-3 font-bold">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}
