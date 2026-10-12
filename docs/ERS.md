# Especificación de requisitos de software (ERS)

## 1. Propósito

Definir el alcance de la aplicación web académica de Gas El Volcán. El sistema
presenta un catálogo de gas licuado y accesorios, permite simular pedidos y
entrega herramientas básicas para administrar productos y despachos.

## 2. Alcance y límites

La aplicación es una demostración de interfaz construida con React. Los datos
se conservan en `localStorage` en el navegador donde se ejecuta la tienda. No
existe API ni base de datos remota, autenticación de usuarios, pasarela de pago,
envío de correos o conexión real con un sistema logístico.

## 3. Usuarios y actores

- **Cliente:** consulta productos, filtra el catálogo, arma un carrito y
  completa una simulación de pedido.
- **Administradora de demostración:** mantiene el inventario y actualiza el
  estado de pedidos desde el panel.
- **Navegador:** ejecuta la interfaz y guarda temporalmente los datos locales.

## 4. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-01 | Mostrar el inicio, navegación, catálogo destacado y contacto. | La portada presenta productos y formularios con diseño adaptable. |
| RF-02 | Listar, buscar y filtrar productos por categoría. | La búsqueda por nombre y el selector actualizan los resultados. |
| RF-03 | Mostrar productos con precio promocional. | Las ofertas muestran precio normal tachado y precio vigente. |
| RF-04 | Mantener el catálogo mediante operaciones CRUD. | El panel crea, edita y elimina productos, y conserva los cambios al recargar. |
| RF-05 | Gestionar el carrito. | Se puede agregar, quitar, eliminar o vaciar productos; la cantidad no supera el stock. |
| RF-06 | Conservar los datos de compra localmente. | El carrito y los perfiles de contacto sobreviven una recarga en el mismo navegador. |
| RF-07 | Validar los datos requeridos antes del checkout. | Se revisan nombre, correo, teléfono, entrega, dirección cuando corresponde y tarjeta de prueba. |
| RF-08 | Ofrecer retiro o despacho. | El resumen diferencia retiro sin costo y despacho con costo informado. |
| RF-09 | Presentar resultados de pago y el resumen del pedido. | La aprobación muestra comprobante; un rechazo muestra el pedido y permite reintentar. |
| RF-10 | Gestionar pedidos en el panel. | La administradora revisa pedidos guardados y avanza pagos aprobados por preparación y entrega. |
| RF-11 | Mantener una experiencia adaptable y consistente. | El encabezado, catálogo, formularios y panel responden a anchos de escritorio y móvil. |
| RF-12 | Validar módulos de interfaz y comercio con Jasmine/Karma. | `npm test` ejecuta 10 o más pruebas y genera un informe HTML de cobertura. |

## 5. Requisitos no funcionales

- **RNF-01, facilidad de uso:** textos y controles deben estar en español, con
  etiquetas, estados vacíos y mensajes de validación comprensibles.
- **RNF-02, compatibilidad:** la aplicación debe compilar con Vite y funcionar
  en navegadores modernos.
- **RNF-03, adaptabilidad:** usar utilidades de Tailwind para layouts
  responsivos en móvil y escritorio.
- **RNF-04, mantenibilidad:** separar páginas, componentes, contexto y lógica de
  datos; ejecutar ESLint, build y pruebas antes de entregar.
- **RNF-05, privacidad de demostración:** no guardar contraseñas ni transmitir
  datos personales a un servidor.

## 6. Flujos principales

### Compra

1. El cliente busca o filtra productos y agrega unidades disponibles.
2. Revisa y ajusta el carrito.
3. Elige despacho o retiro, completa sus datos y revisa el total.
4. La aplicación simula el pago y guarda el pedido.
5. El resultado aprobado vacía el carrito y muestra el comprobante; el rechazo
   conserva el carrito, presenta el resumen e informa cómo reintentar.

### Administración

1. La administradora abre `/admin`.
2. Agrega, edita o elimina productos y revisa sus existencias.
3. Consulta pedidos y actualiza los pagos aprobados de pendiente a en camino y
   entregado.

## 7. Datos principales

- **Producto:** identificador, nombre, precio normal, oferta opcional, imagen,
  stock y categoría.
- **Perfil de compra:** nombre, correo y teléfono; no incluye contraseña.
- **Pedido:** identificador, fecha, cliente, método de entrega y pago,
  productos comprados, subtotal, despacho, total, estado de pago y estado de
  despacho.
- **Carrito:** productos y cantidades seleccionadas.

## 8. Reglas de demostración

- Una oferta solo se aplica cuando su precio es menor que el precio normal.
- El stock disponible limita la cantidad de un artículo en el carrito.
- El despacho cuesta $2.500; el retiro no agrega costo.
- Una tarjeta de prueba de 16 dígitos aprueba la compra, excepto
  `0000000000000000`, que simula rechazo.
- No se realiza una transacción financiera.

## 9. Restricciones y riesgos conocidos

- `localStorage` depende del navegador y no sincroniza dispositivos.
- `/admin` no tiene control de acceso; las credenciales de login no se validan.
- La disponibilidad, los precios y el despacho son datos de ejemplo.
- No usar información real de clientes ni contraseñas con esta versión.
