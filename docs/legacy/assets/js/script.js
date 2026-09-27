// ==========================================
// 1. CATÁLOGO DE PRODUCTOS BASE Y ESTADO IN-MEMORY
// ==========================================
const PRODUCTOS_BASE = [
    { id: 1, nombre: "Cilindro 11kg", precio: 15500, img: "https://cdn-icons-png.flaticon.com/512/491/491214.png" },
    { id: 2, nombre: "Cilindro 15kg", precio: 21000, img: "https://cdn-icons-png.flaticon.com/512/491/491214.png" },
    { id: 3, nombre: "Cilindro 45kg", precio: 65000, img: "https://cdn-icons-png.flaticon.com/512/491/491214.png" }
];

let cart = [];

let pedidos = [
    { id: 1042, cliente: 'María González', direccion: 'Av. Libertad 450, Chillán', cilindro: '1x 15 kg', total: 21000, estado: 'Pendiente' },
    { id: 1041, cliente: 'Carlos Muñoz', direccion: 'Calle El Roble 1120, Chillán', cilindro: '2x 11 kg', total: 31000, estado: 'En Camino' },
    { id: 1040, cliente: 'Ana Sepúlveda', direccion: 'Pasaje Los Olivos 88, Chillán', cilindro: '1x 5 kg', total: 10000, estado: 'Entregado' }
];

// ==========================================
// 2. LECTURA Y NAVEGACIÓN VÍA URL
// ==========================================
function cargarCarritoDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    const cartData = params.get('cart');

    if (!cartData) return;

    cart = [];
    const items = cartData.split(','); // Parsea "1:2,2:1" -> ID 1 (cant 2), ID 2 (cant 1)
    items.forEach(itemStr => {
        const [idStr, cantStr] = itemStr.split(':');
        const id = parseInt(idStr);
        const cantidad = parseInt(cantStr);
        const prodBase = PRODUCTOS_BASE.find(p => p.id === id);

        if (prodBase && cantidad > 0) {
            cart.push({ ...prodBase, cantidad });
        }
    });
}

function irAlCarrito() {
    if (cart.length === 0) {
        window.location.href = 'carrito.html';
    } else {
        const cartString = cart.map(item => `${item.id}:${item.cantidad}`).join(',');
        window.location.href = `carrito.html?cart=${encodeURIComponent(cartString)}`;
    }
}

// ==========================================
// 3. RENDERIZADO Y ACCIONES DE CARRITO
// ==========================================
function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const cartCounter = document.getElementById('cart-counter');
    const subtotalEl = document.getElementById('subtotal-val');
    const totalEl = document.getElementById('total-val');

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.cantidad;
        totalPrice += item.precio * item.cantidad;
    });

    if (cartCounter) cartCounter.innerText = `(${totalItems})`;
    if (subtotalEl) subtotalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;
    if (totalEl) totalEl.innerText = `$${totalPrice.toLocaleString('es-CL')}`;

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
                        <button type="button" onclick="changeQuantity(${item.id}, -1)" class="w-7 h-7 bg-gray-100 font-bold rounded">-</button>
                        <span class="w-6 text-center text-sm font-bold">${item.cantidad}</span>
                        <button type="button" onclick="changeQuantity(${item.id}, 1)" class="w-7 h-7 bg-gray-100 font-bold rounded">+</button>
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

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

// ==========================================
// 4. PANEL DE ADMINISTRACIÓN
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

        let badgeClass = p.estado === 'En Camino' ? 'bg-blue-100 text-blue-800' : (p.estado === 'Entregado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800');

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50 transition';
        tr.innerHTML = `
            <td class="px-6 py-4 font-bold text-gray-900">#${p.id}</td>
            <td class="px-6 py-4 font-medium text-gray-800">${p.cliente}</td>
            <td class="px-6 py-4">${p.direccion}</td>
            <td class="px-6 py-4">${p.cilindro}</td>
            <td class="px-6 py-4 font-bold text-gray-900">$${p.total.toLocaleString('es-CL')}</td>
            <td class="px-6 py-4"><span class="text-xs font-bold px-2.5 py-1 rounded-full ${badgeClass}">${p.estado}</span></td>
            <td class="px-6 py-4 text-right">
                <button onclick="avanzarEstado(${p.id})" ${p.estado === 'Entregado' ? 'disabled' : ''} class="font-bold text-xs border px-3 py-1.5 rounded-lg">
                    ${p.estado === 'Pendiente' ? 'Despachar' : (p.estado === 'En Camino' ? 'Marcar Entregado' : 'Completado')}
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

// ==========================================
// 5. INICIALIZACIÓN GENERAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeURL();
    renderCart();
    renderizarAdmin();

    // Botón para ir al carrito pasando datos por la URL
    const btnIrCarrito = document.getElementById('btn-ir-carrito');
    if (btnIrCarrito) {
        btnIrCarrito.addEventListener('click', (e) => {
            e.preventDefault();
            irAlCarrito();
        });
    }

    // Botones para agregar productos en index.html
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

    // Formulario Checkout en carrito.html
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('El carrito está vacío.');
                return;
            }
            alert('¡Pedido realizado con éxito!');
            window.location.href = 'index.html';
        });
    }
});