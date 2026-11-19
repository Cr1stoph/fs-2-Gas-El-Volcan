import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesionDemo } from '../data/demoAuth';

export function useLogin() {
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formulario = new FormData(e.currentTarget);
    setError('');
    try {
      const sesion = await iniciarSesionDemo(formulario.get('correo'), formulario.get('password'));
      if (sesion.role === 'ROLE_ADMIN') {
        navigate('/admin', { replace: true });
      } else if (sesion.role === 'ROLE_VENDEDOR') {
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