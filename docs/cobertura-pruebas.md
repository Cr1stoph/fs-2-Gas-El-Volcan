# Pruebas unitarias y cobertura

## Ejecución

```bash
npm ci
npm run lint
npm test
```

La suite está escrita con Jasmine, se ejecuta con Karma en Chrome Headless y
compila los módulos ES/JSX mediante esbuild. Si Windows no encuentra Chrome, se
puede seleccionar Edge con la variable `CHROME_BIN`. El informe HTML se genera
en `coverage/` y no se versiona; vuelve a ejecutar `npm test` para actualizarlo.

## Casos implementados

La suite contiene 22 pruebas:

| Área | Casos cubiertos |
|---|---|
| Productos | Datos iniciales y categorías; alta, lectura, edición, identificadores inexistentes, eliminación y filtros por categoría/búsqueda/ofertas. |
| Comercio | Precio de oferta, cálculo de subtotal y despacho, datos válidos, correo/teléfono/dirección, retiro y simulación de rechazo. |
| Pedidos | Persistencia del resumen, consulta por identificador y avance de estado. |
| Perfiles | Recuperación del perfil vacío, normalización y persistencia de datos sin contraseña. |
| Interfaz React | Renderizado de tarjetas y estado vacío; clic de compra y mensaje accesible. |
| Carrito React | Agregar productos, actualizar contador, limitar cantidades al stock, eliminar y recuperar estado persistido. |

## Última medición

Ejecución local de Karma en Microsoft Edge Headless:

| Métrica | Cobertura |
|---|---:|
| Sentencias | 90,90 % (130/143) |
| Ramas | 77,87 % (88/113) |
| Funciones | 92,00 % (46/50) |
| Líneas | 94,16 % (113/120) |

Estas cifras corresponden a los módulos cargados por la suite
(`CartContext`, `CartProvider`, `ProductGrid` y los módulos de datos de comercio,
perfil y persistencia), no a todas las rutas de la aplicación. El reporte
detallado identifica líneas y ramas pendientes por archivo.

## Validaciones complementarias

- `npm run lint`: ESLint para aplicación y pruebas.
- `npm run build`: compilación de producción con Vite.
- Recorrido manual en navegador: agregar producto, revisar carrito, confirmar
  una compra aprobada y simular otra rechazada.
