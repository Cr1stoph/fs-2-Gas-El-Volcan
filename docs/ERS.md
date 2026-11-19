# Especificación de Requisitos de Software (ERS)
## Gas El Volcán — Sistema de Venta de Gas Licuado
### Evaluación Parcial 3 · DSY1104 · DUOC UC

---

## 1. Propósito

Definir el alcance y los requisitos del sistema web **Gas El Volcán**, una
aplicación de comercio electrónico para la venta de gas licuado y accesorios.
El sistema cuenta con un **frontend React/Vite**, un **backend Spring Boot**
con API REST real, una **base de datos MySQL** y despliegue en **AWS EC2**
con automatización mediante **GitHub Actions**.

---

## 2. Alcance y límites

El sistema implementa un flujo completo de comercio electrónico con:

- Autenticación de usuarios mediante **JWT** (JSON Web Token).
- Control de acceso por **roles** (Administrador, Vendedor, Cliente).
- Gestión persistente de productos en **MySQL** vía JPA/Hibernate.
- Gestión de pedidos con estados de despacho.
- Despliegue en dos instancias **AWS EC2** separadas (frontend / backend).
- **CI/CD** automatizado con GitHub Actions.

**Fuera del alcance:**
- Pasarela de pago real (el checkout es simulado).
- Envío de correos transaccionales.
- Integración logística real con proveedores.

---

## 3. Usuarios y actores

| Actor | Descripción |
|-------|-------------|
| **Cliente** | Usuario registrado. Consulta el catálogo, gestiona su carrito y realiza pedidos. |
| **Vendedor** | Usuario interno. Visualiza el catálogo y gestiona el estado de los pedidos (despacho). No puede crear ni eliminar productos. |
| **Administrador** | Usuario con acceso total. Gestiona productos (CRUD), revisa y avanza todos los pedidos. |
| **Sistema** | Spring Boot + MySQL. Persiste datos, valida tokens, aplica reglas de negocio. |
| **GitHub Actions** | Pipeline CI/CD que compila, prueba y despliega automáticamente al hacer push a `main`. |

---

## 4. Requisitos funcionales

### RF-01 · Registro de usuario

El sistema permite crear una cuenta con nombre de usuario, correo electrónico
y contraseña. La contraseña se almacena con **BCrypt** (nunca en texto plano).
Al registrarse, se devuelve un JWT de acceso.

**Criterio de aceptación:** `POST /api/v1/auth/register` devuelve `200 OK`
con token y datos del usuario. El correo debe ser único.

---

### RF-02 · Autenticación JWT

El usuario inicia sesión con correo y contraseña. El backend valida las
credenciales y emite un **access token** firmado con clave secreta. El token
incluye el rol del usuario como claim.

**Criterio de aceptación:** `POST /api/v1/auth/login` devuelve token válido.
Requests posteriores con `Authorization: Bearer <token>` son autorizados según
el rol.

---

### RF-03 · Renovación de token

El sistema permite renovar el access token sin necesidad de volver a ingresar
las credenciales.

**Criterio de aceptación:** `POST /api/v1/auth/refresh` devuelve un nuevo
token con una firma distinta al anterior.

---

### RF-04 · Catálogo de productos (lectura pública)

Cualquier visitante puede consultar el listado completo de productos con
nombre, precio, precio de oferta (si existe), stock y categoría.

**Criterio de aceptación:** `GET /api/v1/productos` devuelve `200 OK` sin
requerir autenticación.

---

### RF-05 · Gestión de productos (solo Administrador)

El Administrador puede crear, editar y eliminar productos desde el panel `/admin`.
Los cambios se persisten en MySQL.

**Criterio de aceptación:**
- `POST /api/v1/productos` → `201 Created` (solo `ROLE_ADMIN`).
- `PUT /api/v1/productos/{id}` → `200 OK` (solo `ROLE_ADMIN`).
- `DELETE /api/v1/productos/{id}` → `204 No Content` (solo `ROLE_ADMIN`).
- Un intento con otro rol devuelve `403 Forbidden`.

---

### RF-06 · Carrito de compras

El Cliente puede agregar productos al carrito, modificar cantidades y
vaciar el carrito. La cantidad no puede superar el stock disponible.

**Criterio de aceptación:** El carrito persiste en `localStorage` del
navegador. Se actualiza en tiempo real sin recargar la página.

---

### RF-07 · Checkout y creación de pedido

El Cliente completa sus datos de entrega (retiro o despacho), revisa el
resumen del pedido y lo confirma. El pedido se guarda en MySQL con estado
`PENDIENTE`.

**Criterio de aceptación:** `POST /api/v1/pedidos` → `201 Created` con
el ID del pedido. Requiere JWT válido (`authenticated()`).

---

### RF-08 · Consulta de pedidos (Administrador y Vendedor)

