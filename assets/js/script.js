// Carrito en memoria (se reinicia al recargar la página)
let cart = [
    { id: 1, nombre: "Cilindro 11kg", precio: 15500, cantidad: 1, img: "https://cdn-icons-png.flaticon.com/512/491/491214.png" }
];

// Dibuja la lista de productos y totales en pantalla
// Dibuja la lista de productos y totales en pantalla
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const cartCounter = document.getElementById('cart-counter');
    const subtotalEl = document.getElementById('subtotal-val');
    const totalEl = document.getElementById('total-val');

    let totalItems = 0;
    let totalPrice = 0;

    // 1. Calculamos los totales recorriendo el carrito
    cart.forEach(item => {
        totalItems += item.cantidad;
        totalPrice += item.precio * item.cantidad;
    });

    // 2. Actualizamos el contador y los precios donde sea que existan
    if (cartCounter) cartCounter.innerText = `(${totalItems})`;
    if (subtotalEl) subtotalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;
    if (totalEl) totalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;

    // 3. Dibujamos los productos SOLO si estamos en la página del carrito
    if (container) {
        container.innerHTML = '';
        
        if (cart.length === 0) {
            if (emptyMsg) emptyMsg.classList.remove('hidden');
        } else {
            if (emptyMsg) emptyMsg.classList.add('hidden');
            cart.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = "py-4 flex items-center justify-between gap-4 border-b border-gray-100";
                itemEl.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <img src="${item.img}" alt="${item.nombre}" class="w-12 h-12 object-contain bg-orange-50 p-1 rounded-lg">
                        <div>
                            <h3 class="font-bold text-gray-800 text-sm">${item.nombre}</h3>
                            <p class="text-orange-600 text-xs font-semibold">$${item.precio.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button type="button" onclick="changeQuantity(${item.id}, -1)" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 font-bold rounded text-gray-700">-</button>
                        <span class="w-6 text-center text-sm font-bold">${item.cantidad}</span>
                        <button type="button" onclick="changeQuantity(${item.id}, 1)" class="w-7 h-7 bg-gray-100 hover:bg-gray-200 font-bold rounded text-gray-700">+</button>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-sm">$${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                        <button type="button" onclick="removeItem(${item.id})" class="text-xs text-red-500 hover:underline">Eliminar</button>
                    </div>
                `;
                container.appendChild(itemEl);
            });
        }
    }
}

// Modifica la cantidad de un producto
function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.cantidad += delta;
        if (item.cantidad <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        renderCart();
    }
}

// Elimina un producto del arreglo
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

// Inicialización de eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    // === NUEVO CÓDIGO PARA AGREGAR AL CARRITO ===
    const botonesAgregar = document.querySelectorAll('.btn-add-cart');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = parseInt(boton.dataset.id);
            const nombre = boton.dataset.nombre;
            const precio = parseInt(boton.dataset.precio);
            const img = boton.dataset.img;

            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.cantidad += 1;
            } else {
                cart.push({ id, nombre, precio, cantidad: 1, img });
            }
            
            renderCart();
            alert(`¡${nombre} añadido al carrito!`);
        });
    });
    // ============================================

    const emptyBtn = document.getElementById('btn-empty-cart');
    if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
            if (confirm('¿Deseas vaciar el carrito?')) {
                cart = [];
                renderCart();
            }
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('El carrito está vacío.');
                return;
            }
            alert('¡Pedido enviado con éxito!');
            cart = [];
            renderCart();
            window.location.href = 'index.html';
        });
    }
});

// Control del menú hamburguesa móvil
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        // Toggle para mostrar/ocultar menú
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Ocultar menú al hacer clic en cualquier enlace (útil para la ancla #contacto)
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// ==========================================
// 1. ESTADO EN MEMORIA (PEDIDOS ADMIN)
// ==========================================
let pedidos = [
    { id: 1042, cliente: 'María González', direccion: 'Av. Libertad 450, Chillán', cilindro: '1x 15 kg', total: 21000, estado: 'Pendiente' },
    { id: 1041, cliente: 'Carlos Muñoz', direccion: 'Calle El Roble 1120, Chillán', cilindro: '2x 11 kg', total: 31000, estado: 'En Camino' },
    { id: 1040, cliente: 'Ana Sepúlveda', direccion: 'Pasaje Los Olivos 88, Chillán', cilindro: '1x 5 kg', total: 10000, estado: 'Entregado' }
];

// ==========================================
// 2. MENÚ HAMBURGUESA MÓVIL (ROBUSTO)
// ==========================================
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ==========================================
// 3. LÓGICA DEL PANEL ADMINISTRADOR
// ==========================================
function renderizarAdmin() {
    const tablaBody = document.getElementById('tabla-pedidos-body');
    if (!tablaBody) return; 

    let totalVentas = 0;
    let pendientes = 0;

    tablaBody.innerHTML = '';

    pedidos.forEach(p => {
        if (p.estado === 'Entregado') totalVentas += p.total;
        if (p.estado === 'Pendiente') pendientes++;

        let badgeClass = 'bg-yellow-100 text-yellow-800';
        let btnTexto = 'Despachar';
        let btnClass = 'text-orange-600 hover:bg-orange-50 border-orange-200';

        if (p.estado === 'En Camino') {
            badgeClass = 'bg-blue-100 text-blue-800';
            btnTexto = 'Marcar Entregado';
            btnClass = 'text-blue-600 hover:bg-blue-50 border-blue-200';
        } else if (p.estado === 'Entregado') {
            badgeClass = 'bg-green-100 text-green-800';
            btnTexto = 'Completado';
            btnClass = 'text-gray-400 bg-gray-50 border-gray-200 cursor-default';
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 transition';
        tr.innerHTML = `
            <td class="px-6 py-4 font-bold text-gray-900">#${p.id}</td>
            <td class="px-6 py-4 font-medium text-gray-800">${p.cliente}</td>
            <td class="px-6 py-4">${p.direccion}</td>
            <td class="px-6 py-4">${p.cilindro}</td>
            <td class="px-6 py-4 font-bold text-gray-900">$${p.total.toLocaleString('es-CL')}</td>
            <td class="px-6 py-4">
                <span class="text-xs font-bold px-2.5 py-1 rounded-full ${badgeClass}">${p.estado}</span>
            </td>
            <td class="px-6 py-4 text-right">
                <button onclick="avanzarEstado(${p.id})" ${p.estado === 'Entregado' ? 'disabled' : ''} 
                    class="font-bold text-xs border px-3 py-1.5 rounded-lg transition ${btnClass}">
                    ${btnTexto}
                </button>
            </td>
        `;
        tablaBody.appendChild(tr);
    });

    const kpiVentas = document.getElementById('kpi-ventas');
    const kpiPendientes = document.getElementById('kpi-pendientes');
    if (kpiVentas) kpiVentas.textContent = `$${totalVentas.toLocaleString('es-CL')}`;
    if (kpiPendientes) kpiPendientes.textContent = pendientes;
}

function avanzarEstado(id) {
    pedidos = pedidos.map(p => {
        if (p.id === id) {
            if (p.estado === 'Pendiente') p.estado = 'En Camino';
            else if (p.estado === 'En Camino') p.estado = 'Entregado';
        }
        return p;
    });
    renderizarAdmin();
}

function agregarPedidoManual() {
    const cliente = prompt("Nombre del cliente:");
    if (!cliente) return;
    const direccion = prompt("Dirección de entrega:");
    if (!direccion) return;
    const cilindro = prompt("Detalle cilindro (Ej: 1x 11 kg):", "1x 11 kg");
    const total = parseInt(prompt("Monto Total ($):", "15500")) || 0;

    const nuevoId = pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1000;

    pedidos.unshift({ id: nuevoId, cliente, direccion, cilindro, total, estado: 'Pendiente' });
    renderizarAdmin();
}

// ==========================================
// 4. INICIALIZACIÓN GLOBAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    renderizarAdmin();

    const btnNuevoPedido = document.getElementById('btn-nuevo-pedido');
    if (btnNuevoPedido) {
        btnNuevoPedido.addEventListener('click', agregarPedidoManual);
    }
});
// Manejar el envío del formulario de Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // Redirige directamente al dashboard
        window.location.href = 'admin.html';
    });
}