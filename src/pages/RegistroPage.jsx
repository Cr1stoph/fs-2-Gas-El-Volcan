import { Link } from 'react-router-dom';

export function RegistroPage() {
  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Regístrate</h2>
          <p className="text-gray-600">Completa tus datos para crear una cuenta.</p>
        </div>

        <form id="form-registro" className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-left text-gray-700 font-medium mb-1">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre" autoComplete="name" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div>
            <label htmlFor="correo" className="block text-left text-gray-700 font-medium mb-1">Correo Electrónico:</label>
            <input type="email" id="correo" name="correo" placeholder="Ingresa tu correo" autoComplete="email" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div>
            <label htmlFor="contrasena" className="block text-left text-gray-700 font-medium mb-1">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" placeholder="Ingresa tu contraseña" autoComplete="new-password" required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Regístrate</button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <p>¿Ya tienes una cuenta? <Link to="/login" className="text-orange-600 hover:underline">Inicia sesión aquí</Link></p>
          <p><Link to="/" className="text-orange-600 hover:underline">Volver a la página principal</Link></p>
        </div>
      </section>
    </main>
  );
}