// src/data/mockDb.js

// 1. Datos iniciales (Nuestra "Base de Datos")
let productos = [
  { id: 1, nombre: "Cilindro 5 kg", precio: 10000, img: "/assets/img/cilindro-5kg.png", stock: 50, categoria: "Gas Licuado" },
  { id: 2, nombre: "Cilindro 11 kg", precio: 15500, img: "/assets/img/cilindro-11kg.png", stock: 120, categoria: "Gas Licuado" },
  { id: 3, nombre: "Cilindro 15 kg", precio: 21000, img: "/assets/img/cilindro-15kg.png", stock: 80, categoria: "Gas Licuado" }
];

// 2. Operaciones CRUD

// LEER (Read) - Obtener todos los productos
export const getProductos = () => {
  return [...productos];
};

// LEER (Read) - Obtener un producto por ID
export const getProductoById = (id) => {
  return productos.find(p => p.id === id);
};

// CREAR (Create) - Añadir nuevo producto (Lo usaremos en el panel de Admin)
export const createProducto = (nuevoProducto) => {
  const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const productoConId = { ...nuevoProducto, id: newId };
  productos.push(productoConId);
  return productoConId;
};

// ACTUALIZAR (Update) - Editar producto existente
export const updateProducto = (id, datosActualizados) => {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
    return productos[index];
  }
  return null;
};

// ELIMINAR (Delete)
export const deleteProducto = (id) => {
  productos = productos.filter(p => p.id !== id);
};