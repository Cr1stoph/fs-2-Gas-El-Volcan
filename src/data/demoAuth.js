const ADMIN_EMAIL = 'admin@gmail.com';
const SESSION_KEY = 'gas-volcan:demo-session';

export function iniciarSesionDemo(correo) {
  if (typeof correo !== 'string' || correo.trim() === '') {
    throw new Error('Ingresa un correo electrónico válido.');
  }

  const correoNormalizado = correo.trim().toLowerCase();
  const sesion = {
    correo: correoNormalizado,
    rol: correoNormalizado === ADMIN_EMAIL ? 'admin' : 'cliente',
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ correo: sesion.correo }));
  return sesion;
}

export function getSesionDemo() {
  const sesionGuardada = sessionStorage.getItem(SESSION_KEY);
  if (sesionGuardada === null) return null;

  const sesion = JSON.parse(sesionGuardada);
  if (!sesion || typeof sesion !== 'object' || typeof sesion.correo !== 'string' || !sesion.correo) {
    throw new Error('La sesión guardada no tiene un formato válido.');
  }

  const correo = sesion.correo.trim().toLowerCase();
  return {
    correo,
    rol: correo === ADMIN_EMAIL ? 'admin' : 'cliente',
  };
}
