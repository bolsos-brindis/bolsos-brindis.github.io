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


// ===============================
// 🍾 SCROLL CON OFFSET (index.html)
// ===============================

function getAlturaBarra() {
    const barra = document.getElementById('barraNavegacion');
    return barra?.offsetHeight || 0;
}

function scrollConOffset(destino, espaciado = 0) {
    if (!destino) return;
    const alturaBarra = getAlturaBarra();
    const offset = destino.getBoundingClientRect().top + window.scrollY - alturaBarra - espaciado + 1;
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
}

// Enlaces normales en la homepage
document.querySelectorAll('.scroll-con-offset').forEach(el => {
    el.addEventListener('click', e => {
        const rawHref = el.getAttribute('data-scroll') || el.getAttribute('href');
        if (!rawHref || !rawHref.startsWith('#')) return;

        const destino = document.querySelector(rawHref);
        if (!destino) return;

        e.preventDefault();
        const espaciadoExtra = el.hasAttribute('data-espaciado') ? 32 : 0;
        scrollConOffset(destino, espaciadoExtra);
    });
});

// Enlaces del menú lateral (index.html)
document.querySelectorAll('#menuLateral a.scroll-con-offset').forEach(enlace => {
    enlace.addEventListener('click', e => {
        const rawHref = enlace.getAttribute('href');
        if (!rawHref || !rawHref.startsWith('#')) return;

        const destino = document.querySelector(rawHref);
        if (!destino) return;

        e.preventDefault();
        cerrarMenuLateral();

        const espaciadoExtra = enlace.hasAttribute('data-espaciado') ? 32 : 0;
        scrollConOffset(destino, espaciadoExtra);
    });
});

// FUERA DE HOMEPAGE
window.addEventListener('load', () => {
    const destinoID = sessionStorage.getItem('scrollDestino');
    if (!destinoID) return;
  
    sessionStorage.removeItem('scrollDestino');
  
    const destino = document.querySelector(destinoID);
    if (!destino) return;
  
    const alturaBarra = document.getElementById('barraNavegacion')?.offsetHeight || 0;
  
    // ¿Requiere espaciado extra?
    const requiereEspaciado = destino.hasAttribute('data-espaciado');
    const espaciadoExtra = requiereEspaciado ? 32 : 0;
  
    const y = destino.getBoundingClientRect().top + window.scrollY - alturaBarra - espaciadoExtra;
  
    window.scrollTo({ top: y, behavior: 'auto' });
  });

  /*
    # Dos tipos de data-espaciado. Uno para interno que se pone en el enlace
      Otro externo, que se pone en la sección destino.
  */