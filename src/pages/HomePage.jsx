import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { getProductos } from '../data/mockDb';
import { ProductGrid } from '../core/ProductGrid';

export function HomePage() {
  const { addToCart } = useContext(CartContext);
  const productos = getProductos().slice(0, 3);
  const [contactoEnviado, setContactoEnviado] = useState(false);

  const enviarContacto = (event) => {
    event.preventDefault();
    setContactoEnviado(true);
    event.currentTarget.reset();
  };

  return (
    <main className="container-fluid page-content flex-grow px-3 px-lg-5">
      <section className="home-hero my-4 my-lg-5 flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl bg-gray-900 text-center text-white shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1800&q=85"
          alt="Paisaje volcánico al atardecer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="home-hero__overlay absolute inset-0" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center p-6 md:p-12">
          <span className="mb-4 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
            Energía y calor directo
          </span>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Gas licuado a domicilio en Chillán
          </h1>
          <p className="max-w-xl text-base text-gray-200 md:text-lg">
            La fuerza volcánica en tu hogar. Pide tu cilindro de manera rápida y fácil.
          </p>
          <Link to="/categorias" className="btn btn-light mt-4 rounded-pill px-4 py-2 font-bold text-orange-700">
            Explorar productos
          </Link>
        </div>
      </section>

      <section id="productos" className="py-7">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-600">Calor para tu hogar</p>
            <h2 className="mb-0 text-3xl font-extrabold text-gray-900">Nuestros cilindros</h2>
          </div>
          <Link to="/categorias" className="font-bold text-orange-700 hover:text-orange-900">
            Ver todo el catálogo →
          </Link>
        </div>
        <ProductGrid productos={productos} onAdd={addToCart} />
      </section>

      <section className="my-8 rounded-3xl bg-orange-100 p-6 md:p-9">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-8">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-700">Ahorra en tu próxima compra</p>
            <h2 className="mb-2 text-2xl font-extrabold text-gray-900">Ofertas para seguir encendiendo tu hogar</h2>
            <p className="mb-0 text-gray-700">Revisa los productos con precio especial disponibles esta semana.</p>
          </div>
          <div className="col-12 col-md-4 text-md-end">
            <Link to="/ofertas" className="btn btn-primary rounded-pill px-4 py-2 font-bold">Ver ofertas</Link>
          </div>
        </div>
      </section>

      <section id="contacto" className="my-10 border-t border-orange-100 py-12">
        <div className="row justify-content-center g-4">
          <div className="col-12 col-lg-5">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-600">Estamos para ayudarte</p>
            <h2 className="mb-3 text-3xl font-extrabold text-gray-900">Hablemos</h2>
            <p className="text-gray-600">Escríbenos y nuestro equipo se pondrá en contacto contigo para resolver tus dudas sobre productos o despachos.</p>
            <p className="mb-1 font-semibold text-gray-700">📍 Chillán y alrededores</p>
            <p className="font-semibold text-gray-700">🕒 Atención de lunes a sábado</p>
          </div>
          <div className="col-12 col-lg-6">
            <form onSubmit={enviarContacto} className="rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <div className="mb-3">
                <label htmlFor="contacto-nombre" className="form-label font-semibold">Nombre</label>
                <input id="contacto-nombre" className="form-control" name="nombre" autoComplete="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="contacto-correo" className="form-label font-semibold">Correo electrónico</label>
                <input id="contacto-correo" className="form-control" name="correo" type="email" autoComplete="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="contacto-mensaje" className="form-label font-semibold">Mensaje</label>
                <textarea id="contacto-mensaje" className="form-control" name="mensaje" rows="4" required />
              </div>
              {contactoEnviado && (
                <p className="alert alert-success py-2" role="status">
                    Formulario validado en esta demostración; el mensaje no se envió a un servidor.
                </p>
              )}
              <button type="submit" className="btn btn-primary w-100 rounded-lg py-2 font-bold">Enviar mensaje</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
