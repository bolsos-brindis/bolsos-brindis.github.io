/* ===== 🍾 HERO BANNER ===== */
window.addEventListener('load', calcularAlturaHeroBanner);
window.matchMedia('(max-width: 1200px)').addEventListener('change', calcularAlturaHeroBanner);
window.addEventListener('orientationchange', () => {
    setTimeout(calcularAlturaHeroBanner, 300);
});
// Debounce the fuck out of it
// window.addEventListener('resize', calcularAlturaHeroBanner);

function calcularAlturaHeroBanner() {
    const heroBannerContenedor = document.getElementById('heroBannerContenedor');
    const heroBannerImagen = document.getElementById('heroBannerImagen');
    const alturaViewport = window.innerHeight;
    const alturaBarraNavegacion = window.getComputedStyle(barraNavegacion).height;

    heroBannerContenedor.style.height = `calc(${alturaViewport}px - 2rem - ${alturaBarraNavegacion})`;
    heroBannerImagen.style.top = `-${alturaBarraNavegacion}`;
    heroBannerImagen.style.height = `calc(${alturaViewport}px - 2rem)`;
}

// document.getElementById('ctaHero').addEventListener('click', () => {
//     const destino = document.getElementById('marquee');
//     const barraNavegacionAltura = document.getElementById('barraNavegacion').offsetHeight;
//     const offset = destino.getBoundingClientRect().top + window.scrollY - barraNavegacionAltura + 1;
//     window.scrollTo({
//         top: offset,
//         behavior: 'smooth'
//     });
// });


/* ===== 🍾 PRODUCTOS ===== */
const slider = document.getElementById("productosContenedor");
let isDown = false;
let isDragging = false;
// Posición relativa al slider en píxeles
let startX;
// Cantidad de píxeles deslizados
let scrollLeft;
let lastMove = 0;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    /*
      `pageX` devuelve la posición absoluta en la página.
      `offsetLeft` devuelve el espacio entre el comienzo del documento y el elemento.
    */
    slider.classList.add('activo');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.scrollLeft = scrollLeft - walk;
    lastMove = walk;
    if (Math.abs(walk) > 5) isDragging = true;
});

// Al salir del contenedor. Codigo duplicado
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('activo');
});

slider.addEventListener('mouseup', (e) => {
    isDown = false;
    slider.classList.remove('activo');
});

slider.addEventListener('click', (e) => {
    if (isDragging) {
        e.preventDefault();
        e.stopPropagation(); // opcional: bloquea burbuja
    }
});

slider.querySelectorAll('a, img').forEach(el => {
    el.setAttribute('draggable', 'false');
});


/* ===== 🍾 RESEÑAS ===== */
const contenedor = document.querySelector('.reseñas-contenedor');
const reseñas = document.querySelectorAll('.reseña');
const total = reseñas.length;
const flechaIzq = document.querySelector('.reseñas-flecha.izquierda');
const flechaDer = document.querySelector('.reseñas-flecha.derecha');

let index = 1; // Empezamos en la primera reseña real

// Posiciona en la primera real sin transición
const ancho = reseñas[0].offsetWidth;
contenedor.style.transform = `translateX(-${index * ancho}px)`;

function moverCarrusel(nuevoIndex) {
    const ancho = reseñas[0].offsetWidth;
    contenedor.style.transition = 'transform 0.5s ease';
    contenedor.style.transform = `translateX(-${nuevoIndex * ancho}px)`;
    index = nuevoIndex;
}

flechaDer.addEventListener('click', () => {
    if (index >= total - 1) return;
    moverCarrusel(index + 1);
});

flechaIzq.addEventListener('click', () => {
    if (index <= 0) return;
    moverCarrusel(index - 1);
});

contenedor.addEventListener('transitionend', () => {
    contenedor.style.transition = 'none';
    const ancho = reseñas[0].offsetWidth;

    if (index === 0) {
        // Volver al último real
        index = total - 2;
        contenedor.style.transform = `translateX(-${index * ancho}px)`;
    }

    if (index === total - 1) {
        // Volver al primero real
        index = 1;
        contenedor.style.transform = `translateX(-${index * ancho}px)`;
    }
});

window.addEventListener('resize', () => {
    const ancho = reseñas[0].offsetWidth;
    contenedor.style.transform = `translateX(-${index * ancho}px)`;
});


/* ===== 🍾 NEWSLETTER ===== */
const formulario = document.querySelector('.newsletter form');
const modal = document.getElementById('newsletterModal');
const inputCorreo = document.getElementById('emailNewsletter');
const spanCorreo = document.getElementById('correoMostrado');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = inputCorreo.value.trim();
    if (!correo) return;

    spanCorreo.textContent = correo;
    modal.classList.add('activo');

    inputCorreo.value = ''; // vaciar el input

    // Ocultar el modal después de 3 segundos
    setTimeout(() => {
        modal.classList.remove('activo');
    }, 3000);
});