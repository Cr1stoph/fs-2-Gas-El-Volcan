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
copy .env.example .env
npm run dev
```

El frontend consume el backend mediante `VITE_API_URL`, cuyo valor local por
defecto es `http://localhost:8080/api/v1`. Para producción se debe cambiar por la
URL pública del backend en EC2.

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

El carrito y el perfil de compra se conservan en el navegador. El catálogo,
usuarios y pedidos se guardan en la base de datos del backend. El pago sigue
siendo una simulación académica: no se realizan cobros reales.

## Publicación en GitHub Pages

Al hacer push a `main`, `.github/workflows/deploy-pages.yml` instala las
dependencias, ejecuta lint y build, y publica `dist` en GitHub Pages. En la
configuración del repositorio, Pages debe usar **GitHub Actions** como fuente
de publicación. Vite configura la ruta base del repositorio y `404.html`
permite abrir directamente las rutas internas de la aplicación.
Para producción, configura el secreto `VITE_API_URL` del repositorio con la
URL pública del backend, por ejemplo `http://IP_PUBLICA_EC2:8080/api/v1` o,
preferentemente, una URL HTTPS detrás de un reverse proxy. El frontend
normaliza el valor para que siempre termine en `/api/v1`.

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

El carrito y el perfil de compra usan almacenamiento local del navegador. El
token JWT y la sesión se conservan en `localStorage` y se validan contra
`GET /api/v1/auth/me` al recargar la página; cuando expira, la sesión se cierra
automáticamente. Productos, pedidos y usuarios se guardan en la base de datos
del backend. Las rutas públicas se agregan como hijas de `PublicLayout` en
`App.jsx`; `/admin` y `/vendedor` tienen layouts y guards propios por rol.

## Documentación de evaluación

- [Especificación de requisitos (ERS)](./docs/ERS.md)
- [Cobertura y casos de prueba](./docs/cobertura-pruebas.md)
