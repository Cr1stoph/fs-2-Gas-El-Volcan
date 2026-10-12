import { useNavigate } from 'react-router-dom';
import { iniciarSesionDemo } from '../data/demoAuth';

export function useLogin() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formulario = new FormData(e.currentTarget);
    const sesion = iniciarSesionDemo(formulario.get('correo'));
    navigate(sesion.rol === 'admin' ? '/admin' : '/categorias', { replace: true });
  };

  const goBack = () => navigate(-1); // Función extra por si quieres un botón de volver

  return { handleLoginSubmit, goBack };
}