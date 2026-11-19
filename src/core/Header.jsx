import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AUTH_CHANGED_EVENT, cerrarSesion, getSesion } from '../data/api';

const enlaces = [
  { to: '/categorias', texto: 'Productos' },
  { to: '/ofertas', texto: 'Ofertas' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/#contacto', texto: 'Contacto' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sesion, setSesion] = useState(getSesion);
  const { itemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const cerrarMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const actualizarSesion = () => setSesion(getSesion());
    window.addEventListener(AUTH_CHANGED_EVENT, actualizarSesion);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, actualizarSesion);
  }, []);

  const salir = () => {
    cerrarSesion();
    cerrarMenu();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-700/30 bg-orange-600 text-white shadow-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 py-3">
        <Link to="/" onClick={cerrarMenu} className="flex shrink-0 items-center gap-2 text-lg font-extrabold text-white no-underline md:text-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-orange-700" aria-hidden="true">🌋</span>
          <span>Gas El Volcán</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegación principal">
          {enlaces.map((enlace) => (
            <Link className="font-semibold text-white/95 no-underline transition hover:text-orange-100" to={enlace.to} key={enlace.to}>
              {enlace.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/carrito" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#212529] px-3 py-2 font-bold text-white transition hover:bg-[#1c1f23]">
            <span aria-hidden="true">🛒</span>
            <span>Carrito <span className="rounded-full bg-orange-400 px-2 py-0.5 text-sm" aria-label={`${itemCount} productos`}>{itemCount}</span></span>
          </Link>
          <button
            aria-controls="menu-tienda"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-[#212529] p-2 text-white transition hover:bg-[#1c1f23] lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {sesion ? (
            <div className="hidden items-center gap-2 lg:flex">
              <span className="max-w-36 truncate text-sm font-semibold" title={sesion.nombre || sesion.correo}>
                👤 {sesion.nombre || sesion.correo}
              </span>
              {sesion.rol === 'ROLE_ADMIN' && (
                <Link to="/admin" className="rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-white/25">
                  Administración
                </Link>
              )}
              {sesion.rol === 'ROLE_VENDEDOR' && (
                <Link to="/vendedor" className="rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-white/25">
                  Panel vendedor
                </Link>
              )}
              <button type="button" onClick={salir} className="rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/25">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-white/25 lg:inline-flex">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <nav id="menu-tienda" className="mx-auto max-w-[1600px] px-3 pb-3 lg:hidden" aria-label="Navegación móvil">
          <div className="rounded-2xl bg-orange-800 p-2 shadow-inner">
            {enlaces.map((enlace) => (
              <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to={enlace.to} key={enlace.to} onClick={cerrarMenu}>
                {enlace.texto}
              </Link>
            ))}
            {sesion ? (
              <>
                <div className="px-3 py-2.5 font-semibold text-orange-100">
                  👤 {sesion.nombre || sesion.correo}
                </div>
                {sesion.rol === 'ROLE_ADMIN' && (
                  <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to="/admin" onClick={cerrarMenu}>
                    Administración
                  </Link>
                )}
                {sesion.rol === 'ROLE_VENDEDOR' && (
                  <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to="/vendedor" onClick={cerrarMenu}>
                    Panel vendedor
                  </Link>
                )}
                <button type="button" onClick={salir} className="block w-full rounded-lg px-3 py-2.5 text-left font-semibold text-orange-100 hover:bg-orange-700">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link className="block rounded-lg px-3 py-2.5 font-semibold text-orange-100 no-underline hover:bg-orange-700" to="/login" onClick={cerrarMenu}>
                Iniciar sesión
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
