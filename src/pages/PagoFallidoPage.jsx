import { Link, useParams } from 'react-router-dom';
import { getPedidoById } from '../data/mockDb';

export function PagoFallidoPage() {
  const { pedidoId } = useParams();
  const pedido = pedidoId ? getPedidoById(pedidoId) : null;

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl">
        <div className="bg-red-700 px-6 py-8 text-center text-white">
          <span className="mb-3 block text-6xl" aria-hidden="true">!</span>
          <h1 className="mb-2 text-3xl font-black">No pudimos procesar el pago</h1>
          <p className="mb-0">No se realizó ningún cobro. Puedes intentarlo nuevamente.</p>
        </div>
        <div className="p-5 md:p-8">
          {pedido ? (
            <>
              <p className="mb-4 text-center text-sm text-gray-600">
                Pedido <strong>#{pedido.id}</strong> · pago rechazado
              </p>
              <h2 className="mb-3 text-lg font-bold">Resumen del intento</h2>
              <div className="mb-4 space-y-2">
                {pedido.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm">
                    <span>{item.cantidad} × {item.nombre}</span>
                    <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-orange-100 pt-3 text-lg font-extrabold">
                <span>Total</span><span className="text-orange-700">${pedido.total.toLocaleString('es-CL')}</span>
              </div>
            </>
          ) : <p className="text-center text-gray-600">No se encontró el detalle de este intento de pago.</p>}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link to="/checkout" className="inline-flex flex-1 items-center justify-center rounded-lg border border-orange-600 bg-orange-600 py-3 font-bold leading-6 text-white transition hover:bg-orange-700 active:bg-orange-800">Intentar nuevamente</Link>
            <Link to="/carrito" className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-400 bg-transparent py-3 font-bold leading-6 text-gray-700 transition hover:bg-gray-100">Revisar carrito</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
