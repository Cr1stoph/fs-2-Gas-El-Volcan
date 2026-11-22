import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export function useLogin() {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formulario = new FormData(e.currentTarget);
    setError('');
    try {
      const sesion = await iniciarSesion(
        formulario.get('correo'),
        formulario.get('password'),
      );
      const rol = sesion?.rol ?? sesion?.role;
      if (rol === 'ROLE_ADMIN') {
        navigate('/admin', { replace: true });
      } else if (rol === 'ROLE_VENDEDOR') {
        navigate('/vendedor', { replace: true });
      } else {
        navigate('/categorias', { replace: true });
      }
    } catch (exception) {
      setError(exception.message);
    }
  };

  const goBack = () => navigate(-1); // Función extra por si quieres un botón de volver

  return { handleLoginSubmit, goBack, error };
}
