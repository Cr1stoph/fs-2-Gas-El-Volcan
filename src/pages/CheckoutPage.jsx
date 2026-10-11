import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { calcularTotal, COSTO_DESPACHO, getPrecioProducto, pagoAprobado, validarCheckout } from '../data/commerce';
import { createPedido } from '../data/mockDb';
import { getPerfilCliente } from '../data/profile';

export function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const perfil = getPerfilCliente();
  const navigate = useNavigate();
  const [tipoEntrega, setTipoEntrega] = useState('despacho');
  const [formaPago, setFormaPago] = useState('contraentrega');
  const [errores, setErrores] = useState({});
  const despacho = tipoEntrega === 'despacho' ? COSTO_DESPACHO : 0;
  const total = calcularTotal(cart, despacho);

  const confirmarCompra = (event) => {
    event.preventDefault();
    const formulario = new FormData(event.currentTarget);
    const datos = Object.fromEntries(formulario.entries());
    datos.tipoEntrega = tipoEntrega;
    datos.formaPago = formaPago;

    const nuevosErrores = validarCheckout(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0 || cart.length === 0) return;

    const aprobado = pagoAprobado(datos);
    const pedido = createPedido({
      cliente: {
        nombre: datos.nombre.trim(),
        correo: datos.correo.trim(),
        telefono: datos.telefono.trim(),
        direccion: tipoEntrega === 'despacho' ? datos.direccion.trim() : 'Retiro en tienda',
      },
      tipoEntrega,
      formaPago,
      items: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: getPrecioProducto(item),
        cantidad: item.cantidad,
      })),
      subtotal: calcularTotal(cart),
      despacho,
      total,
      estadoPago: aprobado ? 'Aprobado' : 'Rechazado',
      estado: aprobado ? 'Pendiente' : 'Pago rechazado',
    });

    if (aprobado) clearCart();
    navigate(`/pago-${aprobado ? 'correcto' : 'fallido'}/${pedido.id}`);
  };

  if (cart.length === 0) {
    return (
      <main className="container-fluid page-content flex-grow px-3 px-lg-5 py-5">
        <div className="mx-auto max-w-2xl rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-3 text-2xl font-extrabold">No hay productos para pagar</h1>
          <p className="text-gray-600">Agrega al menos un producto al carrito antes de continuar.</p>
          <Link to="/categorias" className="btn btn-primary rounded-pill px-4">Ver productos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid page-content flex-grow px-3 px-lg-5 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Último paso</p>
        <h1 className="mb-0 text-3xl font-extrabold md:text-4xl">Datos de entrega y pago</h1>
      </section>

      <form onSubmit={confirmarCompra} noValidate>
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <section className="mb-4 rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Datos del cliente</h2>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label font-semibold" htmlFor="checkout-nombre">Nombre completo *</label>
                  <input className="form-control" id="checkout-nombre" name="nombre" autoComplete="name" defaultValue={perfil.nombre} aria-invalid={Boolean(errores.nombre)} />
                  {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label font-semibold" htmlFor="checkout-correo">Correo electrónico *</label>
                  <input className="form-control" id="checkout-correo" name="correo" type="email" autoComplete="email" defaultValue={perfil.correo} aria-invalid={Boolean(errores.correo)} />
                  {errores.correo && <small className="text-danger">{errores.correo}</small>}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label font-semibold" htmlFor="checkout-telefono">Teléfono *</label>
                  <input className="form-control" id="checkout-telefono" name="telefono" type="tel" autoComplete="tel" defaultValue={perfil.telefono} aria-invalid={Boolean(errores.telefono)} />
                  {errores.telefono && <small className="text-danger">{errores.telefono}</small>}
                </div>
              </div>
            </section>

            <section className="mb-4 rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Entrega</h2>
              <div className="mb-3 flex flex-wrap gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-orange-100 p-3">
                  <input type="radio" name="tipoEntrega" value="despacho" checked={tipoEntrega === 'despacho'} onChange={() => setTipoEntrega('despacho')} />
                  <span><strong>Despacho a domicilio</strong><br /><small className="text-gray-500">Chillán y alrededores</small></span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-orange-100 p-3">
                  <input type="radio" name="tipoEntrega" value="retiro" checked={tipoEntrega === 'retiro'} onChange={() => setTipoEntrega('retiro')} />
                  <span><strong>Retiro en tienda</strong><br /><small className="text-gray-500">Sin costo de despacho</small></span>
                </label>
              </div>
              {errores.tipoEntrega && <p className="text-danger">{errores.tipoEntrega}</p>}
              {tipoEntrega === 'despacho' ? (
                <div>
                  <label className="form-label font-semibold" htmlFor="checkout-direccion">Dirección de entrega *</label>
                  <input className="form-control" id="checkout-direccion" name="direccion" autoComplete="street-address" aria-invalid={Boolean(errores.direccion)} />
                  {errores.direccion && <small className="text-danger">{errores.direccion}</small>}
                </div>
              ) : <p className="mb-0 rounded-lg bg-orange-50 p-3 text-sm text-gray-700">Podrás retirar tu pedido en nuestro punto de atención en Chillán.</p>}
            </section>

            <section className="rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Forma de pago</h2>
              <div className="mb-3 flex flex-wrap gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-orange-100 p-3">
                  <input type="radio" name="formaPago" value="contraentrega" checked={formaPago === 'contraentrega'} onChange={() => setFormaPago('contraentrega')} />
                  <span><strong>Pago al recibir</strong><br /><small className="text-gray-500">Efectivo o transferencia</small></span>
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-orange-100 p-3">
                  <input type="radio" name="formaPago" value="tarjeta" checked={formaPago === 'tarjeta'} onChange={() => setFormaPago('tarjeta')} />
                  <span><strong>Tarjeta (simulada)</strong><br /><small className="text-gray-500">Sin cobros reales</small></span>
                </label>
              </div>
              {formaPago === 'tarjeta' && (
                <div>
                  <label className="form-label font-semibold" htmlFor="checkout-tarjeta">Número de tarjeta de prueba *</label>
                  <input
                    className="form-control"
                    id="checkout-tarjeta"
                    name="numeroTarjeta"
                    type="text"
                    inputMode="numeric"
                    maxLength="16"
                    placeholder="1234567812345678"
                    aria-invalid={Boolean(errores.numeroTarjeta)}
                  />
                  <small className="text-gray-500">Usa 0000000000000000 para simular un rechazo.</small>
                  {errores.numeroTarjeta && <p className="mb-0 text-danger">{errores.numeroTarjeta}</p>}
                </div>
              )}
              {errores.formaPago && <p className="text-danger">{errores.formaPago}</p>}
            </section>
          </div>

          <aside className="col-12 col-lg-5">
            <section className="sticky top-24 rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <h2 className="mb-4 border-b border-orange-100 pb-3 text-xl font-bold">Resumen de compra</h2>
              <div className="mb-3 space-y-3">
                {cart.map((item) => (
                  <div className="flex justify-between gap-3 text-sm" key={item.id}>
                    <span className="text-gray-600">{item.cantidad} × {item.nombre}</span>
                    <span className="font-semibold">${(getPrecioProducto(item) * item.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-t border-orange-100 pt-3 text-sm">
                <span>Productos</span><span>${calcularTotal(cart).toLocaleString('es-CL')}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span>{tipoEntrega === 'despacho' ? 'Despacho' : 'Retiro'}</span>
                <span>{despacho ? `$${despacho.toLocaleString('es-CL')}` : 'Gratis'}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-orange-100 pt-4 text-xl font-extrabold">
                <span>Total</span><span className="text-orange-700">${total.toLocaleString('es-CL')}</span>
              </div>
              <button type="submit" className="btn btn-primary mt-5 w-100 rounded-lg py-3 font-bold">
                Confirmar y pagar
              </button>
              <p className="mt-3 mb-0 text-center text-xs text-gray-500">La tarjeta es una simulación de prueba; no se realizan cobros.</p>
            </section>
          </aside>
        </div>
      </form>
    </main>
  );
}
