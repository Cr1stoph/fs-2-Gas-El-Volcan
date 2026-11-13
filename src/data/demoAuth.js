import { cerrarSesion, getSesion, iniciarSesion } from './api';

export function iniciarSesionDemo(correo, password) {
  return iniciarSesion(correo, password);
}

export function getSesionDemo() {
  return getSesion();
}

export { cerrarSesion };
