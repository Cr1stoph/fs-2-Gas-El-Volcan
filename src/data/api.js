import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';
const TOKEN_KEY = 'gas-volcan:access-token';
const SESSION_KEY = 'gas-volcan:session';

function imagenProducto(nombre = '') {
  const archivo = nombre.toLocaleLowerCase('es-CL');
  if (archivo.includes('flexible')) return flexibleImagen;
  if (archivo.includes('regulador')) return reguladorImagen;
  return cilindroImagen;
}

async function request(path, options = {}) {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!response.ok) {
    let message = `La API respondió con estado ${response.status}.`;
    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch {
      // La respuesta puede no incluir JSON.
    }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export function guardarSesion(auth) {
  sessionStorage.setItem(TOKEN_KEY, auth.token);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({
    correo: auth.email,
    nombre: auth.username,
    rol: auth.role,
  }));
  return auth;
}

export function getSesion() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function cerrarSesion() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export async function iniciarSesion(correo, password) {
  const auth = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: correo, password }),
  });
  return guardarSesion(auth);
}

export async function registrarUsuario({ username, email, password }) {
  const auth = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
  return guardarSesion(auth);
}

export async function obtenerProductos() {
  const productos = await request('/productos');
  return productos.map((producto) => ({ ...producto, img: imagenProducto(producto.nombre) }));
}

export function obtenerProducto(id) {
  return request(`/productos/${id}`).then((producto) => ({
    ...producto,
    img: imagenProducto(producto.nombre),
  }));
}

export function crearProducto(producto) {
  return request('/productos', { method: 'POST', body: JSON.stringify(producto) });
}

export function actualizarProducto(id, producto) {
  return request(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(producto) });
}

export function eliminarProducto(id) {
  return request(`/productos/${id}`, { method: 'DELETE' });
}

export function obtenerPedidos() {
  return request('/pedidos');
}

export function obtenerPedido(id) {
  return request(`/pedidos/${id}`);
}

export function crearPedido(pedido) {
  return request('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
}

export function avanzarPedido(id) {
  return request(`/pedidos/${id}/estado`, { method: 'PATCH' });
}
