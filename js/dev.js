
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


// ===================================


// const contenedor = document.querySelector('.reseñas-contenedor');
// const reseñas = document.querySelectorAll('.reseña');
// const flechaIzq = document.querySelector('.reseñas-flecha.izquierda');
// const flechaDer = document.querySelector('.reseñas-flecha.derecha');
// const total = reseñas.length;

// let index = 1; // empezamos en la primera reseña real
// let ancho = reseñas[0].offsetWidth;

// function moverCarrusel(nuevoIndex, animado = true) {
//     if (animado) contenedor.style.transition = 'transform 0.5s ease';
//     else contenedor.style.transition = 'none';

//     contenedor.style.transform = `translateX(-${nuevoIndex * ancho}px)`;
//     index = nuevoIndex;
// }

// function siguiente() {
//     moverCarrusel(index + 1);
// }

// function anterior() {
//     moverCarrusel(index - 1);
// }

// flechaDer.addEventListener('click', siguiente);
// flechaIzq.addEventListener('click', anterior);

// contenedor.addEventListener('transitionend', () => {
//     if (index === 0) {
//         moverCarrusel(total - 2, false); // salto al último real
//     } else if (index === total - 1) {
//         moverCarrusel(1, false); // salto al primero real
//     }
// });

// // Inicial
// window.addEventListener('load', () => moverCarrusel(index, false));
// window.addEventListener('resize', () => {
//     ancho = reseñas[0].offsetWidth;
//     moverCarrusel(index, false);
// });

// // ✅ Autoplay
// let autoplay = setInterval(siguiente, 5000); // cada 5 segundos

// // Pausar autoplay al pasar el mouse
// contenedor.addEventListener('mouseenter', () => clearInterval(autoplay));
// contenedor.addEventListener('mouseleave', () => autoplay = setInterval(siguiente, 5000));

// // ✅ Swipe en móvil
// let startX = 0;

// contenedor.addEventListener('touchstart', (e) => {
//     startX = e.touches[0].clientX;
// });

// contenedor.addEventListener('touchend', (e) => {
//     const endX = e.changedTouches[0].clientX;
//     const diff = startX - endX;

//     if (diff > 50) siguiente(); // swipe izquierda
//     if (diff < -50) anterior(); // swipe derecha
// });

