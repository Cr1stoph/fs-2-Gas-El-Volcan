import { createContext, useState } from 'react';

// Creamos el contexto
export const CartContext = createContext();

// Creamos el proveedor que envolverá tu app
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Función para añadir productos
  const addToCart = (producto) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya está en el carrito
      const itemExists = prevCart.find((item) => item.id === producto.id);
      
      if (itemExists) {
        // Si ya existe, le sumamos 1 a la cantidad
        return prevCart.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si no existe, lo agregamos con cantidad 1
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => setCart([]);

  // Pasamos el estado y las funciones a los componentes hijos
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}