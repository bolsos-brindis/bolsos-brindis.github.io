function ajustarAlturaAcceso() {
    const barra = document.getElementById('barraNavegacion');
    const seccion = document.querySelector('.acceso');

    if (barra && seccion) {
        const alturaNavbar = barra.offsetHeight;
        const alturaViewport = window.innerHeight;
        seccion.style.height = (alturaViewport - alturaNavbar) + "px";
        seccion.style.minHeight = (alturaViewport - alturaNavbar) + "px";
    }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener('load', ajustarAlturaAcceso);
if (!isTouchDevice()) {
    window.addEventListener('resize', ajustarAlturaAcceso);
}


// RENDERIZAR HTML DEPENDIENDO DE SI YA EXISTE EL USUARIO
const contenedor = document.querySelector('.acceso-contenedor');
window.addEventListener('load', () => {
    // Comprobar si existe el usuario
    if (localStorage.getItem('usuario') !== null) {
        contenedor.innerHTML = /* html */ `
            <h2 class="encabezado">Iniciar Sesión</h2>
            <div class="acceso-mensaje">
                <p>¡Hola de nuevo, <span class="nombre-usuario">Marina</span>!</p> 
                <p>Sabemos que ya formas parte de Brindis.  Haz clic para continuar donde lo dejaste.</p>
            </div>
            <button class="cta acceso-boton">iniciar sesión</button>
            <p class="acceso-aviso">
                Al iniciar sesión, aceptas nuestros <a href="">términos</a> y la <a href="">política de
                    privacidad.</a>
            </p>
        `;
    } else {
        contenedor.innerHTML = /* html */ `
            <h2 class="encabezado">Registrarse</h2>
            <div class="acceso-mensaje">
                <p>¡Bienvenida a Brindis!</p>
                <p>Solo necesitamos saber tu nombre para empezar.</p>
            </div>
            <form class="acceso-formulario">
                <input type="text" class="acceso-input" name="nombre" placeholder="nombre" required>
                <button class="cta acceso-boton" type="submit">registrarse</button>
            </form>
            <p class="acceso-aviso">
                Al registrarte, aceptas nuestros <a href="">términos</a> y la <a href="">política de privacidad</a>.
            </p>
        `;
    }
});

