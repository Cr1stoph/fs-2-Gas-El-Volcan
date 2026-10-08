import { useState, useContext } from 'react';
import {CartContext} from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {cart} = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ width: '100%', margin: '0', maxWidth: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <span style={{ background: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌋</span>
          <span>Gas El Volcán</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/carrito" id="btn-ir-carrito" style={{ background: '#c2410c', color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
            🛒 <span id="cart-counter">({totalItems})</span>
          </Link>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            style={{ background: '#c2410c', border: 'none', color: 'white', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="menu-tienda" style={{ backgroundColor: '#9a3412', marginTop: '12px', padding: '8px', borderRadius: '8px' }}>
          <Link onClick={() => setIsMenuOpen(false)} to="/#productos" style={{ display: 'block', color: 'white', textDecoration: 'none', padding: '10px 12px', fontWeight: 'bold', borderBottom: '1px solid #c2410c' }}>📦 Productos</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/nosotros" style={{ display: 'block', color: 'white', textDecoration: 'none', padding: '10px 12px', fontWeight: 'bold', borderBottom: '1px solid #c2410c' }}>👥 Nosotros</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/#contacto" style={{ display: 'block', color: 'white', textDecoration: 'none', padding: '10px 12px', fontWeight: 'bold', borderBottom: '1px solid #c2410c' }}>📞 Contacto</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/login" style={{ display: 'block', color: '#fef08a', textDecoration: 'none', padding: '10px 12px', fontWeight: 'bold' }}>🔑 Iniciar Sesión</Link>
        </div>
      )}
    </header>
  );
}