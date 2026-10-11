import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ProductGrid } from '../../src/core/ProductGrid';
import {
  calcularTotal,
  filtrarProductos,
  getPrecioProducto,
  pagoAprobado,
  validarCheckout,
} from '../../src/data/commerce';
import {
  createPedido,
  createProducto,
  deleteProducto,
  getCategorias,
  getPedidoById,
  getPedidos,
  getProductoById,
  getProductos,
  updateEstadoPedido,
  updateProducto,
} from '../../src/data/mockDb';
import { guardarPerfilCliente, getPerfilCliente } from '../../src/data/profile';

const checkoutValido = {
  nombre: 'Ana Pérez',
  correo: 'ana@example.cl',
  telefono: '+56912345678',
  direccion: 'Av. Libertad 123',
  tipoEntrega: 'despacho',
  formaPago: 'contraentrega',
};

describe('Catálogo persistente', () => {
  beforeEach(() => localStorage.clear());

  it('carga el catálogo inicial con cilindros y accesorios', () => {
    expect(getProductos().length).toBe(6);
    expect(getCategorias()).toEqual(['Accesorios', 'Cilindros']);
  });

  it('crea productos con un identificador y los conserva', () => {
    const producto = createProducto({
      nombre: 'Cilindro 8 kg',
      precio: 12000,
      precioOferta: null,
      stock: 10,
      categoria: 'Cilindros',
      img: '/assets/cilindro.svg',
    });

    expect(producto.id).toBe(7);
    expect(getProductoById(producto.id).nombre).toBe('Cilindro 8 kg');
  });

  it('actualiza precio y stock de un producto existente', () => {
    const actualizado = updateProducto(1, { precio: 11500, stock: 7 });

    expect(actualizado.precio).toBe(11500);
    expect(getProductoById(1).stock).toBe(7);
  });

  it('no actualiza identificadores que no existen', () => {
    expect(updateProducto(999, { stock: 1 })).toBeNull();
  });

  it('elimina productos del catálogo persistente', () => {
    expect(deleteProducto(1)).toBeTrue();
    expect(getProductoById(1)).toBeNull();
    expect(deleteProducto(999)).toBeFalse();
  });

  it('filtra por categoría, texto y ofertas', () => {
    const productos = getProductos();

    expect(filtrarProductos(productos, { categoria: 'Accesorios' }).length).toBe(2);
    expect(filtrarProductos(productos, { busqueda: 'cilindro 15' })[0].id).toBe(3);
    expect(filtrarProductos(productos, { soloOfertas: true }).map((item) => item.id)).toEqual([2, 5]);
  });
});

describe('Precios y checkout', () => {
  it('usa el precio rebajado cuando hay una oferta válida', () => {
    expect(getPrecioProducto({ precio: 10000, precioOferta: 8500 })).toBe(8500);
    expect(getPrecioProducto({ precio: 10000, precioOferta: 12000 })).toBe(10000);
  });

  it('calcula subtotales, cantidades y costo de despacho', () => {
    const carrito = [
      { precio: 10000, precioOferta: 8500, cantidad: 2 },
      { precio: 5000, precioOferta: null, cantidad: 1 },
    ];

    expect(calcularTotal(carrito)).toBe(22000);
    expect(calcularTotal(carrito, 2500)).toBe(24500);
  });

  it('acepta los datos de checkout completos', () => {
    expect(validarCheckout(checkoutValido)).toEqual({});
  });

  it('informa correo, teléfono y dirección inválidos', () => {
    const errores = validarCheckout({
      ...checkoutValido,
      correo: 'correo-no-valido',
      telefono: '123',
      direccion: '',
    });

    expect(errores.correo).toBeDefined();
    expect(errores.telefono).toBeDefined();
    expect(errores.direccion).toBeDefined();
  });

  it('solo exige dirección cuando se solicita despacho', () => {
    expect(validarCheckout({ ...checkoutValido, tipoEntrega: 'retiro', direccion: '' })).toEqual({});
  });

  it('valida la tarjeta de prueba y permite simular un rechazo', () => {
    expect(validarCheckout({ ...checkoutValido, formaPago: 'tarjeta', numeroTarjeta: '123' }).numeroTarjeta).toBeDefined();
    expect(pagoAprobado({ formaPago: 'tarjeta', numeroTarjeta: '0000000000000000' })).toBeFalse();
    expect(pagoAprobado({ formaPago: 'tarjeta', numeroTarjeta: '1234567812345678' })).toBeTrue();
  });
});

describe('Pedidos persistentes', () => {
  beforeEach(() => localStorage.clear());

  it('crea y recupera un pedido con su resumen de compra', () => {
    const pedido = createPedido({
      cliente: { nombre: 'Ana Pérez', correo: 'ana@example.cl', direccion: 'Av. Libertad 123' },
      items: [{ id: 1, nombre: 'Cilindro 5 kg', precio: 10000, cantidad: 1 }],
      total: 12500,
      estado: 'Pendiente',
      estadoPago: 'Aprobado',
    });

    expect(getPedidoById(pedido.id).total).toBe(12500);
    expect(getPedidos().length).toBe(1);
  });

  it('actualiza el estado de despacho del pedido', () => {
    const pedido = createPedido({ estado: 'Pendiente', estadoPago: 'Aprobado' });

    expect(updateEstadoPedido(pedido.id, 'En camino').estado).toBe('En camino');
    expect(getPedidoById(pedido.id).estado).toBe('En camino');
    expect(updateEstadoPedido('inexistente', 'Entregado')).toBeNull();
  });
});

describe('Perfil de compra', () => {
  beforeEach(() => localStorage.clear());

  it('guarda los datos de contacto sin persistir contraseñas', () => {
    guardarPerfilCliente({
      nombre: ' Ana Pérez ',
      correo: ' ana@example.cl ',
      telefono: '912345678',
      contrasena: 'no-se-guarda',
    });

    expect(getPerfilCliente()).toEqual({
      nombre: 'Ana Pérez',
      correo: 'ana@example.cl',
      telefono: '912345678',
    });
    expect(localStorage.getItem('gas-volcan:perfil')).not.toContain('contrasena');
  });

  it('entrega un perfil vacío cuando no hay datos guardados', () => {
    expect(getPerfilCliente()).toEqual({ nombre: '', correo: '', telefono: '' });
  });
});

describe('Componentes de tienda', () => {
  it('renderiza productos, precios de oferta y acción de compra', () => {
    const html = renderToStaticMarkup(React.createElement(ProductGrid, {
      productos: [{
        id: 2,
        nombre: 'Cilindro 11 kg',
        precio: 15500,
        precioOferta: 13990,
        stock: 5,
        categoria: 'Cilindros',
        img: '/assets/cilindro.svg',
      }],
      onAdd: () => {},
    }));

    expect(html).toContain('Cilindro 11 kg');
    expect(html).toContain('$13.990');
    expect(html).toContain('Añadir al carrito');
  });

  it('muestra un mensaje cuando los filtros no encuentran productos', () => {
    const html = renderToStaticMarkup(React.createElement(ProductGrid, { productos: [], onAdd: () => {} }));

    expect(html).toContain('No encontramos productos con esos filtros.');
  });
});
