// === 🍾 ABRIR Y CERRAR CESTA === //
const btnAbrir = document.getElementById('botonAbrirCesta');
const btnCerrar = document.getElementById('botonCerrarCesta');
const cesta = document.getElementById('cesta');

btnAbrir.addEventListener('click', () => {
    cargarCestaDesdeLocalStorage();
    cesta.classList.add('abierta');
    document.body.classList.add('cesta-abierta');

    if (!document.querySelector('.fondo-cesta')) {
        const fondo = document.createElement('div');
        fondo.classList.add('fondo-cesta');
        document.body.appendChild(fondo);
        fondo.addEventListener('click', cerrarCesta);
    }

    actualizarResumenCesta();
});

btnCerrar.addEventListener('click', cerrarCesta);

function cerrarCesta() {
    cesta.classList.remove('abierta');
    document.body.classList.remove('cesta-abierta');

    const fondo = document.querySelector('.fondo-cesta');
    if (fondo) {
        fondo.style.animation = 'desaparecerFondo 0.4s ease forwards';
        fondo.addEventListener('animationend', () => fondo.remove(), { once: true });
    }
}

// === 🍾 CARGAR HTML DEL CARRITO DESDE LOCALSTORAGE === //
function cargarCestaDesdeLocalStorage() {
    const contenedor = document.querySelector('.cesta-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];

    cesta.forEach(producto => {
        const productoHTML = crearHTMLProductoCesta(producto);
        contenedor.appendChild(productoHTML);
    });
}

// === 🍾 AÑADIR UN PRODUCTO AL HTML DEL CARRITO === //
function añadirProductoAlCarritoHTML(producto) {
    const contenedor = document.querySelector('.cesta-productos');
    if (!contenedor) return;

    const productoHTML = crearHTMLProductoCesta(producto);
    contenedor.appendChild(productoHTML);
}

// === 🍾 CREAR HTML DE UN PRODUCTO EN LA CESTA === //
function crearHTMLProductoCesta(producto) {
    const div = document.createElement('div');
    div.className = 'cesta-producto animar-entrada';
    div.dataset.sku = producto.sku;
    div.dataset.color = producto.color;

    div.innerHTML = `
        <div class="cesta-producto-imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <div class="cesta-producto-detalles">
            <p class="cesta-producto-nombre">${producto.nombre}</p>
            <div class="cesta-producto-color-contenedor">
                <span class="cesta-producto-color" style="background-color: ${producto.codigoColor};"></span>
                <span class="cesta-producto-color-nombre">${producto.color}</span>
            </div>
            <div class="cesta-producto-precio">${producto.precio.toFixed(2)} €</div>
            <div class="cesta-producto-botones">
                <div class="cesta-producto-cantidad">
                    <button type="button" class="cesta-boton-decrementar">-</button>
                    <input inputmode="numeric" min="1" max="10" value="${producto.cantidad}">
                    <button type="button" class="cesta-boton-incrementar">+</button>
                </div>
                <div class="cesta-producto-quitar">
                    <button class="underline" type="button">quitar</button>
                </div>
            </div>
        </div>
    `;
    return div;
}

// === 🍾 GESTIÓN DE EVENTOS DENTRO DE .cesta-productos === //
document.querySelector('.cesta-productos').addEventListener('click', (e) => {
    const btn = e.target;
    const productoDiv = btn.closest('.cesta-producto');
    if (!productoDiv) return;

    const sku = productoDiv.dataset.sku;
    const color = productoDiv.dataset.color;
    let cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];
    const index = cesta.findIndex(p => p.sku === sku && p.color === color);
    if (index === -1) return;

    const input = productoDiv.querySelector('input');
    let valor = parseInt(input.value);

    // Incrementar
    if (btn.classList.contains('cesta-boton-incrementar')) {
        if (valor < 10) {
            valor++;
            input.value = valor;
            cesta[index].cantidad = valor;
        }
    }

    // Decrementar
    if (btn.classList.contains('cesta-boton-decrementar')) {
        if (valor > 1) {
            valor--;
            input.value = valor;
            cesta[index].cantidad = valor;
        }
    }

    // Quitar producto
    if (btn.closest('.cesta-producto-quitar')) {
        productoDiv.classList.add('animar-salida');
        setTimeout(() => productoDiv.remove(), 300);
        cesta.splice(index, 1); // Eliminar del array
    }

    localStorage.setItem('brindisCesta', JSON.stringify(cesta));
    
    actualizarResumenCesta();
});

// === 🍾 VALIDACIÓN DE INPUTS NUMÉRICOS DINÁMICOS === //
document.querySelector('.cesta-productos').addEventListener('input', (e) => {
    if (e.target.matches('.cesta-producto-cantidad input')) {
        let input = e.target;
        let valor = parseInt(input.value);
        if (isNaN(valor) || valor < 1) valor = 1;
        if (valor > 10) valor = 10;
        input.value = valor;

        const productoDiv = input.closest('.cesta-producto');
        const sku = productoDiv.dataset.sku;
        const color = productoDiv.dataset.color;

        let cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];
        const index = cesta.findIndex(p => p.sku === sku && p.color === color);
        if (index !== -1) {
            cesta[index].cantidad = valor;
            localStorage.setItem('brindisCesta', JSON.stringify(cesta));
        }
    }
});

// === 🍾 CALCULAR EL PRECIO Y CANTIDAD TOTAL DE PRODUCTOS === //
function actualizarResumenCesta() {
    const cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];

    const cantidadTotal = cesta.reduce((sum, p) => sum + p.cantidad, 0);
    const precioTotal = cesta.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    const cantidadEl = document.getElementById('cantidadTotalProductos');
    const precioEl = document.getElementById('precioTotal');

    if (cantidadEl) cantidadEl.textContent = cantidadTotal;
    if (precioEl) precioEl.textContent = precioTotal.toFixed(2) + ' €';
}