El Administrador y el Vendedor pueden ver todos los pedidos registrados con
el nombre del cliente, productos, total, estado de pago y estado de despacho.

**Criterio de aceptación:** `GET /api/v1/pedidos` → `200 OK` (solo
`ROLE_ADMIN` o `ROLE_VENDEDOR`). Un cliente recibe `403 Forbidden`.

---

### RF-09 · Avance de estado de pedido (Administrador y Vendedor)

El Administrador y el Vendedor avanzan el estado de un pedido aprobado:
`PENDIENTE` → `EN_CAMINO` → `ENTREGADO`.

**Criterio de aceptación:** `PATCH /api/v1/pedidos/{id}/estado` avanza
al siguiente estado. Solo funciona con pago `APROBADO`. Requiere rol
`ROLE_ADMIN` o `ROLE_VENDEDOR`.

---

### RF-10 · Panel de Administrador (`/admin`)

Interfaz exclusiva para `ROLE_ADMIN`. Muestra indicadores de ventas,
pedidos activos y stock. Permite CRUD de productos y gestión de pedidos.

**Criterio de aceptación:** Un usuario sin sesión o con otro rol es
redirigido a `/login` o al inicio.

---

### RF-11 · Panel de Vendedor (`/vendedor`)

Interfaz exclusiva para `ROLE_ADMIN` y `ROLE_VENDEDOR`. Muestra pedidos
y el catálogo en modo solo lectura. No expone acciones de creación o
eliminación de productos.

**Criterio de aceptación:** Un cliente autenticado que navega a `/vendedor`
es redirigido al inicio. Un visitante no autenticado es redirigido a `/login`.

---

### RF-12 · Persistencia de sesión entre recargas

La sesión (token JWT y datos del usuario) se guarda en `localStorage`. Al
recargar la página, el usuario permanece autenticado sin necesidad de
volver a ingresar sus credenciales.

**Criterio de aceptación:** Tras iniciar sesión, recargar la página con F5
mantiene el estado de sesión y los botones de rol visibles en el header.

---

### RF-13 · Restricciones de acceso por rol

Spring Security bloquea cualquier request a rutas protegidas según la tabla:

| Endpoint | Público | Cliente | Vendedor | Admin |
|----------|---------|---------|----------|-------|
| `GET /api/v1/productos` | ✅ | ✅ | ✅ | ✅ |
| `POST/PUT/DELETE /api/v1/productos` | ❌ | ❌ | ❌ | ✅ |
| `GET /api/v1/pedidos` | ❌ | ❌ | ✅ | ✅ |
| `POST /api/v1/pedidos` | ❌ | ✅ | ✅ | ✅ |
| `PATCH /api/v1/pedidos/{id}/estado` | ❌ | ❌ | ✅ | ✅ |

---

### RF-14 · Pruebas automatizadas

El backend ejecuta pruebas con **JUnit 5 + Spring Boot Test**. El frontend
ejecuta pruebas con **Jasmine/Karma**. Ambas suites se ejecutan en el pipeline
de GitHub Actions antes de cada despliegue.

**Criterio de aceptación:** `mvn test` aprueba todos los tests. `npm test`
ejecuta las suites de Karma sin fallos.

---

## 5. Requisitos no funcionales

| ID | Requisito | Descripción |
|----|-----------|-------------|
| RNF-01 | **Seguridad** | Contraseñas hasheadas con BCrypt. Tokens JWT firmados con secreto gestionado como variable de entorno. HTTPS recomendado en producción. |
| RNF-02 | **Stateless** | El backend no mantiene sesiones en memoria. Cada request se autentica con el JWT. |
| RNF-03 | **Adaptabilidad** | La interfaz React usa Tailwind CSS y es responsiva en móvil y escritorio. |
| RNF-04 | **Mantenibilidad** | Código organizado en capas: controlador, servicio, repositorio (backend); páginas, layouts, hooks, contexto (frontend). |
| RNF-05 | **Despliegue continuo** | GitHub Actions despliega automáticamente al hacer push a `main` en ambos repositorios. |
| RNF-06 | **Disponibilidad** | Instancias EC2 con Docker y política de reinicio automático (`restart: unless-stopped`). |
| RNF-07 | **Compatibilidad** | El frontend compila con Vite y funciona en navegadores modernos (Chrome, Firefox, Edge). |
| RNF-08 | **Privacidad** | No se transmiten contraseñas en texto plano. No se almacenan datos financieros reales. |

---

## 6. Arquitectura del sistema

