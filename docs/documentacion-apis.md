# Documentación de APIs e Integración
## Gas El Volcán — Sistema de Venta de Gas Licuado
### Evaluación Parcial 3 · DSY1104 · DUOC UC

---

## 1. Visión general de la arquitectura

```
React / Vite (EC2 frontend)
        │
        │  fetch() con Authorization: Bearer <JWT>
        │  VITE_API_URL = /api/v1  →  Nginx proxy_pass
        ▼
Nginx (EC2 frontend, puerto 80)
        │
        │  proxy_pass http://3.87.119.65/api/
        ▼
Nginx (EC2 backend, puerto 80)
        │
        │  proxy_pass http://backend:8080
        ▼
Spring Boot (contenedor Docker, puerto 8080)
        │
        │  Spring Data JPA / Hibernate
        ▼
MySQL 8.4 (contenedor Docker, volumen persistente)
```

**Dominio/IP del backend:** `http://3.87.119.65`  
**Swagger UI:** `http://3.87.119.65/swagger-ui.html`  
**Health check:** `http://3.87.119.65/actuator/health`

---

## 2. Autenticación

Todos los endpoints protegidos requieren el header:

```
Authorization: Bearer <access_token>
```

El token es un **JWT** firmado con HMAC-SHA256. Contiene:
- `sub`: correo del usuario
- `role`: rol Spring Security (`ROLE_ADMIN`, `ROLE_VENDEDOR`, `ROLE_CLIENTE`)
- `iat`: emisión (Unix timestamp)
- `exp`: expiración

---

## 3. Endpoints de autenticación

### POST `/api/v1/auth/register`

Registra un nuevo usuario con rol `ROLE_CLIENTE`.

**Request body:**
```json
{
  "username": "juan",
  "email": "juan@example.com",
  "password": "miContraseña123"
}
```

**Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "juan@example.com",
  "username": "juan",
  "role": "ROLE_CLIENTE"
}
```

**Errores:**
- `400 Bad Request` — campos inválidos o faltantes
- `409 Conflict` — correo ya registrado

---

### POST `/api/v1/auth/login`

Autentica al usuario y devuelve un JWT.

**Request body:**
```json
{
  "email": "admin@gasvolcan.cl",
  "password": "admin123"
}
```

**Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@gasvolcan.cl",
  "username": "admin",
  "role": "ROLE_ADMIN"
}
```

**Errores:**
- `401 Unauthorized` — credenciales incorrectas

---

### POST `/api/v1/auth/refresh`

Renueva el JWT sin re-autenticar. Requiere el token actual en el header `Authorization`.

**Response `200 OK`:** mismo formato que `/login` con un nuevo token (firma diferente).

---

### GET `/api/v1/auth/me` — Autenticado

Devuelve los datos del usuario dueño del token. El frontend lo usa al recargar
la página para validar que la sesión persistida siga vigente.

**Response `200 OK`:**
```json
{ "id": 1, "username": "admin", "email": "admin@gasvolcan.cl", "role": "ROLE_ADMIN" }
```

**`401 Unauthorized`** si el token es inválido o expiró.

---

## 4. Endpoints de productos

### GET `/api/v1/productos` — Público

Lista todos los productos del catálogo.

**Response `200 OK`:**
```json
[
  {
    "id": 1,
    "nombre": "Cilindro 11 kg",
    "precio": 15500,
    "precioOferta": 13990,
    "img": "cilindro.svg",
    "stock": 120,
    "categoria": "Cilindros"
  },
  {
    "id": 5,
    "nombre": "Regulador de gas",
    "precio": 10990,
    "precioOferta": 8990,
    "img": "regulador.svg",
    "stock": 35,
    "categoria": "Accesorios"
  }
]
```

---

### GET `/api/v1/productos/{id}` — Público

**Response `200 OK`:** objeto producto individual.  
**`404 Not Found`** si el ID no existe.

---

### POST `/api/v1/productos` — Solo ROLE_ADMIN

Crea un nuevo producto.

**Request body:**
```json
{
  "nombre": "Cilindro 5 kg",
  "precio": 10000,
  "precioOferta": null,
  "img": "cilindro.svg",
  "stock": 50,
  "categoria": "Cilindros"
}
```

**Response `201 Created`:** objeto producto con `id` asignado.  
**`403 Forbidden`** si el rol no es `ROLE_ADMIN`.  
**`401 Unauthorized`** si no hay token.

---

### PUT `/api/v1/productos/{id}` — Solo ROLE_ADMIN

Actualiza un producto existente. Body igual a POST.

**Response `200 OK`:** objeto producto actualizado.

---

### DELETE `/api/v1/productos/{id}` — Solo ROLE_ADMIN

Elimina un producto.

**Response `204 No Content`:** sin body.

---

## 5. Endpoints de pedidos

### GET `/api/v1/pedidos` — ROLE_ADMIN y ROLE_VENDEDOR

Lista todos los pedidos.

