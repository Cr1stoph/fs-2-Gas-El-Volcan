export function NosotrosPage() {
  return (
    <main className="flex-grow">
      <section className="bg-orange-500 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Nuestra Historia y Compromiso</h1>
          <p className="text-lg opacity-90">Llevamos la calidez del gas licuado a cada rincón de Chillán con rapidez, confianza y seguridad.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-600 pl-3">¿Quiénes Somos?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Gas El Volcán</strong> nació en la ciudad de Chillán como un emprendimiento familiar con la misión de transformar la distribución de gas licuado en la Región del Ñuble.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nos diferenciamos por nuestro servicio de despacho ágil y la modernización de los procesos de entrega, permitiendo a nuestros vecinos solicitar cilindros de 5kg, 11kg y 15kg directamente a su puerta con seguimiento transparente.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="Planta de distribución y logística de gas" className="w-full h-64 object-cover hover:scale-105 transition duration-300" />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 border-y border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Nuestra Misión</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Proveer energía limpia y accesible para hogares y comercios de Chillán, asegurando estándares rigurosos de seguridad y puntualidad en cada entrega.
            </p>
          </div>
          <div className="p-6 bg-orange-50 rounded-xl border border-orange-100">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Nuestra Visión</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ser la distribuidora líder de gas licuado en la región, reconocida por nuestra innovación tecnológica, atención al cliente de excelencia y compromiso con la comunidad.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Nuestras Instalaciones y Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=500&q=80" alt="Flota de repartidores" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm">Flota de Despacho</h4>
              <p className="text-xs text-gray-500 mt-1">Vehículos autorizados preparados para reparto rápido.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80" alt="Inspección de calidad" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm">Seguridad Garantizada</h4>
              <p className="text-xs text-gray-500 mt-1">Inspección periódica de todos nuestros cilindros.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=500&q=80" alt="Atención al cliente" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm">Atención Personalizada</h4>
              <p className="text-xs text-gray-500 mt-1">Equipo humano enfocado en resolver tus dudas.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}