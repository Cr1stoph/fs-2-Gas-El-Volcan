import { useContext } from 'react';
import { getProductos } from '../data/mockDb';
import { CartContext } from '../context/CartContext.js';
export function HomePage() {
  const listaProductos = getProductos();
  const { addToCart } = useContext(CartContext);

  return (
    <main className="flex-grow container mx-auto px-4">
      
      {/* Hero section (Queda exactamente igual) */}
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
      
      {/* Sección Dinámica de Productos */}
      <section id="productos" className="py-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Nuestros Cilindros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 3. El .map() recorre el arreglo y dibuja una tarjeta por cada producto */}
          {listaProductos.map((producto) => (
            <article key={producto.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center flex flex-col justify-between hover:shadow-xl transition relative">
              
              {/* Etiqueta condicional: Solo se muestra si es el producto más vendido (id 2) */}
              {producto.id === 2 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase z-10">
                  Más vendido
                </span>
              )}

              <div>
                <div className="w-full h-52 bg-orange-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden border border-orange-100 p-2">
                  <img 
                    src={producto.img} 
                    alt={producto.nombre} 
                    className="w-full h-full object-contain hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{producto.nombre}</h3>
                <p className="text-gray-500 mb-4 text-sm">Categoría: {producto.categoria}. Stock: {producto.stock} unidades.</p>
                {/* toLocaleString formatea el número automáticamente a pesos chilenos (ej: 15.500) */}
                <p className="text-2xl font-black text-orange-600 mb-6">
                  ${producto.precio.toLocaleString('es-CL')}
                </p>
              </div>
              <button onClick={() => addToCart(producto)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg w-full transition shadow-sm">
                Añadir al carrito
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Sección de Contacto (Queda exactamente igual) */}
      <section id="contacto" className="py-16 border-t border-gray-200 mt-12">
        {/* ... (mantén todo tu formulario de contacto original aquí) ... */}
      </section>
    </main>
  );
}