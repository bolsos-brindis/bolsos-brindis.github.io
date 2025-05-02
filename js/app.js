/* ===== 🍾 BARRA DE NAVEGACIÓN ===== */

const menuLateral = document.getElementById("menuLateral");
const barraNavegacion = document.getElementById("barraNavegacion");

const botonHamburguesa = document.getElementById("botonHamburguesa");
const iconoHamburguesa = document.getElementById('iconoHamburguesa');
const lineaSuperior = iconoHamburguesa.querySelector('.superior');
const lineaCentral = iconoHamburguesa.querySelector('.central');
const lineaInferior = iconoHamburguesa.querySelector('.inferior');

// Almacenar la posición de deslizamiento para volver al mismo sitio al cerrar el menú lateral
let posicionDeslizamiento = 0;

botonHamburguesa.addEventListener('click', () => {
  // Distancia desde el comienzo del documento hasta el final de la barra de navegación
  const distanciaDesdeArriba = barraNavegacion.getBoundingClientRect().bottom;

  menuLateral.style.top = `${distanciaDesdeArriba}px`;
  menuLateral.style.width = `calc(100% - ${calcularAnchoBarraDeslizamiento()}px)`;
  menuLateral.style.height = `calc(100vh - ${distanciaDesdeArriba}px)`;

  if (menuLateral.classList.toggle('activo')) {
    bloquearDeslizamiento();

    // Hamburguesa
    botonHamburguesa.setAttribute('aria-expanded', 'true');
    lineaSuperior.style.transform = 'translateY(7px)';
    lineaInferior.style.transform = 'translateY(-7px)';
    lineaCentral.style.opacity = '0';

    setTimeout(() => {
      lineaSuperior.style.transform += 'rotate(45deg)';
      lineaInferior.style.transform += 'rotate(-45deg)';
    }, 300);



  } else {
    desbloquearDeslizamiento();

    // Hamburguesa
    botonHamburguesa.setAttribute('aria-expanded', 'false');
    lineaSuperior.style.transform = 'translateY(7px) rotate(0deg)';
    lineaInferior.style.transform = 'translateY(-7px) rotate(0deg)';

    setTimeout(() => {
      lineaSuperior.style.transform = '';
      lineaInferior.style.transform = '';
      lineaCentral.style.opacity = '1';
    }, 300);
  }
  actualizarFondoBarraNavegacion();
});

function bloquearDeslizamiento() {
  // Compensar espaciado de la barra de desplazamiento. Esto evita que todo el contenido
  //  se mueva a la derecha al abrir / cerrar el menú de deslizamiento.
  // Técnica inspirada en la página de Hermès
  // Tiene que ejecutarse antes de hacerlo fijo, o no se calcula correctamente
  document.body.style.paddingRight = `${calcularAnchoBarraDeslizamiento()}px`;

  posicionDeslizamiento = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${posicionDeslizamiento}px`;
  document.body.style.width = '100%';
}

function desbloquearDeslizamiento() {
  // Revertir el espaciado de la barra de desplazamiento
  document.body.style.paddingRight = '';

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  window.scrollTo(0, posicionDeslizamiento);
}

function calcularAnchoBarraDeslizamiento() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/* Fondo transparente (Seguramente solo en la homepage) */
window.addEventListener('load', actualizarFondoBarraNavegacion);
window.addEventListener('scroll', actualizarFondoBarraNavegacion);

function actualizarFondoBarraNavegacion() {
  if (menuLateral.classList.contains('activo')) {
    barraNavegacion.classList.remove('barra-navegacion--transparente');
    barraNavegacion.classList.add('barra-navegacion--menu-abierto');
  } else {
    barraNavegacion.classList.remove('barra-navegacion--menu-abierto');

    if (window.scrollY === 0) {
      barraNavegacion.classList.add('barra-navegacion--transparente');
    } else {
      barraNavegacion.classList.remove('barra-navegacion--transparente');
    }
  }
}



/* ===== HERO BANNER ===== */
function calcularAlturaHeroBanner() {
  const heroBannerContenedor = document.getElementById('heroBannerContenedor');
  const heroBannerImagen = document.getElementById('heroBannerImagen');
  const alturaViewport = window.innerHeight;
  const alturaBarraNavegacion = window.getComputedStyle(barraNavegacion).height;

  heroBannerContenedor.style.height = `calc(${alturaViewport}px - 2rem - ${alturaBarraNavegacion})`;
  heroBannerImagen.style.top = `-${alturaBarraNavegacion}`;
  heroBannerImagen.style.height = `calc(${alturaViewport}px - 2rem)`;
}
// 👁️👁️👁️👁️👁️ COMENTADO PARA PROBAR NUEVAS FUNCIONALIDADES
// window.addEventListener('load', calcularAlturaHeroBanner);
// window.matchMedia('(max-width: 1200px').addEventListener('change', calcularAlturaHeroBanner);


// Run on media queries change instead
// window.addEventListener('resize', calcularAlturaHeroBanner);

/* ===== Swipable Buying ===== */
const slider = document.getElementById("swipeContainer");
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
  if (!isDown) return;
  isDown = false;
  slider.classList.remove('activo');
  simulateBounce(slider, lastMove);
});

slider.addEventListener('mouseup', (e) => {
  if (!isDown) return;
  isDown = false;
  slider.classList.remove('activo');
  simulateBounce(slider, lastMove);
});

function simulateBounce(container, velocity) {
  const maxScroll = container.scrollWidth - container.clientWidth;

  if (container.scrollLeft < 0 || container.scrollLeft > maxScroll) {
    const direction = container.scrollLeft < 0 ? 1 : -1;
    container.style.transition = 'transform 0.3s ease';
    container.style.transform = `translateX(${20 * direction}px)`;

    setTimeout(() => {
      container.style.transform = 'translateX(0)';
      setTimeout(() => {
        container.style.transition = '';
        container.style.transform = '';
      }, 300);
    }, 100);
  }
}