```
Usuario (navegador)
        │
        │ HTTP (EC2 frontend)
        ▼
┌─────────────────────┐
│  EC2 Frontend        │  Ubuntu + Nginx
│  /           → React │
│  /api/       → proxy │
└────────┬────────────┘
         │ HTTP interno
         ▼
┌─────────────────────┐
│  EC2 Backend         │  Ubuntu + Docker
│  Spring Boot :8080   │
│  Nginx :80 (proxy)  │
└────────┬────────────┘
         │ JDBC
         ▼
┌─────────────────────┐
│  MySQL 8.4           │  Docker volume persistente
│  gas_volcan_db       │
└─────────────────────┘
```

**Repositorios:**
- Backend: `https://github.com/Cr1stoph/Back-fs-2-Gas-El-Volcan`
- Frontend: `https://github.com/Cr1stoph/fs-2-Gas-El-Volcan`

---

## 7. Modelo de datos

### Tabla `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT PK AUTO | Identificador único |
| `username` | VARCHAR | Nombre de usuario |
| `email` | VARCHAR UNIQUE | Correo electrónico |
| `password` | VARCHAR | Hash BCrypt |
| `role` | VARCHAR | `ROLE_ADMIN`, `ROLE_VENDEDOR`, `ROLE_CLIENTE` |

### Tabla `productos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT PK AUTO | Identificador único |
| `nombre` | VARCHAR | Nombre del producto |
| `precio` | DECIMAL | Precio normal |
| `precio_oferta` | DECIMAL NULL | Precio promocional (menor que precio) |
| `img` | VARCHAR | Nombre del archivo de imagen |
| `stock` | INT | Unidades disponibles |
| `categoria` | VARCHAR | `Cilindros` o `Accesorios` |

### Tabla `ordenes`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | VARCHAR PK | UUID del pedido |
| `cliente_nombre` | VARCHAR | Nombre del cliente |
| `tipo_entrega` | VARCHAR | `retiro` o `despacho` |
| `direccion` | VARCHAR NULL | Dirección de despacho |
| `subtotal` | DECIMAL | Subtotal sin despacho |
| `costo_despacho` | DECIMAL | Costo de despacho |
| `total` | DECIMAL | Total final |
| `estado_pago` | VARCHAR | `APROBADO` o `RECHAZADO` |
| `estado` | VARCHAR | `PENDIENTE`, `EN_CAMINO`, `ENTREGADO` |
| `fecha` | DATETIME | Fecha de creación |

### Tabla `orden_items`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT PK AUTO | Identificador |
| `orden_id` | VARCHAR FK | Referencia a `ordenes.id` |
| `nombre` | VARCHAR | Nombre del producto al momento del pedido |
| `cantidad` | INT | Cantidad comprada |
| `precio_unitario` | DECIMAL | Precio al momento de la compra |

---

## 8. Flujos principales

### Flujo de compra (Cliente)

1. El cliente consulta el catálogo (`GET /api/v1/productos`).
2. Agrega productos al carrito (localStorage).
3. Inicia sesión (`POST /api/v1/auth/login`).
4. Completa el checkout con datos de entrega.
5. El frontend envía `POST /api/v1/pedidos` con JWT.
6. El backend crea el pedido en MySQL y devuelve el ID.
7. El frontend muestra el comprobante con el ID del pedido.

### Flujo de administración (Administrador)

1. Inicia sesión → redirigido a `/admin`.
2. Crea, edita o elimina productos (`POST/PUT/DELETE /api/v1/productos`).
3. Consulta pedidos (`GET /api/v1/pedidos`).
4. Avanza el estado (`PATCH /api/v1/pedidos/{id}/estado`).

### Flujo de despacho (Vendedor)

1. Inicia sesión → redirigido a `/vendedor`.
2. Consulta pedidos (`GET /api/v1/pedidos`).
3. Avanza el estado de pedidos aprobados (`PATCH /api/v1/pedidos/{id}/estado`).
4. Consulta el catálogo (solo lectura).

---

## 9. Reglas de negocio

- El precio de oferta debe ser menor que el precio normal.
- El stock limita la cantidad máxima en el carrito.
- El despacho cuesta \$2.500; el retiro en tienda no tiene costo adicional.
- Un pedido solo puede avanzar de estado si su `estadoPago` es `APROBADO`.
- La secuencia de estados es: `PENDIENTE` → `EN_CAMINO` → `ENTREGADO` (sin retroceso).
- El registro de un nuevo usuario asigna automáticamente `ROLE_CLIENTE`.
- Solo el Administrador puede cambiar roles (vía base de datos directamente).

---

## 10. Restricciones y consideraciones

- El sistema usa HTTP en la instancia actual. Para producción real se recomienda HTTPS con Let's Encrypt y dominio propio.
- Las credenciales de demo (admin123, vendedor123, cliente123) deben cambiarse antes de una presentación pública o uso real.
- La clave `.pem` de EC2 no debe subirse a ningún repositorio.
- Los secretos (JWT\_SECRET, DB\_PASSWORD) se gestionan como variables de entorno en EC2 y como GitHub Secrets en el pipeline.
