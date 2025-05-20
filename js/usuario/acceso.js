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
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado !== null) {
        // Mostrar saludo personalizado
        const usuario = JSON.parse(usuarioGuardado);
        contenedor.innerHTML = /* html */ `
            <h2 class="encabezado">Iniciar Sesión</h2>
            <div class="acceso-mensaje">
                <p>¡Hola de nuevo, <span class="nombre-usuario">${usuario.nombre || 'Usuario'}</span>!</p> 
                <p>Sabemos que ya formas parte de Brindis. Haz clic para continuar donde lo dejaste.</p>
            </div>
            <button class="cta acceso-boton" id="btn-iniciar-sesion">iniciar sesión</button>
            <p class="acceso-aviso">
                Al iniciar sesión, aceptas nuestros <a href="/html/legal/terminos-y-condiciones.html">términos</a> y la <a href="/html/legal/politica-privacidad.html">política de privacidad.</a>
            </p>
        `;

        // Redirección al hacer clic
        document.getElementById('btn-iniciar-sesion').addEventListener('click', () => {
            sessionStorage.setItem('sesionIniciada', 'true');
            window.location.href = '/html/usuario/cuenta.html';
        });

    } else {
        // Formulario de registro
        contenedor.innerHTML = /* html */ `
            <h2 class="encabezado">Registrarse</h2>
            <div class="acceso-mensaje">
                <p>¡Bienvenida a Brindis!</p>
                <p>Solo necesitamos saber tu nombre para empezar.</p>
            </div>
            <form class="acceso-formulario" id="form-registro">
                <input type="text" class="acceso-input" name="nombre" placeholder="nombre" required>
                <button class="cta acceso-boton" type="submit">registrarse</button>
            </form>
            <p class="acceso-aviso">
                Al registrarte, aceptas nuestros <a href="">términos</a> y la <a href="">política de privacidad</a>.
            </p>
        `;

        // Manejar el registro
        document.getElementById('form-registro').addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = this.nombre.value.trim();

            // Crear usuario con la estructura deseada
            const nuevoUsuario = {
                nombre: nombre,
                foto: "",
                metodoPago: {
                    nombreTitular: "",
                    fechaCaducidad: "",
                    numeroTarjeta: "",
                    cvv: "",
                },
                direccionEnvio: {
                    nombreCalle: "",
                    ciudad: "",
                    codigoPostal: "",
                    pais: ""
                }
            };

            // Guardar en localStorage
            localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
            sessionStorage.setItem('sesionIniciada', 'true');

            // Redirigir a la página de cuenta
            window.location.href = '/html/usuario/cuenta.html';
        });
    }
});