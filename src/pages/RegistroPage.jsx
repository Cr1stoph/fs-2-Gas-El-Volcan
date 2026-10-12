import { useState } from 'react';
import { Link } from 'react-router-dom';
import { guardarPerfilCliente } from '../data/profile';

export function RegistroPage() {
  const [guardado, setGuardado] = useState(false);

  const registrarPerfil = (event) => {
    event.preventDefault();
    const formulario = new FormData(event.currentTarget);
    guardarPerfilCliente({
      nombre: formulario.get('nombre'),
      correo: formulario.get('correo'),
      telefono: formulario.get('telefono'),
    });
    setGuardado(true);
    event.currentTarget.reset();
  };

  return (
    <main className="flex flex-grow items-center justify-center px-3 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-orange-100 bg-white p-5 shadow-xl md:p-8">
        <div className="mb-6 text-center">
          <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-3xl text-orange-700" aria-hidden="true">👤</span>
          <h1 className="mb-2 text-2xl font-extrabold text-gray-900">Crear perfil de compra</h1>
          <p className="mb-0 text-sm text-gray-600">Guarda tus datos para completar más rápido el próximo pedido.</p>
        </div>

        <form onSubmit={registrarPerfil}>
          <div className="mb-3">
            <label htmlFor="registro-nombre" className="mb-2 block font-semibold">Nombre completo</label>
            <input id="registro-nombre" name="nombre" autoComplete="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="registro-correo" className="mb-2 block font-semibold">Correo electrónico</label>
            <input id="registro-correo" name="correo" type="email" autoComplete="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="registro-telefono" className="mb-2 block font-semibold">Teléfono</label>
            <input id="registro-telefono" name="telefono" type="tel" autoComplete="tel" required />
          </div>
          <div className="mb-4">
            <label htmlFor="registro-contrasena" className="mb-2 block font-semibold">Contraseña (solo demostración)</label>
            <input id="registro-contrasena" name="contrasena" type="password" autoComplete="new-password" minLength="8" required />
            <small className="text-gray-500">No guardamos contraseñas: esta versión de demostración no cuenta con autenticación de servidor.</small>
          </div>
          {guardado && (
            <p className="mb-4 rounded-md border border-emerald-200 bg-emerald-100 px-4 py-2 text-emerald-900" role="status">
              Perfil guardado en este navegador. Tus datos se completarán en el checkout.
            </p>
          )}
          <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg border border-orange-600 bg-orange-600 py-2.5 font-bold leading-6 text-white transition hover:bg-orange-700 active:bg-orange-800">Guardar perfil</button>
        </form>

        <div className="mt-5 border-t border-orange-100 pt-4 text-center text-sm">
          <p className="mb-2">¿Ya tienes un perfil? <Link to="/login" className="font-semibold text-orange-700">Inicia sesión</Link></p>
          <Link to="/" className="font-semibold text-orange-700">Volver a la tienda</Link>
        </div>
      </section>
    </main>
  );
}