**Response `200 OK`:**
```json
[
  {
    "id": "uuid-del-pedido",
    "clienteNombre": "Juan Pérez",
    "tipoEntrega": "despacho",
    "direccion": "Av. Las Torres 123, Santiago",
    "items": [
      { "nombre": "Cilindro 11 kg", "cantidad": 2, "precioUnitario": 13990 }
    ],
    "subtotal": 27980,
    "costoDespacho": 2500,
    "total": 30480,
    "estadoPago": "APROBADO",
    "estado": "PENDIENTE",
    "fecha": "2026-11-19T17:45:00"
  }
]
```

**`403 Forbidden`** para `ROLE_CLIENTE`.

---

### GET `/api/v1/pedidos/{id}` — ROLE_ADMIN y ROLE_VENDEDOR

Devuelve un pedido por ID.

---

### GET `/api/v1/pedidos/mios` — ROLE_ADMIN, ROLE_VENDEDOR, ROLE_CLIENTE

Lista únicamente los pedidos del usuario autenticado. Es la consulta que usa
el cliente para revisar sus boletas.

---

### POST `/api/v1/pedidos` — ROLE_ADMIN y ROLE_CLIENTE

Crea un nuevo pedido. El backend recalcula subtotal, despacho y total, y
descuenta el stock. `ROLE_VENDEDOR` no puede crear pedidos.

**Request body:**
```json
{
  "clienteNombre": "María González",
  "tipoEntrega": "retiro",
  "direccion": null,
  "estadoPago": "APROBADO",
  "items": [
    { "productoId": 2, "cantidad": 1 },
    { "productoId": 5, "cantidad": 2 }
  ]
}
```

**Response `201 Created`:** objeto pedido completo con `id` generado.  
**`401 Unauthorized`** si no hay JWT.

---

### PUT `/api/v1/pedidos/{id}` — Solo ROLE_ADMIN

Actualiza los datos del pedido (incluido el estado). Body igual a POST.

---

### PATCH `/api/v1/pedidos/{id}/estado` — Solo ROLE_ADMIN

Avanza el estado del pedido un paso:
- `PENDIENTE` → `EN_CAMINO`
- `EN_CAMINO` → `ENTREGADO`

Solo funciona si `estadoPago === 'APROBADO'`. `ROLE_VENDEDOR` tiene acceso de
sólo lectura a pedidos: no puede avanzar estados.

**Response `200 OK`:** pedido con el nuevo estado.

---

### DELETE `/api/v1/pedidos/{id}` — Solo ROLE_ADMIN

Elimina el pedido.

**Response `204 No Content`:** sin body.

---

## 5.1 Administración (solo ROLE_ADMIN)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/usuarios` | Lista usuarios |
| POST | `/api/v1/usuarios` | Crea usuario con rol |
| PUT | `/api/v1/usuarios/{id}` | Actualiza usuario/rol |
| DELETE | `/api/v1/usuarios/{id}` | Elimina usuario |
| GET | `/api/v1/categorias` | Lista categorías |
| POST | `/api/v1/categorias` | Crea categoría |
| PUT | `/api/v1/categorias/{id}` | Actualiza categoría |
| DELETE | `/api/v1/categorias/{id}` | Elimina categoría |

Cualquier otro método o ruta devuelve `403 Forbidden` (`anyRequest().denyAll()`).

---

## 6. Tabla resumen de endpoints

| Método | Ruta | Autenticación requerida | Rol mínimo |
|--------|------|------------------------|------------|
| POST | `/api/v1/auth/register` | ❌ No | — |
| POST | `/api/v1/auth/login` | ❌ No | — |
| POST | `/api/v1/auth/refresh` | ✅ JWT | Cualquiera |
| GET | `/api/v1/auth/me` | ✅ JWT | Cualquiera |
| GET | `/api/v1/productos` | ❌ No | — |
| GET | `/api/v1/productos/{id}` | ❌ No | — |
| POST | `/api/v1/productos` | ✅ JWT | ADMIN |
| PUT | `/api/v1/productos/{id}` | ✅ JWT | ADMIN |
| DELETE | `/api/v1/productos/{id}` | ✅ JWT | ADMIN |
| GET | `/api/v1/pedidos` | ✅ JWT | ADMIN, VENDEDOR |
| GET | `/api/v1/pedidos/mios` | ✅ JWT | ADMIN, VENDEDOR, CLIENTE (solo los suyos) |
| GET | `/api/v1/pedidos/{id}` | ✅ JWT | ADMIN, VENDEDOR, CLIENTE (solo los suyos) |
| POST | `/api/v1/pedidos` | ✅ JWT | ADMIN, CLIENTE |
| PUT | `/api/v1/pedidos/{id}` | ✅ JWT | ADMIN |
| PATCH | `/api/v1/pedidos/{id}/estado` | ✅ JWT | ADMIN |
| DELETE | `/api/v1/pedidos/{id}` | ✅ JWT | ADMIN |
| GET/POST/PUT/DELETE | `/api/v1/usuarios/**`, `/api/v1/categorias/**` | ✅ JWT | ADMIN |
| GET | `/actuator/health` | ❌ No | — |
| GET | `/swagger-ui.html` | ❌ No | — |

