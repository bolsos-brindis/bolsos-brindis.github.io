/* ===== 🍾 HERO BANNER ===== */
window.addEventListener('load', calcularAlturaHeroBanner);
window.matchMedia('(max-width: 1200px').addEventListener('change', calcularAlturaHeroBanner);
// Debounce the fuck out of it
window.addEventListener('resize', calcularAlturaHeroBanner);

function calcularAlturaHeroBanner() {
    const heroBannerContenedor = document.getElementById('heroBannerContenedor');
    const heroBannerImagen = document.getElementById('heroBannerImagen');
    const alturaViewport = window.innerHeight;
    const alturaBarraNavegacion = window.getComputedStyle(barraNavegacion).height;

    heroBannerContenedor.style.height = `calc(${alturaViewport}px - 2rem - ${alturaBarraNavegacion})`;
    heroBannerImagen.style.top = `-${alturaBarraNavegacion}`;
    heroBannerImagen.style.height = `calc(${alturaViewport}px - 2rem)`;
}


/* ===== 🍾 PRODUCTOS ===== */

/* 🏗️ Bajo Construcción */
const slider = document.getElementById("productosContenedor");
let isDown = false;
// Posición relativa al slider en píxeles
let startX;
// Cantidad de píxeles deslizados
let scrollLeft;
let lastMove = 0;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
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
