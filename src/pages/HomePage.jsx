import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <main className="flex-grow container mx-auto px-4">
      {/* Hero section */}
      <section className="my-8 rounded-3xl overflow-hidden relative shadow-2xl bg-gray-900 text-white min-h-[380px] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1350&q=80" 
          alt="Fondo de volcán" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-20 p-6 md:p-12 max-w-3xl mx-auto flex flex-col items-center justify-center">
          <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-md">
            Energía y Calor Directo
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Gas licuado a domicilio en Chillán
          </h1>
          <p className="text-base md:text-lg text-gray-200 max-w-xl">
            La fuerza volcánica en tu hogar. Pide tu cilindro de manera rápida, fácil y sigue tu entrega en tiempo real.
          </p>
        </div>
      </section>
      
      {/* Sección de Productos */}
      <section id="productos" className="py-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Nuestros Cilindros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Producto 1: 5kg */}
          <article className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center flex flex-col justify-between hover:shadow-xl transition">
            <div>
              <div className="w-full h-52 bg-orange-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-orange-100 p-2">
                <img src="./assets/img/cilindro-5kg.png" alt="Cilindro de 5kg" className="w-full h-full object-contain hover:scale-105 transition duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cilindro 5 kg</h3>
              <p className="text-gray-500 mb-4 text-sm">Práctico y liviano, ideal para estufas pequeñas o quinchos.</p>
              <p className="text-2xl font-black text-orange-600 mb-6">$10.000</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg w-full transition shadow-sm">
              Añadir al carrito
            </button>
          </article>
          
          {/* Producto 2: 11kg */}
          <article className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center flex flex-col justify-between hover:shadow-xl transition relative">
            <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase z-10">Más vendido</span>
            <div>
              <div className="w-full h-52 bg-orange-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-orange-100 p-2">
                <img src="./assets/img/cilindro-11kg.png" alt="Cilindro de 11kg" className="w-full h-full object-contain hover:scale-105 transition duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cilindro 11 kg</h3>
              <p className="text-gray-500 mb-4 text-sm">Ideal para estufas y cocinas por su duración y tamaño.</p>
              <p className="text-2xl font-black text-orange-600 mb-6">$15.500</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg w-full transition shadow-sm">
              Añadir al carrito
            </button>
          </article>
          
          {/* Producto 3: 15kg */}
          <article className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center flex flex-col justify-between hover:shadow-xl transition">
            <div>
              <div className="w-full h-52 bg-orange-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-orange-100 p-2">
                <img src="./assets/img/cilindro-15kg.png" alt="Cilindro de 15kg" className="w-full h-full object-contain hover:scale-105 transition duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Cilindro 15 kg</h3>
              <p className="text-gray-500 mb-4 text-sm">Máxima capacidad para calefonts y alto consumo familiar.</p>
              <p className="text-2xl font-black text-orange-600 mb-6">$21.000</p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg w-full transition shadow-sm">
              Añadir al carrito
            </button>
          </article>
          
        </div>
      </section>

      {/* Sección de Contacto */}
      <section id="contacto" className="py-16 border-t border-gray-200 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Formulario de Contacto</h2>
            <p className="text-gray-600">¿Tienes dudas o necesitas ayuda? Déjanos tu mensaje y la administradora se pondrá en contacto contigo.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <form className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                <input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
                  <input type="email" id="email" name="email" placeholder="ejemplo@correo.cl" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">Teléfono de contacto</label>
                  <input type="tel" id="telefono" name="telefono" placeholder="+56 9 1234 5678" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-2">Motivo de contacto</label>
                <select id="asunto" name="asunto" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white">
                  <option value="" disabled defaultValue>Selecciona una opción</option>
                  <option value="consulta">Consulta general</option>
                  <option value="pedido">Estado de mi pedido</option>
                  <option value="reclamo">Reclamo o sugerencia</option>
                  <option value="otro">Otro motivo</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribe aquí tu consulta detallada..." required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"></textarea>
              </div>
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg text-lg">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}