import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../data/api';

export function VendedorProductosPage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Panel vendedor</p>
      <h1 className="mb-4 text-3xl font-extrabold">Productos (sólo lectura)</h1>
      {error && <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <table className="admin-table mb-0">
          <thead>
            <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Detalle</th></tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td className="font-semibold">{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${Number(producto.precio).toLocaleString('es-CL')}</td>
                <td>{producto.stock}</td>
                <td><Link className="text-orange-700 underline" to={`/vendedor/productos/${producto.id}`}>Ver detalle</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
