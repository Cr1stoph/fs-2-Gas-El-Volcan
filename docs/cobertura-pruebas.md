# Pruebas unitarias y cobertura

## Ejecución

```bash
npm ci
npm run lint
npm test
```

La suite está escrita con Jasmine, se ejecuta con Karma en Chrome Headless y
compila los módulos ES/JSX mediante esbuild. Karma requiere Chrome o un navegador
compatible instalado. En macOS, si Chrome no está instalado, se puede descargar
Chrome for Testing con `npx --yes @puppeteer/browsers install chrome@stable
--path "$HOME/Library/Caches/puppeteer"` y usar su ejecutable en `CHROME_BIN`.
En Windows se puede seleccionar Edge con esa variable. El informe HTML se
genera en `coverage/` y no se versiona; vuelve a ejecutar `npm test` para
actualizarlo.

## Casos implementados

La suite contiene 25 pruebas:

| Área | Casos cubiertos |
|---|---|
| Productos | Datos iniciales y categorías; alta, lectura, edición, identificadores inexistentes, eliminación y filtros por categoría/búsqueda/ofertas. |
| Comercio | Precio de oferta, cálculo de subtotal y despacho, datos válidos, correo/teléfono/dirección, retiro y simulación de rechazo. |
| Pedidos | Persistencia del resumen, consulta por identificador y avance de estado. |
| Perfiles | Recuperación del perfil vacío, normalización y persistencia de datos sin contraseña. |
| Inicio de sesión demo | Clasificación del correo administrador y clientes y recuperación de la sesión temporal. |
| Interfaz React | Renderizado de tarjetas y estado vacío; clic de compra y mensaje accesible. |
| Carrito React | Agregar productos, actualizar contador, limitar cantidades al stock, eliminar y recuperar estado persistido. |

## Última medición

Ejecución local de Karma en Chrome Headless:

| Métrica | Cobertura |
|---|---:|
| Sentencias | 90,56 % (144/159) |
| Ramas | 79,06 % (102/129) |
| Funciones | 92,30 % (48/52) |
| Líneas | 93,33 % (126/135) |

Estas cifras corresponden a los módulos cargados por la suite
(`CartContext`, `CartProvider`, `ProductGrid` y los módulos de datos de comercio,
perfil, autenticación demo y persistencia), no a todas las rutas de la
aplicación. El reporte detallado identifica líneas y ramas pendientes por
archivo.

## Validaciones complementarias

- `npm run lint`: ESLint para aplicación y pruebas.
- `npm run build`: compilación de producción con Vite.
- Recorrido manual en navegador: agregar producto, revisar carrito, confirmar
  una compra aprobada y simular otra rechazada.
