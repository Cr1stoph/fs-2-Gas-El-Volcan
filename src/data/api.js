import cilindroImagen from '../assets/cilindro.svg';
import reguladorImagen from '../assets/regulador.svg';
import flexibleImagen from '../assets/flexible.svg';

/**
 * Todas las llamadas apuntan a /api/v1.
 * VITE_API_URL puede venir con /api, con /api/v1 o sin sufijo: siempre se normaliza.
 */
function normalizarBase(valor) {
  const base = String(valor ?? '/api/v1').replace(/\/+$/, '');
  if (/\/api\/v\d+$/.test(base)) return base;
  if (/\/api$/.test(base)) return `${base}/v1`;
  return `${base}/api/v1`;
}

export const API_BASE = normalizarBase(import.meta.env?.VITE_API_URL);
const TOKEN_KEY = 'gas-volcan:access-token';
const SESSION_KEY = 'gas-volcan:session';
export const AUTH_CHANGED_EVENT = 'gas-volcan:auth-changed';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function normalizarRol(rol) {
  if (!rol) return null;
  if (rol.startsWith('ROLE_')) return rol;
  return `ROLE_${String(rol).toUpperCase()}`;
}

function imagenProducto(nombre = '') {
  const archivo = nombre.toLocaleLowerCase('es-CL');
  if (archivo.includes('flexible')) return flexibleImagen;
  if (archivo.includes('regulador')) return reguladorImagen;
  return cilindroImagen;
}

function decodificarJwt(token) {
  try {
    const payload = token.split('.')[1];
    const normalizado = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(normalizado));
  } catch {
    return null;
  }
}

export function tokenValido(token) {
  if (!token) return false;
  const claims = decodificarJwt(token);
  return Boolean(claims?.exp && claims.exp * 1000 > Date.now());
}

async function request(path, options = {}) {
  const { sinAuth = false, ...config } = options;
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = new Headers(config.headers);
  if (config.body != null) headers.set('Content-Type', 'application/json');
  if (token && !sinAuth) headers.set('Authorization', `Bearer ${token}`);

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...config, headers });
  } catch {
    throw new ApiError('No fue posible conectar con el servidor.', 0);
  }

  if (!response.ok) {
    let body = null;
    try {
      body = await response.json();
    } catch {
      // La respuesta puede no incluir JSON.
    }
    if (response.status === 401 && !sinAuth) cerrarSesion();
    throw new ApiError(body?.message ?? `La API respondió con estado ${response.status}.`, response.status);
  }

  if (response.status === 204) return null;
  const texto = await response.text();
  if (!texto) return null;
  try {
    return JSON.parse(texto);
  } catch {
    throw new ApiError('El servidor devolvió una respuesta inválida.', response.status);
  }
}

export function guardarSesion(auth) {
  const rol = normalizarRol(auth.role ?? auth.rol);
  localStorage.setItem(TOKEN_KEY, auth.token);
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    correo: auth.email ?? auth.correo,
    nombre: auth.username ?? auth.nombre,
    rol,
    role: rol,
  }));
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  return getSesion();
}

export function getSesion() {
  const token = localStorage.getItem(TOKEN_KEY);
  const raw = localStorage.getItem(SESSION_KEY);
  if (!token || !raw || !tokenValido(token)) {
    if (token || raw) cerrarSesion();
    return null;
  }
  try {
    const datos = JSON.parse(raw);
    const rol = normalizarRol(datos.rol ?? datos.role);
    if (!datos.correo || !rol) throw new Error('Sesión incompleta');
    return { ...datos, rol, role: rol };
  } catch {
    cerrarSesion();
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
}

/** Confirma con el backend que el token siga vigente y refresca los datos del usuario. */
export async function validarSesion() {
  const sesion = getSesion();
  if (!sesion) return null;
  try {
    const usuario = await request('/auth/me');
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      ...sesion,
      correo: usuario.email,
      nombre: usuario.username,
      rol: normalizarRol(usuario.role),
      role: normalizarRol(usuario.role),
    }));
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
    return getSesion();
  } catch {
    cerrarSesion();
    return null;
  }
}

export async function refrescarToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  const auth = await request('/auth/refresh', {
    method: 'POST',
    sinAuth: true,
    body: JSON.stringify({ token }),
  });
  return guardarSesion(auth);
}

export async function iniciarSesion(correo, password) {
  const auth = await request('/auth/login', {
    method: 'POST',
    sinAuth: true,
    body: JSON.stringify({ email: correo, password }),
  });
  return guardarSesion(auth);
}

export async function registrarUsuario({ username, email, password }) {
  const auth = await request('/auth/register', {
    method: 'POST',
    sinAuth: true,
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

export function obtenerMisPedidos() {
  return request('/pedidos/mios');
}

export function obtenerPedido(id) {
  return request(`/pedidos/${id}`);
}

export function crearPedido(pedido) {
  return request('/pedidos', { method: 'POST', body: JSON.stringify(pedido) });
}

export function actualizarPedido(id, pedido) {
  return request(`/pedidos/${id}`, { method: 'PUT', body: JSON.stringify(pedido) });
}

export function eliminarPedido(id) {
  return request(`/pedidos/${id}`, { method: 'DELETE' });
}

export function avanzarPedido(id) {
  return request(`/pedidos/${id}/estado`, { method: 'PATCH' });
}

// Administración (sólo ADMIN en el backend)
export function obtenerUsuarios() {
  return request('/usuarios');
}

export function crearUsuario(usuario) {
  return request('/usuarios', { method: 'POST', body: JSON.stringify(usuario) });
}

export function actualizarUsuario(id, usuario) {
  return request(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(usuario) });
}

export function eliminarUsuario(id) {
  return request(`/usuarios/${id}`, { method: 'DELETE' });
}

export function obtenerCategorias() {
  return request('/categorias');
}

export function crearCategoria(categoria) {
  return request('/categorias', { method: 'POST', body: JSON.stringify(categoria) });
}

export function actualizarCategoria(id, categoria) {
  return request(`/categorias/${id}`, { method: 'PUT', body: JSON.stringify(categoria) });
}

export function eliminarCategoria(id) {
  return request(`/categorias/${id}`, { method: 'DELETE' });
}
