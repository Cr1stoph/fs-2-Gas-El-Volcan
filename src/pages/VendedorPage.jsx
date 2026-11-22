import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';
import {
  obtenerPedidos,
  obtenerProductos,
  getSesion,
} from '../data/api';

function obtenerImagen(nombre = '') {
  const n = nombre.toLocaleLowerCase('es-CL');
  if (n.includes('flexible')) return flexibleImagen;
  if (n.includes('regulador')) return reguladorImagen;
  return cilindroImagen;
}

const ETIQUETA_ESTADO = {
  PENDIENTE: { texto: 'Pendiente', clase: 'bg-yellow-100 text-yellow-800' },
  EN_CAMINO: { texto: 'En camino', clase: 'bg-blue-100 text-blue-800' },
  ENTREGADO: { texto: 'Entregado', clase: 'bg-green-100 text-green-800' },
};

export function VendedorPage() {
  const sesion = getSesion();
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    Promise.all([obtenerPedidos(), obtenerProductos()])
      .then(([p, pr]) => {
        setPedidos(p);
        setProductos(pr);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  const pedidosActivos = pedidos.filter(
    (p) => p.estadoPago === 'APROBADO' && p.estado !== 'ENTREGADO',
  ).length;

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      {/* Banner */}
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">
              Panel de Vendedor
            </p>
            <h1 className="mb-2 text-3xl font-extrabold">Gas El Volcán</h1>
            <p className="mb-0 text-orange-50">
              Hola, <strong>{sesion?.nombre}</strong>. Gestiona los pedidos y
              consulta el catálogo.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 font-bold leading-6 text-orange-700 transition hover:bg-gray-100"
          >
            Ir a la tienda
          </Link>
        </div>
      </section>

      {/* Indicadores */}
      <section
        aria-label="Indicadores"
        className="mb-5 grid grid-cols-1 gap-6 min-[576px]:grid-cols-3"
      >
        {[
          { titulo: 'Pedidos activos', valor: pedidosActivos, icono: '📦' },
          { titulo: 'Total pedidos', valor: pedidos.length, icono: '🧾' },
          { titulo: 'Productos en catálogo', valor: productos.length, icono: '🏷️' },
        ].map((ind) => (
          <article key={ind.titulo}>
            <div className="flex h-full items-center justify-between rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                  {ind.titulo}
                </p>
                <p className="mb-0 text-2xl font-black text-gray-900">
                  {cargando ? '…' : ind.valor}
                </p>
              </div>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl"
                aria-hidden="true"
              >
                {ind.icono}
              </span>
            </div>
          </article>
        ))}
      </section>

      {error && (
        <p className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">
          {error}
        </p>
      )}

      {/* Pedidos */}
      <section className="mb-5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">
            Despachos
          </p>
          <h2 className="mb-1 text-2xl font-extrabold">Pedidos recibidos</h2>
          <p className="mb-0 text-sm text-gray-600">
            Consulta los pedidos recibidos. La gestión de estados corresponde al administrador.
          </p>
        </div>

        {cargando ? (
          <p className="rounded-xl bg-orange-50 p-4 text-center text-gray-500">
            Cargando pedidos…
          </p>
        ) : pedidos.length === 0 ? (
          <p className="rounded-xl bg-orange-50 p-4 text-center text-gray-600">
            Aún no hay pedidos registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table mb-0">
              <thead>
                <tr>
                  <th>Pedido / cliente</th>
                  <th>Entrega</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => {
                  const etiqueta = ETIQUETA_ESTADO[pedido.estado] ?? {
                    texto: pedido.estado,
                    clase: 'bg-gray-100 text-gray-700',
                  };
                  return (
                    <tr key={pedido.id}>
                      <td>
                        <strong>#{pedido.id}</strong>
                        <br />
                        <span className="text-sm text-gray-600">
                          {pedido.clienteNombre}
                        </span>
                      </td>
                      <td>
                        {pedido.tipoEntrega === 'retiro'
                          ? 'Retiro en tienda'
                          : pedido.direccion}
                      </td>
                      <td>
                        {pedido.items
                          .map((i) => `${i.cantidad} × ${i.nombre}`)
                          .join(', ')}
                      </td>
                      <td className="font-bold">
                        ${pedido.total.toLocaleString('es-CL')}
                      </td>
                      <td>{pedido.estadoPago}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${etiqueta.clase}`}
                        >
                          {etiqueta.texto}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/vendedor/pedidos/${pedido.id}`}
                          className="inline-flex items-center justify-center rounded border border-orange-600 bg-transparent px-2 py-1 text-sm text-orange-600 transition hover:bg-orange-600 hover:text-white"
                        >
                          Ver detalle
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Catálogo solo lectura */}
      <section className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">
            Catálogo
          </p>
          <h2 className="mb-1 text-2xl font-extrabold">Productos disponibles</h2>
          <p className="mb-0 text-sm text-gray-600">
            Vista de solo lectura. Para modificar productos contacta al administrador.
          </p>
        </div>

        {cargando ? (
          <p className="rounded-xl bg-orange-50 p-4 text-center text-gray-500">
            Cargando productos…
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table mb-0">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Oferta</th>
                  <th>Stock</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <img
                        src={obtenerImagen(producto.nombre)}
                        alt={producto.nombre}
                        className="h-10 w-10 object-contain"
                      />
                    </td>
                    <td className="font-semibold">{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>
                      {producto.precioOferta
                        ? `$${producto.precioOferta.toLocaleString('es-CL')}`
                        : '—'}
                    </td>
                    <td>{producto.stock}</td>
                    <td>
                      <Link
                        to={`/vendedor/productos/${producto.id}`}
                        className="text-sm font-semibold text-orange-600 hover:underline"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
