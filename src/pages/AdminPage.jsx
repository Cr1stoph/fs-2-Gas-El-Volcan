import { useState } from 'react';
import { Link } from 'react-router-dom';
import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';
import {
  createProducto,
  deleteProducto,
  getPedidos,
  getProductos,
  updateEstadoPedido,
  updateProducto,
} from '../data/mockDb';

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
  const [productos, setProductos] = useState(getProductos);
  const [pedidos, setPedidos] = useState(getPedidos);
  const [formulario, setFormulario] = useState(formularioVacio);
  const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const ventas = pedidos
    .filter((pedido) => pedido.estadoPago === 'Aprobado')
    .reduce((total, pedido) => total + pedido.total, 0);
  const pedidosActivos = pedidos.filter((pedido) => pedido.estado === 'Pendiente' || pedido.estado === 'En camino').length;
  const stockTotal = productos.reduce((total, producto) => total + producto.stock, 0);

  const actualizarCampo = (event) => {
    setFormulario((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const guardarProducto = (event) => {
    event.preventDefault();
    const precio = Number(formulario.precio);
    const precioOferta = formulario.precioOferta ? Number(formulario.precioOferta) : null;
    if (precioOferta && precioOferta >= precio) {
      setMensaje('El precio de oferta debe ser menor al precio normal.');
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
    if (productoEditando !== null) {
      updateProducto(productoEditando, datos);
      setMensaje('Producto actualizado correctamente.');
    } else {
      createProducto(datos);
      setMensaje('Producto agregado correctamente.');
    }
    setProductos(getProductos());
    setFormulario(formularioVacio);
    setProductoEditando(null);
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

  const quitarProducto = (producto) => {
    if (!window.confirm(`¿Eliminar ${producto.nombre} del catálogo?`)) return;
    deleteProducto(producto.id);
    setProductos(getProductos());
    setMensaje('Producto eliminado del catálogo.');
  };

  const cambiarEstadoPedido = (pedido) => {
    const siguienteEstado = pedido.estado === 'Pendiente' ? 'En camino' : 'Entregado';
    updateEstadoPedido(pedido.id, siguienteEstado);
    setPedidos(getPedidos());
  };

  const cancelarEdicion = () => {
    setFormulario(formularioVacio);
    setProductoEditando(null);
    setMensaje('');
  };

  return (
    <main className="container-fluid page-content flex-grow px-3 px-lg-5 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Administración</p>
            <h1 className="mb-2 text-3xl font-extrabold">Panel de Gas El Volcán</h1>
            <p className="mb-0 text-orange-50">Gestiona el inventario y revisa el estado de los pedidos.</p>
          </div>
          <Link to="/" className="btn btn-light rounded-pill px-4 font-bold text-orange-700">Ir a la tienda</Link>
        </div>
      </section>

      <section aria-label="Indicadores del negocio" className="row g-4 mb-5">
        {[
          { titulo: 'Ventas aprobadas', valor: `$${ventas.toLocaleString('es-CL')}`, icono: '💰' },
          { titulo: 'Pedidos activos', valor: pedidosActivos, icono: '📦' },
          { titulo: 'Unidades en stock', valor: stockTotal, icono: '🛢️' },
          { titulo: 'Productos', valor: productos.length, icono: '🏷️' },
        ].map((indicador) => (
          <article className="col-12 col-sm-6 col-xl-3" key={indicador.titulo}>
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

      <section className="mb-5 rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Inventario</p>
          <h2 className="mb-1 text-2xl font-extrabold">Administrar productos</h2>
          <p className="mb-0 text-sm text-gray-600">Los cambios quedan guardados en este navegador.</p>
        </div>
        <form onSubmit={guardarProducto} className="row align-items-end g-3 border-b border-orange-100 pb-5">
          <div className="col-12 col-md-6 col-xl-3">
            <label htmlFor="producto-nombre" className="form-label font-semibold">Nombre</label>
            <input id="producto-nombre" className="form-control" name="nombre" value={formulario.nombre} onChange={actualizarCampo} required />
          </div>
          <div className="col-6 col-md-3 col-xl-2">
            <label htmlFor="producto-precio" className="form-label font-semibold">Precio normal</label>
            <input id="producto-precio" className="form-control" name="precio" type="number" min="1" value={formulario.precio} onChange={actualizarCampo} required />
          </div>
          <div className="col-6 col-md-3 col-xl-2">
            <label htmlFor="producto-oferta" className="form-label font-semibold">Precio oferta</label>
            <input id="producto-oferta" className="form-control" name="precioOferta" type="number" min="1" value={formulario.precioOferta} onChange={actualizarCampo} placeholder="Opcional" />
          </div>
          <div className="col-6 col-md-3 col-xl-2">
            <label htmlFor="producto-stock" className="form-label font-semibold">Stock</label>
            <input id="producto-stock" className="form-control" name="stock" type="number" min="0" value={formulario.stock} onChange={actualizarCampo} required />
          </div>
          <div className="col-6 col-md-3 col-xl-2">
            <label htmlFor="producto-categoria" className="form-label font-semibold">Categoría</label>
            <select id="producto-categoria" className="form-select" name="categoria" value={formulario.categoria} onChange={actualizarCampo}>
              <option>Cilindros</option>
              <option>Accesorios</option>
            </select>
          </div>
          <div className="col-12 col-xl-1">
            <button type="submit" className="btn btn-primary w-100 rounded-lg font-bold">
              {productoEditando === null ? 'Agregar' : 'Guardar'}
            </button>
          </div>
          {productoEditando !== null && (
            <div className="col-12">
              <button type="button" onClick={cancelarEdicion} className="btn btn-outline-secondary btn-sm">Cancelar edición</button>
            </div>
          )}
        </form>
        {mensaje && <p className="alert alert-info mt-3 mb-0 py-2" role="status">{mensaje}</p>}

        <div className="mt-4 overflow-x-auto">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
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
                    <button type="button" onClick={() => editarProducto(producto)} className="btn btn-outline-primary btn-sm me-2">Editar</button>
                    <button type="button" onClick={() => quitarProducto(producto)} className="btn btn-outline-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-orange-600">Despachos</p>
          <h2 className="mb-1 text-2xl font-extrabold">Pedidos recibidos</h2>
          <p className="mb-0 text-sm text-gray-600">Actualiza el estado de los pagos aprobados durante la preparación y entrega.</p>
        </div>
        {pedidos.length === 0 ? (
          <p className="rounded-xl bg-orange-50 p-4 text-center text-gray-600">Aún no hay pedidos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr><th>Pedido / cliente</th><th>Entrega</th><th>Productos</th><th>Total</th><th>Pago</th><th>Estado</th><th>Acción</th></tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td><strong>#{pedido.id}</strong><br /><span className="text-sm text-gray-600">{pedido.cliente.nombre}</span></td>
                    <td>{pedido.tipoEntrega === 'retiro' ? 'Retiro en tienda' : pedido.cliente.direccion}</td>
                    <td>{pedido.items.map((item) => `${item.cantidad} × ${item.nombre}`).join(', ')}</td>
                    <td className="font-bold">${pedido.total.toLocaleString('es-CL')}</td>
                    <td>{pedido.estadoPago}</td>
                    <td>{pedido.estado}</td>
                    <td>
                      {pedido.estadoPago === 'Aprobado' && pedido.estado !== 'Entregado' ? (
                        <button type="button" onClick={() => cambiarEstadoPedido(pedido)} className="btn btn-outline-primary btn-sm">
                          {pedido.estado === 'Pendiente' ? 'Despachar' : 'Marcar entregado'}
                        </button>
                      ) : pedido.estado === 'Entregado' ? 'Completado' : 'Sin acción'}
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
