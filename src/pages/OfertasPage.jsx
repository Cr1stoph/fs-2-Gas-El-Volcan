import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { filtrarProductos } from '../data/commerce';
import { getProductos } from '../data/mockDb';
import { ProductGrid } from '../core/ProductGrid';

export function OfertasPage() {
  const { addToCart } = useContext(CartContext);
  const ofertas = filtrarProductos(getProductos(), { soloOfertas: true });

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Precios especiales</p>
        <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">Ofertas de la tienda</h1>
        <p className="mb-0 text-orange-50">Aprovecha los descuentos vigentes en cilindros y accesorios.</p>
      </section>
      <ProductGrid productos={ofertas} onAdd={addToCart} />
    </main>
  );
}
