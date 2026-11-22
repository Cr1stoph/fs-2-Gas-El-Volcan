import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const enlacesTienda = [
  { to: '/categorias', texto: 'Productos' },
  { to: '/ofertas', texto: 'Ofertas' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/#contacto', texto: 'Contacto' },
];

// El vendedor NO ve enlaces de tienda, carrito ni administración.
const enlacesVendedor = [
  { to: '/vendedor/productos', texto: 'Productos' },
  { to: '/vendedor/pedidos', texto: 'Pedidos' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { sesion, esAdmin, esVendedor, esCliente, cerrarSesion } = useAuth();
  const { itemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const cerrarMenu = () => setIsMenuOpen(false);
  const inicio = esVendedor ? '/vendedor' : '/';
  const enlaces = esVendedor ? enlacesVendedor : enlacesTienda;

  const salir = () => {
    cerrarSesion();
    cerrarMenu();
    navigate(inicio);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-700/30 bg-orange-600 text-white shadow-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 py-3">
        <Link to={inicio} onClick={cerrarMenu} className="flex shrink-0 items-center gap-2 text-lg font-extrabold text-white no-underline md:text-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-orange-700" aria-hidden="true">🌋</span>
          <span>Gas El Volcán</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegación principal">
          {enlaces.map((enlace) => (
            <Link className="font-semibold text-white/95 no-underline transition hover:text-orange-100" to={enlace.to} key={enlace.to}>
              {enlace.texto}
            </Link>
          ))}
          {esCliente && (
            <Link to="/mis-pedidos" className="font-semibold text-white/95 no-underline transition hover:text-orange-100">
              Mis pedidos
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {!esVendedor && (
            <Link to="/carrito" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#212529] px-3 py-2 font-bold text-white transition hover:bg-[#1c1f23]">
              <span aria-hidden="true">🛒</span>
              <span>Carrito <span className="rounded-full bg-orange-400 px-2 py-0.5 text-sm" aria-label={`${itemCount} productos`}>{itemCount}</span></span>
            </Link>
          )}
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
              {esAdmin && (
                <Link to="/admin" className="rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-white/25">
                  Administración
                </Link>
              )}
              {esAdmin && (
                <Link to="/vendedor" className="rounded-lg bg-white/15 px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-white/25">
                  Panel vendedor
                </Link>
              )}
              {esVendedor && (
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
            {esCliente && (
              <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to="/mis-pedidos" onClick={cerrarMenu}>
                Mis pedidos
              </Link>
            )}
            {sesion ? (
              <>
                <div className="px-3 py-2.5 font-semibold text-orange-100">
                  👤 {sesion.nombre || sesion.correo}
                </div>
                {esAdmin && (
                  <>
                    <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to="/admin" onClick={cerrarMenu}>
                      Administración
                    </Link>
                    <Link className="block rounded-lg px-3 py-2.5 font-semibold text-white no-underline hover:bg-orange-700" to="/vendedor" onClick={cerrarMenu}>
                      Panel vendedor
                    </Link>
                  </>
                )}
                {esVendedor && (
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
