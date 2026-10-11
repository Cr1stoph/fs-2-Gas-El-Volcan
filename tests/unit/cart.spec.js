import { act, createElement, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { CartContext } from '../../src/context/CartContext';
import { CartProvider } from '../../src/context/CartProvider';
import { ProductGrid } from '../../src/core/ProductGrid';

const producto = {
  id: 1,
  nombre: 'Cilindro de prueba',
  precio: 10000,
  precioOferta: null,
  stock: 2,
  categoria: 'Cilindros',
  img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
};

let container;
let root;

function CartProbe() {
  const carrito = useContext(CartContext);
  return createElement(
    'div',
    null,
    createElement('button', { id: 'agregar', onClick: () => carrito.addToCart(producto) }, 'Agregar'),
    createElement('button', { id: 'aumentar', onClick: () => carrito.updateQuantity(producto.id, 99) }, 'Aumentar'),
    createElement('button', { id: 'eliminar', onClick: () => carrito.removeFromCart(producto.id) }, 'Eliminar'),
    createElement('span', { id: 'cantidad' }, String(carrito.itemCount)),
  );
}

function montar(elemento) {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(elemento));
}

describe('Carrito y eventos de interfaz', () => {
  beforeEach(() => {
    localStorage.clear();
    window.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    if (root) act(() => root.unmount());
    container?.remove();
    root = null;
    container = null;
  });

  it('agrega productos y actualiza el contador del carrito', () => {
    montar(createElement(CartProvider, null, createElement(CartProbe)));
    act(() => container.querySelector('#agregar').click());

    expect(container.querySelector('#cantidad').textContent).toBe('1');
  });

  it('limita las cantidades al stock y elimina el producto', () => {
    montar(createElement(CartProvider, null, createElement(CartProbe)));
    act(() => container.querySelector('#agregar').click());
    act(() => container.querySelector('#aumentar').click());
    expect(container.querySelector('#cantidad').textContent).toBe('2');

    act(() => container.querySelector('#eliminar').click());
    expect(container.querySelector('#cantidad').textContent).toBe('0');
  });

  it('recupera el carrito persistido al volver a montar el proveedor', () => {
    montar(createElement(CartProvider, null, createElement(CartProbe)));
    act(() => container.querySelector('#agregar').click());
    act(() => root.unmount());
    container.remove();

    montar(createElement(CartProvider, null, createElement(CartProbe)));
    expect(container.querySelector('#cantidad').textContent).toBe('1');
  });

  it('responde al evento de agregar desde la tarjeta de producto', () => {
    const agregar = jasmine.createSpy('agregar');
    montar(createElement(ProductGrid, { productos: [producto], onAdd: agregar }));
    act(() => container.querySelector('button').click());

    expect(agregar).toHaveBeenCalledWith(producto);
    expect(agregar).toHaveBeenCalledTimes(1);
    expect(container.querySelector('[role="status"]').textContent).toContain('agregado al carrito');
  });
});
