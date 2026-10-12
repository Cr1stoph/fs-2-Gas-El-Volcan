import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { getCategorias, getProductos } from '../data/mockDb';
import { filtrarProductos } from '../data/commerce';
import { ProductGrid } from '../core/ProductGrid';

export function CategoriasPage() {
  const { addToCart } = useContext(CartContext);
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const categorias = getCategorias();
  const productos = filtrarProductos(getProductos(), { categoria, busqueda });

  return (
    <main className="mx-auto page-content flex-grow px-3 py-5">
      <section className="page-banner mb-5 rounded-3xl p-5 md:p-8 text-white shadow-lg">
        <p className="mb-2 text-sm font-bold uppercase tracking-wider text-orange-200">Tienda Gas El Volcán</p>
        <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">Catálogo de productos</h1>
        <p className="mb-0 text-orange-50">Encuentra cilindros y accesorios para tu hogar.</p>
      </section>

      <section aria-label="Filtros del catálogo" className="mb-6 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 items-end gap-4 min-[768px]:grid-cols-[3fr_2fr_1fr]">
          <div>
            <label className="mb-2 block font-semibold" htmlFor="buscar-producto">Buscar productos</label>
            <input
              id="buscar-producto"
              type="search"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Ej.: cilindro, regulador..."
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold" htmlFor="categoria-producto">Categoría</label>
            <select
              id="categoria-producto"
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((nombre) => <option value={nombre} key={nombre}>{nombre}</option>)}
            </select>
          </div>
          <p className="text-sm font-semibold text-gray-600 min-[768px]:text-right">
            {productos.length} productos
          </p>
        </div>
      </section>
      <ProductGrid productos={productos} onAdd={addToCart} />
    </main>
  );
}
