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