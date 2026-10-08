# Gas El Volcán

Aplicación web para la distribuidora Gas El Volcán, construida con React y Vite.

## Desarrollo

```bash
npm install
npm run dev
```

Comprobaciones disponibles:

```bash
npm run lint
npm run build
```

## Publicación en GitHub Pages

Al hacer push a `main`, `.github/workflows/deploy-pages.yml` instala las
dependencias, ejecuta lint y build, y publica `dist` en GitHub Pages. En la
configuración del repositorio, Pages debe usar **GitHub Actions** como fuente
de publicación. Vite configura la ruta base del repositorio y `404.html`
permite abrir directamente las rutas internas de la aplicación.

## Estructura de `src`

- `main.jsx`: punto de entrada. Monta React, los proveedores globales y los estilos base.
- `App.jsx`: configura las rutas y el router de la aplicación.
- `layouts/`: estructuras compartidas por grupos de páginas. `PublicLayout` comparte encabezado y pie de página; `AdminLayout` comparte la navegación administrativa.
- `pages/`: contenido de cada ruta. Las páginas renderizadas dentro de un layout no vuelven a dibujar su navegación.
- `core/`: componentes compartidos de la interfaz, como el encabezado y el pie.
- `context/`: contextos de estado y sus proveedores; `CartContext` define el contexto y `CartProvider` administra el estado del carrito.
- `data/`: acceso a datos de ejemplo para productos.
- `hooks/`: lógica reutilizable de React.
- `assets/`: recursos importados desde el código.

Las rutas públicas se agregan como hijas de `PublicLayout` en `App.jsx`. Las rutas administrativas se agregan como hijas de `AdminLayout`, que es el único responsable de la barra lateral del panel.
