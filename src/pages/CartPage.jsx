import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';// Nota: mejor usar .jsx o sin extensión

export function CartPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  
  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart(); // Usamos la variable de contexto para vaciar el carrito
    navigate('/pago-correcto'); // Viajamos a la pantalla de éxito
  };

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-gray-800">Detalle del Pedido</h2>
            {cart.length > 0 && (
              <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-800 font-semibold transition">
                🗑️ Vaciar Carrito
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-5xl mb-3 block">🛒</span>
              <h3 className="text-lg font-bold text-gray-700 mb-1">Tu carrito está vacío</h3>
              <Link to="/" className="inline-block mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition">Ver Productos</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.img} alt={item.nombre} className="w-16 h-16 object-contain bg-gray-50 rounded p-1" />
                    <div>
                      <h4 className="font-bold text-gray-800">{item.nombre}</h4>
                      <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 h-fit">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Resumen</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-gray-800">${subtotal.toLocaleString('es-CL')}</span>
          </div>
          <div className="flex justify-between items-center border-t pt-3 text-lg font-extrabold">
            <span>Total:</span>
            <span className="text-2xl text-orange-600">${subtotal.toLocaleString('es-CL')}</span>
          </div>

          {/* AQUÍ ESTÁ LA MAGIA: onSubmit={handleCheckout} */}
          <form onSubmit={handleCheckout} className="pt-4 border-t space-y-4">
            <div>
              <label htmlFor="direccion" className="block text-xs font-semibold text-gray-700 mb-1">Dirección en Chillán *</label>
              <input type="text" id="direccion" name="direccion" required disabled={cart.length === 0} className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-xs font-semibold text-gray-700 mb-1">Teléfono *</label>
              <input type="tel" id="telefono" name="telefono" required disabled={cart.length === 0} className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-orange-500 focus:outline-none disabled:bg-gray-100" />
            </div>
            <button type="submit" disabled={cart.length === 0} className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded-lg transition shadow">
              Confirmar Pedido
            </button>
          </form>
        </aside>
      </div>
    </main>
  );
}