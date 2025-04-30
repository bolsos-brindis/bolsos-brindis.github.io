/* ===== 🍾 BARRA DE NAVEGACIÓN ===== */

const botonHamburguesa = document.getElementById("botonHamburguesa");
const menuLateral = document.getElementById("menuLateral");
const barraNavegacion = document.getElementById("barraNavegacion");

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
    botonHamburguesa.setAttribute('aria-expanded', 'true');

  } else {
    desbloquearDeslizamiento();
    botonHamburguesa.setAttribute('aria-expanded', 'false');
  }
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