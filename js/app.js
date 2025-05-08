// ===============================
// 🍔 MENÚ LATERAL + HAMBURGUESA
// ===============================

const menuLateral = document.getElementById("menuLateral");
const barraNavegacion = document.getElementById("barraNavegacion");

const botonHamburguesa = document.getElementById("botonHamburguesa");
const iconoHamburguesa = document.getElementById('iconoHamburguesa');
const lineaSuperior = iconoHamburguesa.querySelector('.superior');
const lineaCentral = iconoHamburguesa.querySelector('.central');
const lineaInferior = iconoHamburguesa.querySelector('.inferior');

let posicionDeslizamiento = 0;

botonHamburguesa.addEventListener('click', () => {
  const distanciaDesdeArriba = barraNavegacion.getBoundingClientRect().bottom;

  menuLateral.style.top = `${distanciaDesdeArriba}px`;
  menuLateral.style.width = `calc(100% - ${calcularAnchoBarraDeslizamiento()}px)`;
  menuLateral.style.height = `calc(100dvh - ${distanciaDesdeArriba}px)`;

  if (menuLateral.classList.toggle('activo')) {
    bloquearDeslizamiento();

    botonHamburguesa.setAttribute('aria-expanded', 'true');
    lineaSuperior.style.transform = 'translateY(7px)';
    lineaInferior.style.transform = 'translateY(-7px)';
    lineaCentral.style.opacity = '0';

    setTimeout(() => {
      lineaSuperior.style.transform += ' rotate(45deg)';
      lineaInferior.style.transform += ' rotate(-45deg)';
    }, 300);
  } else {
    cerrarMenuLateral();
  }

  actualizarFondoBarraNavegacion();
});

function cerrarMenuLateral() {
  menuLateral.classList.remove('activo');
  desbloquearDeslizamiento();
  actualizarFondoBarraNavegacion();

  botonHamburguesa.setAttribute('aria-expanded', 'false');
  lineaSuperior.style.transform = 'translateY(7px) rotate(0deg)';
  lineaInferior.style.transform = 'translateY(-7px) rotate(0deg)';

  setTimeout(() => {
    lineaSuperior.style.transform = '';
    lineaInferior.style.transform = '';
    lineaCentral.style.opacity = '1';
  }, 300);
}

function bloquearDeslizamiento() {
  document.body.style.paddingRight = `${calcularAnchoBarraDeslizamiento()}px`;
  posicionDeslizamiento = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${posicionDeslizamiento}px`;
  document.body.style.width = '100%';
}

function desbloquearDeslizamiento() {
  document.body.style.paddingRight = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  const html = document.documentElement;
  const originalScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, posicionDeslizamiento);
  requestAnimationFrame(() => {
    html.style.scrollBehavior = originalScrollBehavior;
  });
}

function calcularAnchoBarraDeslizamiento() {
  return window.innerWidth - document.documentElement.clientWidth;
}

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


/* SCROLL */
document.querySelectorAll('a[data-scroll]').forEach(el => {
  el.addEventListener('click', () => {
      sessionStorage.setItem('scrollDestino', el.getAttribute('data-scroll'));
  });
});