import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { calcularTotal, getPrecioProducto } from '../data/commerce';

export function CartPage() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const subtotal = calcularTotal(cart);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Tu selección</p>
        <h1 className="mb-0 text-3xl font-extrabold md:text-4xl">Carrito de compras</h1>
      </section>

      <div className="grid grid-cols-1 gap-6 min-[992px]:grid-cols-[2fr_1fr]">
        <section>
          <div className="h-full rounded-2xl border border-orange-100 bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-orange-100 pb-3">
              <h2 className="mb-0 text-xl font-bold text-gray-900">Detalle del pedido</h2>
              {cart.length > 0 && (
                <button onClick={clearCart} type="button" className="inline-flex items-center justify-center rounded-full border border-[#dc3545] bg-transparent px-2 py-1 text-sm text-[#dc3545] transition hover:bg-[#dc3545] hover:text-white">
                  Vaciar carrito
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <span className="mb-3 block text-5xl" aria-hidden="true">🛒</span>
                <h3 className="mb-2 text-lg font-bold text-gray-800">Tu carrito está vacío</h3>
                <Link to="/categorias" className="mt-2 inline-flex items-center justify-center rounded-full border border-orange-600 bg-orange-600 px-4 py-1.5 leading-6 text-white transition hover:bg-orange-700 active:bg-orange-800">Ver productos</Link>
              </div>
            ) : (
              <div className="divide-y divide-orange-100">
                {cart.map((item) => (
                  <article key={item.id} className="-mx-2 grid grid-cols-12 items-center gap-y-3 py-4 min-[768px]:grid-cols-[2fr_4fr_3fr_3fr]">
                    <div className="col-span-3 px-2 min-[768px]:col-span-1">
                      <img src={item.img} alt="" className="h-20 w-full rounded-xl bg-orange-50 object-contain p-2" />
                    </div>
                    <div className="col-span-9 px-2 min-[768px]:col-span-1">
                      <h3 className="mb-1 text-base font-bold text-gray-900">{item.nombre}</h3>
                      <p className="mb-0 text-sm text-gray-500">${getPrecioProducto(item).toLocaleString('es-CL')} c/u</p>
                    </div>
                    <div className="col-span-7 px-2 min-[768px]:col-span-1">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Quitar una unidad de ${item.nombre}`}
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 bg-white text-sm text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                        >−</button>
                        <span className="min-w-6 text-center font-bold" aria-label="Cantidad">{item.cantidad}</span>
                        <button
                          type="button"
                          aria-label={`Agregar una unidad de ${item.nombre}`}
                          disabled={item.cantidad >= item.stock}
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 bg-white text-sm text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                        >+</button>
                      </div>
                    </div>
                    <div className="col-span-5 px-2 text-right min-[768px]:col-span-1">
                      <p className="mb-1 font-extrabold text-gray-900">
                        ${(getPrecioProducto(item) * item.cantidad).toLocaleString('es-CL')}
                      </p>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="p-0 text-sm text-[#dc3545] underline hover:text-[#b02a37]">
                        Eliminar
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside>
          <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
            <h2 className="mb-4 border-b border-orange-100 pb-3 text-xl font-bold text-gray-900">Resumen</h2>
            <div className="mb-3 flex justify-between text-gray-600">
              <span>Productos ({cart.reduce((total, item) => total + item.cantidad, 0)})</span>
              <span className="font-semibold text-gray-900">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="mb-3 flex justify-between text-gray-600">
              <span>Despacho</span><span className="text-sm">Se calcula al continuar</span>
            </div>
            <div className="flex justify-between border-t border-orange-100 pt-3 text-lg font-extrabold">
              <span>Subtotal</span><span className="text-orange-700">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <Link
              to="/checkout"
              aria-disabled={cart.length === 0}
              onClick={(event) => { if (cart.length === 0) event.preventDefault(); }}
              className={`mt-4 inline-flex w-full items-center justify-center rounded-lg border border-orange-600 bg-orange-600 py-3 font-bold leading-6 text-white transition hover:bg-orange-700 active:bg-orange-800 disabled:pointer-events-none disabled:opacity-50 ${cart.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
            >
              Continuar compra
            </Link>
            <Link to="/categorias" className="mt-3 block text-center text-sm font-semibold text-orange-700">Seguir comprando</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
