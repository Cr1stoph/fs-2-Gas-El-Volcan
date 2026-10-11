import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';

const PRODUCTOS_KEY = 'gas-volcan:productos';
const PEDIDOS_KEY = 'gas-volcan:pedidos';

const productosIniciales = [
  { id: 1, nombre: 'Cilindro 5 kg', precio: 10000, precioOferta: null, img: cilindroImagen, stock: 50, categoria: 'Cilindros' },
  { id: 2, nombre: 'Cilindro 11 kg', precio: 15500, precioOferta: 13990, img: cilindroImagen, stock: 120, categoria: 'Cilindros' },
  { id: 3, nombre: 'Cilindro 15 kg', precio: 21000, precioOferta: null, img: cilindroImagen, stock: 80, categoria: 'Cilindros' },
  { id: 4, nombre: 'Cilindro 45 kg', precio: 65000, precioOferta: null, img: cilindroImagen, stock: 12, categoria: 'Cilindros' },
  { id: 5, nombre: 'Regulador de gas', precio: 10990, precioOferta: 8990, img: reguladorImagen, stock: 35, categoria: 'Accesorios' },
  { id: 6, nombre: 'Flexible para gas', precio: 5990, precioOferta: null, img: flexibleImagen, stock: 40, categoria: 'Accesorios' },
];

function leerColeccion(clave, iniciales = []) {
  const guardado = localStorage.getItem(clave);
  if (guardado === null) return iniciales.map((item) => ({ ...item }));

  const datos = JSON.parse(guardado);
  if (!Array.isArray(datos)) {
    throw new Error(`Los datos guardados en "${clave}" no tienen un formato válido.`);
  }
  return datos;
}

function guardarColeccion(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

export function getProductos() {
  return leerColeccion(PRODUCTOS_KEY, productosIniciales);
}

export function getProductoById(id) {
  return getProductos().find((producto) => producto.id === Number(id)) ?? null;
}

export function getCategorias() {
  return [...new Set(getProductos().map((producto) => producto.categoria))].sort();
}

export function createProducto(nuevoProducto) {
  const productos = getProductos();
  const producto = {
    ...nuevoProducto,
    id: productos.reduce((maximo, item) => Math.max(maximo, item.id), 0) + 1,
    precioOferta: nuevoProducto.precioOferta || null,
  };
  guardarColeccion(PRODUCTOS_KEY, [...productos, producto]);
  return producto;
}

export function updateProducto(id, datosActualizados) {
  const productos = getProductos();
  const indice = productos.findIndex((producto) => producto.id === Number(id));
  if (indice === -1) return null;

  productos[indice] = {
    ...productos[indice],
    ...datosActualizados,
    precioOferta: datosActualizados.precioOferta || null,
  };
  guardarColeccion(PRODUCTOS_KEY, productos);
  return productos[indice];
}

export function deleteProducto(id) {
  const productos = getProductos();
  const restantes = productos.filter((producto) => producto.id !== Number(id));
  if (restantes.length === productos.length) return false;
  guardarColeccion(PRODUCTOS_KEY, restantes);
  return true;
}

export function getPedidos() {
  return leerColeccion(PEDIDOS_KEY);
}

export function getPedidoById(id) {
  return getPedidos().find((pedido) => pedido.id === String(id)) ?? null;
}

export function createPedido(datosPedido) {
  const pedidos = getPedidos();
  const pedido = {
    ...datosPedido,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    creadoEn: new Date().toISOString(),
  };
  guardarColeccion(PEDIDOS_KEY, [pedido, ...pedidos]);
  return pedido;
}

export function updateEstadoPedido(id, estado) {
  const pedidos = getPedidos();
  const indice = pedidos.findIndex((pedido) => pedido.id === String(id));
  if (indice === -1) return null;

  pedidos[indice] = { ...pedidos[indice], estado };
  guardarColeccion(PEDIDOS_KEY, pedidos);
  return pedidos[indice];
}
