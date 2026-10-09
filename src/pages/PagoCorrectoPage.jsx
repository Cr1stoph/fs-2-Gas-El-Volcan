import { Link } from 'react-router-dom';

export function PagoCorrectoPage() {
  return (
    <main className="flex-grow flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-8 border-orange-500">
        <span className="text-6xl block mb-4">👌</span>
        <h1 className="text-2xl font-black text-gray-900 mb-2">¡Compra exitosa!</h1>
        <p className="text-gray-600 mb-6">Tu pedido de gas ha sido confirmado. Código de orden: <strong>#20261009</strong></p>
        <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg block transition">
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}