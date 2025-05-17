// Detectar si es un dispositivo táctil
function isTouchDevice() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

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


/* MAIN CON ALTURA MÍNIMA DE 100DVH - FOOTER Y HEADER */
/*
  # De momento, hay que ponerle al main el id de #main y al footer #footer. En los documentos que se quiera llamar, se podrán usar los listeners de abajo.
  
  # Con el código no comentado, ya iría solo sin tener que añadir los IDs.
*/
// function ajustarMinHeightMain() {
//   const main = document.getElementById('main');
//   const footer = document.getElementById('footer');

//   const alturaFooter = footer.offsetHeight;
//   const bottomNav = barraNavegacion.getBoundingClientRect().bottom + window.scrollY;

//   const alturaViewport = window.innerHeight;
//   const alturaDisponible = alturaViewport - alturaFooter - bottomNav;

//   main.style.minHeight = `${alturaDisponible}px`;
// }

// // Llamar al cargar y al redimensionar
// window.addEventListener('load', ajustarMinHeightMain);
// window.addEventListener('resize', ajustarMinHeightMain);


function ajustarMinHeightMain() {
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const nav = document.querySelector('header');

  if (!main || !footer || !nav) return;

  const alturaFooter = footer.offsetHeight;
  const bottomNav = nav.getBoundingClientRect().bottom + window.scrollY;

  const alturaViewport = window.innerHeight;
  const alturaDisponible = alturaViewport - alturaFooter - bottomNav;

  main.style.minHeight = `${alturaDisponible}px`;
}

window.addEventListener('load', ajustarMinHeightMain);
window.addEventListener('resize', ajustarMinHeightMain);



// ===== 🍾🍾🍾 CESTA DE LA COMPRA 🍾🍾🍾 =====

// === 🍾 ABRIR Y CERRAR CESTA === //
const btnAbrir = document.getElementById('botonAbrirCesta');
const btnCerrar = document.getElementById('botonCerrarCesta');
const cesta = document.getElementById('cesta');

function abrirCesta() {
  cargarCestaDesdeLocalStorage();
  cesta.classList.add('abierta');
  document.body.classList.add('cesta-abierta');

  const fondo = document.getElementById('fondoCesta');
  if (fondo) {
    fondo.style.display = 'block';
    void fondo.offsetWidth; // Forzar reflow para animación
    fondo.style.animation = 'aparecerFondo 0.4s forwards';
    fondo.addEventListener('click', cerrarCesta, { once: true });
  }

  actualizarResumenCesta();
}


btnAbrir.addEventListener('click', abrirCesta);
btnCerrar.addEventListener('click', cerrarCesta);

function cerrarCesta() {
  cesta.classList.remove('abierta');
  document.body.classList.remove('cesta-abierta');

  const fondo = document.getElementById('fondoCesta');
  if (fondo) {
    fondo.style.animation = 'desaparecerFondo 0.4s forwards';
    fondo.addEventListener('animationend', () => {
      fondo.style.display = 'none';
      fondo.style.animation = '';
    }, { once: true });
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




// FAVORITOS 👻
const asideFavoritos = document.getElementById('favoritos');
const btnCerrarFavoritos = document.getElementById('botonCerrarFavoritos');
const btnAbrirFavoritos = document.getElementById('botonAbrirFavoritos');

function abrirFavoritos() {
  cargarFavoritosDesdeLocalStorage();
  asideFavoritos.classList.add('abierta');
  document.body.classList.add('cesta-abierta'); // reaprovechamos esta clase para bloquear scroll

  const fondo = document.getElementById('fondoCesta');
  if (fondo) {
    fondo.style.display = 'block';
    void fondo.offsetWidth;
    fondo.style.animation = 'aparecerFondo 0.4s forwards';
    fondo.addEventListener('click', cerrarFavoritos, { once: true });
  }

  actualizarResumenFavoritos();
}

function cerrarFavoritos() {
  asideFavoritos.classList.remove('abierta');
  document.body.classList.remove('cesta-abierta');

  const fondo = document.getElementById('fondoCesta');
  if (fondo) {
    fondo.style.animation = 'desaparecerFondo 0.4s forwards';
    fondo.addEventListener('animationend', () => {
      fondo.style.display = 'none';
      fondo.style.animation = '';
    }, { once: true });
  }
}

btnCerrarFavoritos.addEventListener('click', cerrarFavoritos);
btnAbrirFavoritos.addEventListener('click', abrirFavoritos);

function cargarFavoritosDesdeLocalStorage() {
  const contenedor = document.getElementById('contenedorFavoritos');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  const favoritos = JSON.parse(localStorage.getItem('favoritosBrindis')) || [];

  favoritos.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'favorito-producto animar-entrada';
    div.dataset.sku = producto.sku;
    div.dataset.color = producto.color;

    div.innerHTML = `
          <div class="favorito-producto-imagen">
              <img src="${producto.imagen}" alt="${producto.nombre}">
          </div>
          <div class="favorito-producto-detalles">
              <p class="favorito-producto-nombre">${producto.nombre}</p>
              <div class="favorito-producto-color-contenedor">
                  <span class="favorito-producto-color" style="background-color: ${producto.codigoColor};"></span>
                  <span class="favorito-producto-color-nombre">${producto.color}</span>
              </div>
              <div class="favorito-producto-precio">${producto.precio.toFixed(2)} €</div>
              <div class="favorito-producto-quitar">
                  <button type="button">quitar</button>
              </div>
          </div>
      `;
    contenedor.appendChild(div);
  });
}

function actualizarResumenFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem('favoritosBrindis')) || [];
  const cantidadEl = document.getElementById('cantidadFavoritos');
  if (cantidadEl) cantidadEl.textContent = favoritos.length;
}

// Quitar favoritos desde el botón de quitar
document.getElementById('contenedorFavoritos').addEventListener('click', (e) => {
  const btn = e.target;
  if (!btn.closest('.favorito-producto-quitar')) return;

  const productoDiv = btn.closest('.favorito-producto');
  const sku = productoDiv.dataset.sku;
  const color = productoDiv.dataset.color;

  let favoritos = JSON.parse(localStorage.getItem('favoritosBrindis')) || [];
  const index = favoritos.findIndex(p => p.sku === sku && p.color === color);

  if (index !== -1) {
    favoritos.splice(index, 1);
    localStorage.setItem('favoritosBrindis', JSON.stringify(favoritos));
  }

  // También desactivar el botón favorito en la página si corresponde
  // Si hacemos clic en quitar, quitar la clase del botón de favoritos
  const btnFavoritoPrincipal = document.querySelector('.producto-favorito');
  if (btnFavoritoPrincipal) {
    const url = window.location.pathname;
    const partes = url.split('/').pop().replace('.html', '').split('-');
    const productoActualSku = partes.slice(0, -1).join('-');
    const productoActualColor = partes.slice(-1)[0];

    if (productoActualSku === sku && productoActualColor === color) {
      btnFavoritoPrincipal.classList.remove('activo');
    }
  }

  productoDiv.classList.add('animar-salida');
  productoDiv.addEventListener('animationend', () => productoDiv.remove(), { once: true });

  actualizarResumenFavoritos();
});


/* ===== 🍾 BOTÓN DE USUARIO ===== */
document.querySelectorAll('.botonCuenta').forEach((boton) => {
  boton.addEventListener('click', (e) => {
    e.preventDefault();

    const redireccion = sessionStorage.getItem('sesionIniciada')
      ? '/html/usuario/cuenta.html'
      : '/html/usuario/acceso.html';

    window.location.href = redireccion;
  });
});