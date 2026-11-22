import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth-context-store';
import {
  AUTH_CHANGED_EVENT,
  cerrarSesion as cerrarSesionApi,
  getSesion,
  iniciarSesion as iniciarSesionApi,
  registrarUsuario as registrarApi,
  validarSesion,
} from '../data/api';

/**
 * Estado de autenticación reactivo y persistente.
 * Restaura la sesión en F5 desde localStorage y la valida contra GET /api/v1/auth/me.
 */
export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => getSesion());
  const [verificando, setVerificando] = useState(() => Boolean(getSesion()));

  useEffect(() => {
    const actualizar = () => setSesion(getSesion());
    window.addEventListener(AUTH_CHANGED_EVENT, actualizar);
    window.addEventListener('storage', actualizar);

    validarSesion()
      .then(actualizar)
      .catch(actualizar)
      .finally(() => setVerificando(false));

    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, actualizar);
      window.removeEventListener('storage', actualizar);
    };
  }, []);

  const value = useMemo(() => ({
    sesion,
    verificando,
    esAdmin: sesion?.rol === 'ROLE_ADMIN',
    esVendedor: sesion?.rol === 'ROLE_VENDEDOR',
    esCliente: sesion?.rol === 'ROLE_CLIENTE',
    iniciarSesion: async (correo, password) => {
      const resultado = await iniciarSesionApi(correo, password);
      setSesion(getSesion());
      return resultado;
    },
    registrar: async (datos) => {
      const resultado = await registrarApi(datos);
      setSesion(getSesion());
      return resultado;
    },
    cerrarSesion: () => {
      cerrarSesionApi();
      setSesion(null);
    },
  }), [sesion, verificando]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
