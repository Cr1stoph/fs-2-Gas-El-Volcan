import { useState } from 'react';
import { getPrecioProducto } from '../data/commerce';

export function ProductGrid({ productos, onAdd }) {
  const [mensaje, setMensaje] = useState('');

  const agregarProducto = (producto) => {
    const agregado = onAdd(producto);
    setMensaje(agregado === false
      ? `No queda más stock de ${producto.nombre}.`
      : `${producto.nombre} agregado al carrito.`);
  };

  if (productos.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-gray-600 shadow-sm">
        No encontramos productos con esos filtros.
      </p>
    );
  }

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">{mensaje}</p>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1200px]:grid-cols-3">
        {productos.map((producto) => {
          const enOferta = producto.precioOferta && producto.precioOferta < producto.precio;
          return (
            <div className="min-w-0" key={producto.id}>
              <article className="relative flex h-full flex-col justify-between rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {enOferta && (
                  <span className="absolute right-3 top-3 rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold uppercase text-yellow-950">
                    Oferta
                  </span>
                )}
                {producto.id === 2 && !enOferta && (
                  <span className="absolute right-3 top-3 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase text-orange-900">
                    Más vendido
                  </span>
                )}
                <div>
                  <div className="mb-4 flex h-52 items-center justify-center overflow-hidden rounded-xl border border-orange-100 bg-orange-50 p-3">
                    <img
                      src={producto.img}
                      alt={producto.nombre}
                      className="h-full w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wide text-orange-600">{producto.categoria}</p>
                  <h3 className="mb-2 text-xl font-bold text-gray-800">{producto.nombre}</h3>
                  <p className="mb-3 text-sm text-gray-500">Stock disponible: {producto.stock} unidades</p>
                  {enOferta && (
                    <p className="mb-0 text-sm text-gray-500 line-through">
                      ${producto.precio.toLocaleString('es-CL')}
                    </p>
                  )}
                  <p className="mb-5 text-2xl font-black text-orange-600">
                    ${getPrecioProducto(producto).toLocaleString('es-CL')}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={producto.stock <= 0}
                  onClick={() => agregarProducto(producto)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#198754] py-2.5 font-bold text-white shadow-sm transition hover:bg-[#157347] active:bg-[#146c43] disabled:cursor-not-allowed"
                >
                  {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                </button>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}
