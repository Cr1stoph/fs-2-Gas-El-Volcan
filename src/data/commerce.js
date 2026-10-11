export const COSTO_DESPACHO = 2500;

export function getPrecioProducto(producto) {
  return producto.precioOferta && producto.precioOferta < producto.precio
    ? producto.precioOferta
    : producto.precio;
}

export function calcularTotal(carrito, despacho = 0) {
  return carrito.reduce(
    (total, item) => total + getPrecioProducto(item) * item.cantidad,
    despacho,
  );
}

export function filtrarProductos(productos, { categoria = '', busqueda = '', soloOfertas = false } = {}) {
  const texto = busqueda.trim().toLocaleLowerCase('es-CL');
  return productos.filter((producto) => {
    const coincideCategoria = !categoria || producto.categoria === categoria;
    const coincideBusqueda = !texto
      || `${producto.nombre} ${producto.categoria}`.toLocaleLowerCase('es-CL').includes(texto);
    const tieneOferta = producto.precioOferta && producto.precioOferta < producto.precio;
    return coincideCategoria && coincideBusqueda && (!soloOfertas || tieneOferta);
  });
}

export function validarCheckout(datos) {
  const errores = {};
  if (!datos.nombre?.trim()) errores.nombre = 'Ingresa tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo ?? '')) {
    errores.correo = 'Ingresa un correo válido.';
  }
  const telefono = datos.telefono ?? '';
  const digitosTelefono = telefono.replace(/\D/g, '');
  if (!/^\+?[0-9][0-9\s-]{7,14}$/.test(telefono)
    || digitosTelefono.length < 8
    || digitosTelefono.length > 12) {
    errores.telefono = 'Ingresa un teléfono válido.';
  }
  if (datos.tipoEntrega === 'despacho' && !datos.direccion?.trim()) {
    errores.direccion = 'Ingresa la dirección de despacho.';
  }
  if (!['despacho', 'retiro'].includes(datos.tipoEntrega)) {
    errores.tipoEntrega = 'Selecciona una opción de entrega.';
  }
  if (!['tarjeta', 'contraentrega'].includes(datos.formaPago)) {
    errores.formaPago = 'Selecciona una forma de pago.';
  }
  if (datos.formaPago === 'tarjeta' && !/^\d{16}$/.test(datos.numeroTarjeta ?? '')) {
    errores.numeroTarjeta = 'Ingresa los 16 dígitos de la tarjeta de prueba.';
  }
  return errores;
}

export function pagoAprobado(datos) {
  return datos.formaPago !== 'tarjeta' || datos.numeroTarjeta !== '0000000000000000';
}
