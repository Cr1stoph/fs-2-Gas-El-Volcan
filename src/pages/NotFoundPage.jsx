import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="mx-auto flex flex-grow items-center justify-center px-4 py-20 text-center">
      <div>
        <h1 className="mb-2 text-4xl font-extrabold text-orange-700">404</h1>
        <p className="mb-5 text-gray-600">La página que buscas no existe.</p>
        <Link to="/" className="rounded-full bg-orange-600 px-5 py-2 font-bold text-white no-underline">
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
