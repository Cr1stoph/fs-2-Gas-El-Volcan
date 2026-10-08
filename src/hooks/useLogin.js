import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí a futuro irá la validación real con base de datos.
    // Por ahora, simulamos que el login es exitoso y redirigimos al admin:
    navigate('/admin');
  };

  const goBack = () => navigate(-1); // Función extra por si quieres un botón de volver

  return { handleLoginSubmit, goBack };
}