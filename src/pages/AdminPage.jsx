import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';
import {
  avanzarPedido,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerPedidos,
  obtenerProductos,
} from '../data/api';

const formularioVacio = {
  nombre: '',
  precio: '',
  precioOferta: '',
  stock: '',
  categoria: 'Cilindros',
};

function obtenerImagen(categoria, nombre) {
  if (categoria === 'Cilindros') return cilindroImagen;
  return nombre.toLocaleLowerCase('es-CL').includes('flexible') ? flexibleImagen : reguladorImagen;
}

export function AdminPage() {
  const { esAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    Promise.all([obtenerProductos(), obtenerPedidos()])
      .then(([productosActuales, pedidosActuales]) => {
        setProductos(productosActuales);
        setPedidos(pedidosActuales);
      })
      .catch((exception) => setError(exception.message));
  }, []);
  const ventas = pedidos
    .filter((pedido) => pedido.estadoPago === 'APROBADO')
    .reduce((total, pedido) => total + pedido.total, 0);
  const pedidosActivos = pedidos.filter((pedido) => pedido.estado === 'PENDIENTE' || pedido.estado === 'EN_CAMINO').length;
  const stockTotal = productos.reduce((total, producto) => total + producto.stock, 0);

  const actualizarCampo = (event) => {
    setFormulario((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const guardarProducto = async (event) => {
    event.preventDefault();
    setError('');
    setMensaje('');
    const precio = Number(formulario.precio);
    const precioOferta = formulario.precioOferta ? Number(formulario.precioOferta) : null;
    if (precioOferta && precioOferta >= precio) {
      setError('El precio de oferta debe ser menor al precio normal.');
      return;
    }

    const datos = {
      nombre: formulario.nombre.trim(),
      precio,
      precioOferta,
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
      img: obtenerImagen(formulario.categoria, formulario.nombre),
    };
    try {
      if (productoEditando !== null) {
        await actualizarProducto(productoEditando, datos);
        setMensaje('Producto actualizado correctamente.');
      } else {
        await crearProducto(datos);
        setMensaje('Producto agregado correctamente.');
      }
      setProductos(await obtenerProductos());
      setFormulario(formularioVacio);
      setProductoEditando(null);
    } catch (exception) {
      setError(exception.message);
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto.id);
    setFormulario({
      nombre: producto.nombre,
      precio: String(producto.precio),
      precioOferta: producto.precioOferta ? String(producto.precioOferta) : '',
      stock: String(producto.stock),
      categoria: producto.categoria,
    });
    setMensaje('');
  };

  const quitarProducto = async (producto) => {
    if (!window.confirm(`¿Eliminar ${producto.nombre} del catálogo?`)) return;
    setError('');
    try {
      await eliminarProducto(producto.id);
      setProductos(await obtenerProductos());
      setMensaje('Producto eliminado del catálogo.');
    } catch (exception) {
      setError(exception.message);
    }
  };

  const cambiarEstadoPedido = async (pedido) => {
    setError('');
    try {
      await avanzarPedido(pedido.id);
      setPedidos(await obtenerPedidos());
    } catch (exception) {
      setError(exception.message);
    }
  };

  const cancelarEdicion = () => {
    setFormulario(formularioVacio);
    setProductoEditando(null);
    setMensaje('');
  };

  // Doble barrera: ProtectedRoute ya filtra por rol, esto evita renderizar el panel
  // si la sesión cambia mientras la página está montada.
  if (!esAdmin) return null;

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Administración</p>
            <h1 className="mb-2 text-3xl font-extrabold">Panel de Gas El Volcán</h1>
            <p className="mb-0 text-orange-50">Gestiona el inventario y revisa el estado de los pedidos.</p>
          </div>
          <Link to="/" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 font-bold leading-6 text-orange-700 transition hover:bg-gray-100">Ir a la tienda</Link>
        </div>
      </section>

      <section aria-label="Indicadores del negocio" className="mb-5 grid grid-cols-1 gap-6 min-[576px]:grid-cols-2 min-[1200px]:grid-cols-4">
        {[
          { titulo: 'Ventas aprobadas', valor: `$${ventas.toLocaleString('es-CL')}`, icono: '💰' },
          { titulo: 'Pedidos activos', valor: pedidosActivos, icono: '📦' },
          { titulo: 'Unidades en stock', valor: stockTotal, icono: '🛢️' },
          { titulo: 'Productos', valor: productos.length, icono: '🏷️' },
        ].map((indicador) => (
          <article key={indicador.titulo}>
            <div className="flex h-full items-center justify-between rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">{indicador.titulo}</p>
                <p className="mb-0 text-2xl font-black text-gray-900">{indicador.valor}</p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl" aria-hidden="true">{indicador.icono}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="mb-5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Inventario</p>
          <h2 className="mb-1 text-2xl font-extrabold">Administrar productos</h2>
          <p className="mb-0 text-sm text-gray-600">Los cambios quedan guardados en la base de datos.</p>
        </div>
        <form onSubmit={guardarProducto} className="-mx-2 grid grid-cols-12 items-end gap-y-4 border-b border-orange-100 pb-5">
          <div className="col-span-12 px-2 min-[768px]:col-span-6 min-[1200px]:col-span-3">
            <label htmlFor="producto-nombre" className="mb-2 block font-semibold">Nombre</label>
            <input id="producto-nombre" name="nombre" value={formulario.nombre} onChange={actualizarCampo} required />
          </div>
          <div className="col-span-6 px-2 min-[768px]:col-span-3 min-[1200px]:col-span-2">
            <label htmlFor="producto-precio" className="mb-2 block font-semibold">Precio normal</label>
            <input id="producto-precio" name="precio" type="number" min="1" value={formulario.precio} onChange={actualizarCampo} required />
          </div>
          <div className="col-span-6 px-2 min-[768px]:col-span-3 min-[1200px]:col-span-2">
            <label htmlFor="producto-oferta" className="mb-2 block font-semibold">Precio oferta</label>
            <input id="producto-oferta" name="precioOferta" type="number" min="1" value={formulario.precioOferta} onChange={actualizarCampo} placeholder="Opcional" />
          </div>
          <div className="col-span-6 px-2 min-[768px]:col-span-3 min-[1200px]:col-span-2">
            <label htmlFor="producto-stock" className="mb-2 block font-semibold">Stock</label>
            <input id="producto-stock" name="stock" type="number" min="0" value={formulario.stock} onChange={actualizarCampo} required />
          </div>
          <div className="col-span-6 px-2 min-[768px]:col-span-3 min-[1200px]:col-span-2">
            <label htmlFor="producto-categoria" className="mb-2 block font-semibold">Categoría</label>
            <select id="producto-categoria" name="categoria" value={formulario.categoria} onChange={actualizarCampo}>
              <option>Cilindros</option>
              <option>Accesorios</option>
            </select>
          </div>
          <div className="col-span-12 px-2 min-[1200px]:col-span-1">
            <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg border border-orange-600 bg-orange-600 py-1.5 font-bold leading-6 text-white transition hover:bg-orange-700 active:bg-orange-800">
              {productoEditando === null ? 'Agregar' : 'Guardar'}
            </button>
          </div>
          {productoEditando !== null && (
            <div className="col-span-12 px-2">
              <button type="button" onClick={cancelarEdicion} className="inline-flex items-center justify-center rounded border border-gray-400 bg-transparent px-2 py-1 text-sm text-gray-700 transition hover:bg-gray-100">Cancelar edición</button>
            </div>
          )}
        </form>
        {mensaje && <p className="mt-3 mb-0 rounded-md border border-sky-200 bg-sky-100 px-4 py-2 text-sky-900" role="status">{mensaje}</p>}
        {error && <p className="mt-3 mb-0 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-red-800" role="alert">{error}</p>}

        <div className="mt-4 overflow-x-auto">
          <table className="admin-table mb-0">
            <thead>
              <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th>Stock</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td className="font-semibold">{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td>{producto.precioOferta ? `$${producto.precioOferta.toLocaleString('es-CL')}` : '—'}</td>
                  <td>{producto.stock}</td>
                  <td className="whitespace-nowrap">
                    <button type="button" onClick={() => editarProducto(producto)} className="mr-2 inline-flex items-center justify-center rounded border border-orange-600 bg-transparent px-2 py-1 text-sm text-orange-600 transition hover:bg-orange-600 hover:text-white">Editar</button>
                    <button type="button" onClick={() => quitarProducto(producto)} className="inline-flex items-center justify-center rounded border border-[#dc3545] bg-transparent px-2 py-1 text-sm text-[#dc3545] transition hover:bg-[#dc3545] hover:text-white">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Despachos</p>
          <h2 className="mb-1 text-2xl font-extrabold">Pedidos recibidos</h2>
          <p className="mb-0 text-sm text-gray-600">Actualiza el estado de los pagos aprobados durante la preparación y entrega.</p>
        </div>
        {pedidos.length === 0 ? (
          <p className="rounded-xl bg-orange-50 p-4 text-center text-gray-600">Aún no hay pedidos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table mb-0">
              <thead>
                <tr><th>Pedido / cliente</th><th>Entrega</th><th>Productos</th><th>Total</th><th>Pago</th><th>Estado</th><th>Acción</th></tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td><strong>#{pedido.id}</strong><br /><span className="text-sm text-gray-600">{pedido.clienteNombre}</span></td>
                    <td>{pedido.tipoEntrega === 'retiro' ? 'Retiro en tienda' : pedido.direccion}</td>
                    <td>{pedido.items.map((item) => `${item.cantidad} × ${item.nombre}`).join(', ')}</td>
                    <td className="font-bold">${pedido.total.toLocaleString('es-CL')}</td>
                    <td>{pedido.estadoPago}</td>
                    <td>{pedido.estado}</td>
                    <td>
                      {pedido.estadoPago === 'APROBADO' && pedido.estado !== 'ENTREGADO' ? (
                        <button type="button" onClick={() => cambiarEstadoPedido(pedido)} className="inline-flex items-center justify-center rounded border border-orange-600 bg-transparent px-2 py-1 text-sm text-orange-600 transition hover:bg-orange-600 hover:text-white">
                          {pedido.estado === 'PENDIENTE' ? 'Despachar' : 'Marcar entregado'}
                        </button>
                      ) : pedido.estado === 'ENTREGADO' ? 'Completado' : 'Sin acción'}
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
