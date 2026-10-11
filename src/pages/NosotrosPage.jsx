const valores = [
  {
    numero: '01',
    titulo: 'Nuestra misión',
    descripcion: 'Acercar energía segura y accesible a hogares y comercios, con un servicio puntual y humano.',
  },
  {
    numero: '02',
    titulo: 'Nuestra visión',
    descripcion: 'Ser la distribuidora de confianza de Ñuble, reconocida por innovar sin perder la cercanía.',
  },
];

const compromisos = [
  {
    titulo: 'Despacho cercano',
    descripcion: 'Llegamos a tu puerta con una atención ágil y amable.',
    imagen: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85',
    alt: 'Vehículo de reparto en ruta',
  },
  {
    titulo: 'Seguridad primero',
    descripcion: 'Cuidamos cada detalle para que recibas tu pedido con confianza.',
    imagen: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',
    alt: 'Equipo trabajando en una inspección',
  },
  {
    titulo: 'Personas que responden',
    descripcion: 'Estamos aquí para ayudarte antes y después de cada entrega.',
    imagen: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85',
    alt: 'Equipo conversando y colaborando',
  },
];

export function NosotrosPage() {
  return (
    <main className="container-fluid page-content flex-grow px-3 px-lg-5 py-4 py-lg-5">
      <section className="page-banner mb-5 overflow-hidden rounded-3xl text-white shadow-lg">
        <div className="row align-items-center g-0">
          <div className="col-12 col-lg-7 p-4 p-md-5 p-xl-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">
              Gas El Volcán · Chillán
            </p>
            <h1 className="mb-3 text-3xl font-extrabold md:text-5xl">
              Energía confiable, cerca de ti
            </h1>
            <p className="mb-4 max-w-2xl text-base text-orange-50 md:text-lg">
              Somos una empresa familiar que lleva calor y tranquilidad a los
              hogares de Chillán y la Región de Ñuble.
            </p>
            <a href="#nuestra-historia" className="btn btn-light rounded-pill px-4 py-2 font-bold text-orange-700">
              Conoce nuestra historia
            </a>
          </div>
          <div className="col-12 col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
              alt="Centro de distribución y logística"
              className="h-64 w-100 object-cover md:h-80 lg:h-[390px]"
            />
          </div>
        </div>
      </section>

      <section id="nuestra-historia" className="mb-5 rounded-3xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-5">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-600">Quiénes somos</p>
            <h2 className="mb-0 text-2xl font-extrabold text-gray-900 md:text-3xl">
              Un servicio local, hecho con compromiso
            </h2>
          </div>
          <div className="col-12 col-lg-7">
            <p className="mb-3 text-gray-600">
              <strong className="text-gray-900">Gas El Volcán</strong> nació en
              Chillán como un emprendimiento familiar, con una idea sencilla:
              hacer que pedir gas sea fácil, cercano y confiable.
            </p>
            <p className="mb-0 text-gray-600">
              Hoy trabajamos para que nuestros vecinos reciban cilindros de 5,
              11 y 15 kilos directamente en casa, con un despacho ágil y una
              atención transparente en cada paso.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Nuestra misión y visión" className="row g-4 mb-5">
        {valores.map((valor) => (
          <article className="col-12 col-md-6" key={valor.numero}>
            <div className="h-full rounded-2xl border border-orange-100 bg-white p-4 p-md-5 shadow-sm">
              <span className="mb-3 inline-flex rounded-pill bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-800">
                {valor.numero} · Gas El Volcán
              </span>
              <h2 className="mb-2 text-xl font-extrabold text-gray-900">{valor.titulo}</h2>
              <p className="mb-0 text-gray-600">{valor.descripcion}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mb-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-600">Lo que nos mueve</p>
            <h2 className="mb-0 text-2xl font-extrabold text-gray-900 md:text-3xl">Un equipo en quien puedes confiar</h2>
          </div>
          <p className="mb-0 max-w-md text-gray-600">
            Detrás de cada entrega hay personas comprometidas con hacer las cosas bien.
          </p>
        </div>
        <div className="row g-4">
          {compromisos.map((compromiso) => (
            <article className="col-12 col-md-6 col-xl-4" key={compromiso.titulo}>
              <div className="h-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <img
                  src={compromiso.imagen}
                  alt={compromiso.alt}
                  loading="lazy"
                  className="h-56 w-100 object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{compromiso.titulo}</h3>
                  <p className="mb-0 text-sm text-gray-600">{compromiso.descripcion}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
