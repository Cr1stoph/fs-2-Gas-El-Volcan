import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const CART_KEY = 'gas-volcan:carrito';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    if (savedCart === null) return [];
    const parsedCart = JSON.parse(savedCart);
    if (!Array.isArray(parsedCart)) {
      throw new Error('El carrito guardado no tiene un formato válido.');
    }
    return parsedCart;
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    const itemActual = cart.find((item) => item.id === producto.id);
    if (producto.stock <= (itemActual?.cantidad ?? 0)) return false;

    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === producto.id);

      if (itemExists) {
        return prevCart.map((item) =>
          item.id === producto.id && item.cantidad < producto.stock
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prevCart, { ...producto, cantidad: 1 }];
    });
    return true;
  };

  const updateQuantity = (id, cantidad) => {
    if (!Number.isInteger(cantidad)) return;
    setCart((prevCart) => prevCart
      .map((item) => item.id === id
        ? { ...item, cantidad: Math.min(cantidad, item.stock) }
        : item)
      .filter((item) => item.cantidad > 0));
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);
  const itemCount = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}
