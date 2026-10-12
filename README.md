# Gas El Volcán

Aplicación web de demostración para la distribuidora Gas El Volcán. Permite
explorar productos, gestionar un carrito y simular un pedido de gas en Chillán.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm
- Chrome o Chromium para ejecutar Karma (también se puede usar Edge mediante
  `CHROME_BIN`)

## Instalación y desarrollo

```bash
npm ci
npm run dev
```

## Comprobaciones

```bash
npm run lint
npm test
npm run build
```

Karma genera el informe HTML de cobertura en `coverage/` y lo excluye Git. En
macOS, si no tienes Chrome instalado, puedes descargar Chrome for Testing y
apuntarle a Karma con `CHROME_BIN`:

```bash
npx --yes @puppeteer/browsers install chrome@stable --path "$HOME/Library/Caches/puppeteer"
CHROME_BIN="$(find "$HOME/Library/Caches/puppeteer/chrome" -type f -path '*/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' -print -quit)" npm test
```

En Windows, si no tienes Chrome instalado, puedes indicar la ruta de Edge:

```powershell
$env:CHROME_BIN = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm test
```

La suite utiliza Jasmine, Karma y el navegador headless. El detalle de los casos
y la última medición se encuentra en [docs/cobertura-pruebas.md](./docs/cobertura-pruebas.md).

## Funcionalidades

- Catálogo de cilindros y accesorios con filtros por categoría y búsqueda.
- Precios de oferta, carrito con cantidades limitadas por stock y persistencia
  local en el navegador.
- Checkout con datos del cliente, dirección o retiro en tienda, costo de
  despacho y resumen del pedido.
- Resultado de pago exitoso o rechazado. El número de tarjeta
  `0000000000000000` simula un rechazo; cualquier tarjeta de prueba de 16
  dígitos se aprueba. No se procesa dinero real.
- Panel para agregar, modificar y eliminar productos, revisar pedidos y
  actualizar su estado.
- Perfiles de compra guardados en el navegador. Las contraseñas no se guardan.

Esta versión es un prototipo académico: usa `localStorage` como persistencia
local, no tiene servidor, autenticación real, cobros ni envío de formularios.
El panel administrativo no debe considerarse protegido para producción.

## Publicación en GitHub Pages

Al hacer push a `main`, `.github/workflows/deploy-pages.yml` instala las
dependencias, ejecuta lint y build, y publica `dist` en GitHub Pages. En la
configuración del repositorio, Pages debe usar **GitHub Actions** como fuente
de publicación. Vite configura la ruta base del repositorio y `404.html`
permite abrir directamente las rutas internas de la aplicación.

## Estructura de `src`

- `main.jsx`: monta React, el proveedor del carrito y los estilos.
- `App.jsx`: configura las rutas y layouts.
- `layouts/`: navegación y marco común de páginas públicas y administrativas.
- `pages/`: inicio, catálogo, ofertas, carrito, checkout, resultados de pago,
  formularios informativos y panel.
- `core/`: encabezado, pie de página y tarjetas reutilizables del catálogo.
- `context/`: estado del carrito compartido por la aplicación.
- `data/`: persistencia del catálogo, pedidos, perfiles y reglas de comercio.
- `hooks/`: lógica de interacción reutilizable.
- `assets/`: recursos visuales importados desde React.

Los productos, pedidos, perfiles y carrito usan almacenamiento local del
navegador. Las rutas públicas se agregan como hijas de `PublicLayout` en
`App.jsx`; la ruta `/admin` usa el marco compartido de la tienda.

## Documentación de evaluación

- [Especificación de requisitos (ERS)](./docs/ERS.md)
- [Cobertura y casos de prueba](./docs/cobertura-pruebas.md)
