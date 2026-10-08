import './NosotrosPage.css';

const team = [
  {
    number: '01',
    title: 'Despacho cercano',
    description: 'Llegamos a tu puerta con una atención ágil y amable.',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=85',
    alt: 'Vehículo de reparto en ruta',
  },
  {
    number: '02',
    title: 'Seguridad primero',
    description: 'Cuidamos cada detalle para que recibas tu pedido con confianza.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',
    alt: 'Equipo trabajando en una inspección',
  },
  {
    number: '03',
    title: 'Personas que responden',
    description: 'Estamos aquí para ayudarte antes y después de cada entrega.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=85',
    alt: 'Equipo conversando y colaborando',
  },
];

export function NosotrosPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__content">
          <span className="about-eyebrow">Gas El Volcán · Chillán</span>
          <h1>Energía confiable, <span>cerca de ti.</span></h1>
          <p>
            Somos una empresa familiar que lleva calor y tranquilidad a los
            hogares de Chillán y la Región de Ñuble.
          </p>
          <a className="about-hero__link" href="#nuestra-historia">
            Conoce nuestra historia <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="about-hero__visual">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85"
            alt="Instalaciones de distribución y logística"
          />
          <div className="about-hero__caption">
            <span className="about-hero__caption-mark" aria-hidden="true">✳</span>
            <span>De nuestra familia<br />a la tuya.</span>
          </div>
        </div>
        <span className="about-hero__decoration" aria-hidden="true">VOLCÁN</span>
      </section>

      <section className="about-story" id="nuestra-historia">
        <div className="about-section-heading">
          <span className="about-eyebrow">Quiénes somos</span>
          <h2>Un servicio local,<br /><span>hecho con compromiso.</span></h2>
        </div>
        <div className="about-story__copy">
          <p>
            <strong>Gas El Volcán</strong> nació en Chillán como un
            emprendimiento familiar, con una idea sencilla: hacer que pedir gas
            sea fácil, cercano y confiable.
          </p>
          <p>
            Hoy trabajamos para que nuestros vecinos reciban sus cilindros de
            5, 11 y 15 kilos directamente en casa, con un despacho ágil y una
            atención transparente en cada paso.
          </p>
        </div>
      </section>

      <section className="about-purpose" aria-label="Nuestro propósito">
        <article className="about-purpose__card about-purpose__card--mission">
          <span className="about-purpose__label">01 / Nuestra misión</span>
          <h3>Hacerte la vida<br />un poco más fácil.</h3>
          <p>
            Acercar energía segura y accesible a hogares y comercios, con un
            servicio puntual y humano.
          </p>
          <span className="about-purpose__symbol" aria-hidden="true">↗</span>
        </article>
        <article className="about-purpose__card about-purpose__card--vision">
          <span className="about-purpose__label">02 / Nuestra visión</span>
          <h3>Crecer junto<br />a nuestra comunidad.</h3>
          <p>
            Ser la distribuidora de confianza de Ñuble, reconocida por innovar
            sin perder la cercanía.
          </p>
          <span className="about-purpose__symbol" aria-hidden="true">✳</span>
        </article>
      </section>

      <section className="about-team">
        <div className="about-team__heading">
          <div>
            <span className="about-eyebrow">Lo que nos mueve</span>
            <h2>Un equipo en quien<br /><span>puedes confiar.</span></h2>
          </div>
          <p>
            Detrás de cada entrega hay personas comprometidas con hacer las
            cosas bien.
          </p>
        </div>
        <div className="about-team__grid">
          {team.map((item) => (
            <article className="about-team-card" key={item.number}>
              <div className="about-team-card__image">
                <img src={item.image} alt={item.alt} loading="lazy" />
                <span>{item.number}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