---

## 7. Códigos de respuesta HTTP

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| `200 OK` | Éxito | GET, PUT, PATCH exitosos |
| `201 Created` | Creado | POST de producto o pedido |
| `204 No Content` | Sin contenido | DELETE exitoso |
| `400 Bad Request` | Validación fallida | Campos inválidos o faltantes |
| `401 Unauthorized` | No autenticado | Sin JWT o token expirado |
| `403 Forbidden` | Acceso denegado | Rol insuficiente |
| `404 Not Found` | No encontrado | ID de producto o pedido inexistente |
| `409 Conflict` | Conflicto | Correo ya registrado |

---

## 8. Integración frontend ↔ backend

### Configuración de la URL base

```js
// src/data/api.js
// normalizarBase() garantiza que cualquier valor termine en /api/v1
export const API_BASE = normalizarBase(import.meta.env.VITE_API_URL);
```

| Entorno | `VITE_API_URL` | Resultado |
|---------|---------------|-----------|
| Desarrollo local | `http://localhost:8080/api/v1` | Llama directo al backend local |
| EC2 frontend | `/api/v1` | Nginx hace proxy al backend |
| GitHub Pages (fallback) | `https://nip.io/api/v1` | No recomendado (Mixed Content) |

También se aceptan `http://localhost:8080` y `http://localhost:8080/api`:
ambos se normalizan a `http://localhost:8080/api/v1`.

### Flujo de autenticación en el frontend

```
1. Usuario ingresa correo + contraseña en /login
2. fetch POST /api/v1/auth/login
3. Backend devuelve { token, email, username, role }
4. Frontend guarda en localStorage:
   - gas-volcan:access-token  = token JWT
   - gas-volcan:session       = { correo, nombre, rol }
5. Requests posteriores incluyen:
   Authorization: Bearer <token>
6. Header reacciona al evento 'gas-volcan:auth-changed'
   y muestra el nombre del usuario y el botón de su panel
 7. Al recargar, AuthProvider valida GET /api/v1/auth/me; si el JWT
    expiró (claim exp) o el backend lo rechaza, se cierra la sesión
```

### Función `request()` en `api.js`

```js
async function request(path, options = {}) {
  const { sinAuth = false, ...config } = options;
  const token = localStorage.getItem('gas-volcan:access-token');
  const headers = new Headers(config.headers);
  if (config.body != null) headers.set('Content-Type', 'application/json');
  if (token && !sinAuth) headers.set('Authorization', `Bearer ${token}`);

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...config, headers });
  } catch {
    throw new ApiError('No fue posible conectar con el servidor.', 0);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    if (response.status === 401 && !sinAuth) cerrarSesion();
    throw new ApiError(body?.message ?? `La API respondió con estado ${response.status}.`, response.status);
  }
  if (response.status === 204) return null;
  const texto = await response.text();
  return texto ? JSON.parse(texto) : null;
}
```

### Rutas y menús por rol en el frontend

| Rol | Rutas permitidas | Menú |
|-----|------------------|------|
| `ROLE_ADMIN` | `/admin`, `/admin/usuarios`, `/admin/categorias`, tienda y pedidos | Panel admin + tienda |
| `ROLE_VENDEDOR` | `/vendedor`, `/vendedor/productos/:id`, `/vendedor/pedidos/:id` | Panel vendedor (sólo consulta) |
| `ROLE_CLIENTE` | tienda, `/checkout`, `/mis-pedidos` | Tienda + carrito |

`ProtectedRoute` y `StoreRoute` aplican la matriz en el enrutador;
`VendedorPage` y sus detalle no exponen acciones de escritura ni cambio de estado.

---

## 9. Configuración de CORS en Spring Boot

```java
// WebConfig.java (simplificado)
@CrossOrigin(origins = "*")
// o en SecurityConfig:
.cors(Customizer.withDefaults())
```

> Con Nginx actuando como proxy en el EC2 frontend, el navegador ve
> el mismo origen para frontend y `/api`. CORS no es necesario en esa
> arquitectura, pero está configurado para permitir acceso desde
> GitHub Pages como fallback.

---

## 10. Pipeline CI/CD

### Backend (`.github/workflows/deploy-ec2.yml`)

```
push a main
  → mvn test
  → mvn package -DskipTests
  → docker build
  → SSH al EC2 backend
  → docker compose up --build
  → curl /actuator/health → 200
```

### Frontend (`.github/workflows/deploy-frontend-ec2.yml`)

```
push a main
  → npm ci
  → npm run lint
  → VITE_BASE_PATH=/ npm run build
  → rsync dist/ → EC2 frontend /var/www/gas-volcan/
  → nginx reload
  → curl http://EC2_FRONTEND/ → 200
```
