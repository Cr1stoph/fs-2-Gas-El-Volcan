import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  // Extraemos la función desde nuestro custom hook
  const { handleLoginSubmit } = useLogin();

  return (
    <main className="container mx-auto px-4 py-12 flex items-center justify-center flex-grow">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-3">
            👤
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-sm text-gray-500 mt-1">Ingresa tus datos para acceder a tu cuenta</p>
        </div>

        {/* Le pasamos la función del hook al evento onSubmit del formulario */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700 mb-2">Correo o Usuario</label>
            <input type="text" id="usuario" name="usuario" placeholder="tu@correo.cl" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="••••••••" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-2" />
              Recordarme
            </label>
            <a href="#" className="text-orange-600 hover:underline font-medium">¿Olvidaste tu clave?</a>
          </div>

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg text-base">
            Ingresar
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 mb-3">¿Aún no tienes una cuenta?</p>
          <Link to="/registro" className="inline-block w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-2.5 px-4 rounded-lg transition text-sm text-center">
            Crear una cuenta nueva
          </Link>
        </div>

      </div>
    </main>
  );
}