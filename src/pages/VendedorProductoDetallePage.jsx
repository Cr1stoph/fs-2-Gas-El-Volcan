import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerProducto } from '../data/api';

export function VendedorProductoDetallePage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerProducto(id)
      .then(setProducto)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Panel vendedor</p>
      <h1 className="mb-4 text-3xl font-extrabold">Detalle de producto</h1>
      {error && <p className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}
      {producto && (
        <article className="flex flex-wrap gap-6 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <img src={producto.img} alt="" className="h-28 w-28 object-contain" />
          <div>
            <h2 className="mb-2 text-2xl font-bold">{producto.nombre}</h2>
            <p>Categoría: {producto.categoria}</p>
            <p>Precio: ${Number(producto.precio).toLocaleString('es-CL')}</p>
            <p>Oferta: {producto.precioOferta ? `$${Number(producto.precioOferta).toLocaleString('es-CL')}` : '—'}</p>
            <p>Stock disponible: {producto.stock}</p>
            <Link to="/vendedor/productos" className="mt-4 inline-block text-orange-700 underline">Volver al listado</Link>
          </div>
        </article>
      )}
    </main>
  );
}
