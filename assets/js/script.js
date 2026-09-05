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