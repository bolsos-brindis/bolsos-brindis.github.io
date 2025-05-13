const carrusel = document.querySelector('.carrusel-principal');
const miniaturas = document.querySelectorAll('.barra-imagenes img');

let isDragging = false;
let startX = 0;
let scrollStart = 0;
let currentIndex = 0;

// Drag solo en dispositivos no táctiles
if (!isTouchDevice()) {
    carrusel.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        scrollStart = carrusel.scrollLeft;
        carrusel.classList.add('dragging');
        carrusel.setPointerCapture(e.pointerId);
    });

    carrusel.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const walk = (e.clientX - startX) * 1.5;
        carrusel.scrollLeft = scrollStart - walk;
    });

    carrusel.addEventListener('pointerup', (e) => {
        isDragging = false;
        carrusel.classList.remove('dragging');
        carrusel.releasePointerCapture(e.pointerId);
        snapToClosest();
    });

    carrusel.addEventListener('pointerleave', () => {
        if (isDragging) {
            isDragging = false;
            carrusel.classList.remove('dragging');
            snapToClosest();
        }
    });

    carrusel.addEventListener('click', (e) => {
        if (isDragging) e.preventDefault();
    });

    carrusel.addEventListener('dragstart', (e) => e.preventDefault());

    // Recalcular scroll al hacer resize (mantener slide actual centrado)
    window.addEventListener('resize', () => {
        const newWidth = carrusel.offsetWidth;
        carrusel.scrollTo({
            left: newWidth * currentIndex,
            behavior: 'smooth'
        });
    });
}

// Snap manual al slide más cercano
function snapToClosest() {
    const slideWidth = carrusel.offsetWidth;
    const index = Math.round(carrusel.scrollLeft / slideWidth);
    currentIndex = index;
    carrusel.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
    });
    setActiveThumbnail(index);
}

// Actualizar miniatura activa
function setActiveThumbnail(index) {
    currentIndex = index;
    miniaturas.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// Miniaturas: hacer scroll al índice correspondiente
miniaturas.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        carrusel.scrollTo({
            left: carrusel.offsetWidth * index,
            behavior: 'smooth'
        });
        setActiveThumbnail(index);
    });
});


// Cantidad Cesta
const inputCantidad = document.querySelector('.producto-cesta-cantidad input');
const btnIncrementar = document.querySelector('.cesta-boton-incrementar');
const btnDecrementar = document.querySelector('.cesta-boton-decrementar');

function normalizarValor() {
    let valor = parseInt(inputCantidad.value);
    if (isNaN(valor) || valor < 1) valor = 1;
    if (valor > 10) valor = 10;
    inputCantidad.value = valor;
}

// Validación al escribir manualmente
inputCantidad.addEventListener('input', normalizarValor);

// Incrementar
btnIncrementar.addEventListener('click', () => {
    normalizarValor();
    let valor = parseInt(inputCantidad.value);
    if (valor < 10) inputCantidad.value = valor + 1;
});

// Decrementar
btnDecrementar.addEventListener('click', () => {
    normalizarValor();
    let valor = parseInt(inputCantidad.value);
    if (valor > 1) inputCantidad.value = valor - 1;
});



// ===== 🍾 AÑADIR PRODUCTO AL CARRITO (LOCAL_STORAGE) =====
document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.querySelector('.producto-cesta-boton');
    if (!btnAgregar) return;

    btnAgregar.addEventListener('click', () => {
        // Obtener SKU y color desde la URL: /bolsos/bloody-mary-brown.html
        const url = window.location.pathname;
        const partes = url.split('/').pop().replace('.html', '').split('-');
        const sku = partes.slice(0, -1).join('-');
        const color = partes.slice(-1)[0];

        // Recoger datos del DOM
        const nombre = document.querySelector('.producto-nombre')?.textContent.trim() || sku;
        const codigoColor = document.querySelector('.producto-color.activo')?.style.backgroundColor || '#000';
        const imagen = document.querySelector('.producto-imagen-cesta')?.src || '';
        const precioTexto = document.querySelector('.producto-precio')?.textContent || '0';
        const precio = parseFloat(precioTexto.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
        const cantidad = parseInt(document.querySelector('.producto-cesta-cantidad input')?.value) || 1;

        // Estructura del producto a guardar
        const producto = {
            sku,
            nombre,
            color,
            codigoColor,
            precio,
            cantidad,
            imagen
        };

        // Guardar en localStorage
        let cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];

        const index = cesta.findIndex(p => p.sku === sku && p.color === color);
        if (index !== -1) {
            cesta[index].cantidad += cantidad;
        } else {
            cesta.push(producto);
        }

        localStorage.setItem('brindisCesta', JSON.stringify(cesta));
        abrirCesta();

        const textoOriginal = btnAgregar.textContent;
        btnAgregar.textContent = 'añadido';
        btnAgregar.classList.add('agregado');

        setTimeout(() => {
            btnAgregar.textContent = textoOriginal;
            btnAgregar.classList.remove('agregado');
        }, 5000);
    });
});

// 🍾 AÑADIR PRODUCTO A FAVORITOS 🍾
document.addEventListener('DOMContentLoaded', () => {
    const btnFavorito = document.querySelector('.producto-favorito');
    if (!btnFavorito) return;

    // Obtener SKU y color desde la URL
    const url = window.location.pathname;
    const partes = url.split('/').pop().replace('.html', '').split('-');
    const sku = partes.slice(0, -1).join('-');
    const color = partes.slice(-1)[0];

    // Al cargar la página: marcar como activo si ya es favorito
    const favoritos = JSON.parse(localStorage.getItem('favoritosBrindis')) || [];
    const yaEsFavorito = favoritos.some(p => p.sku === sku && p.color === color);
    if (yaEsFavorito) btnFavorito.classList.add('activo');

    // Evento al hacer clic
    btnFavorito.addEventListener('click', () => {
        const nombre = document.querySelector('.producto-nombre')?.textContent.trim() || sku;
        const codigoColor = document.querySelector('.producto-color.activo')?.style.backgroundColor || '#000';
        const imagen = document.querySelector('.producto-imagen-cesta')?.src || '';
        const precioTexto = document.querySelector('.producto-precio')?.textContent || '0';
        const precio = parseFloat(precioTexto.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;

        const favorito = { sku, nombre, color, codigoColor, precio, imagen };
        let favoritos = JSON.parse(localStorage.getItem('favoritosBrindis')) || [];
        const index = favoritos.findIndex(p => p.sku === sku && p.color === color);

        if (index !== -1) {
            favoritos.splice(index, 1);
            btnFavorito.classList.remove('activo');
        } else {
            favoritos.push(favorito);
            btnFavorito.classList.add('activo');
        }

        localStorage.setItem('favoritosBrindis', JSON.stringify(favoritos));

        // Animación de favorito
        btnFavorito.classList.add('animar-favorito');
        btnFavorito.addEventListener('animationend', () => {
            btnFavorito.classList.remove('animar-favorito');
        }, { once: true });

        // Si existe función para actualizar contador, la llamamos
        if (typeof actualizarResumenFavoritos === 'function') {
            actualizarResumenFavoritos();
        }
    });
});
