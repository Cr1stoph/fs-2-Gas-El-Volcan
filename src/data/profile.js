const PROFILE_KEY = 'gas-volcan:perfil';

export function getPerfilCliente() {
  const perfilGuardado = localStorage.getItem(PROFILE_KEY);
  if (perfilGuardado === null) return { nombre: '', correo: '', telefono: '' };

  const perfil = JSON.parse(perfilGuardado);
  if (!perfil || typeof perfil !== 'object' || Array.isArray(perfil)) {
    throw new Error('El perfil guardado no tiene un formato válido.');
  }
  return {
    nombre: perfil.nombre ?? '',
    correo: perfil.correo ?? '',
    telefono: perfil.telefono ?? '',
  };
}

export function guardarPerfilCliente(perfil) {
  const datos = {
    nombre: perfil.nombre.trim(),
    correo: perfil.correo.trim(),
    telefono: perfil.telefono.trim(),
  };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(datos));
  return datos;
}
