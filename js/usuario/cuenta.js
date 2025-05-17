window.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('sesionIniciada')) {
        window.location.href = '/html/usuario/acceso.html';
        return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const form = document.getElementById('form-cuenta');
    const mensaje = document.getElementById('cuenta-mensaje');

    // Función para mostrar mensajes animados
    function mostrarMensaje(texto, tipo = "success") {
        mensaje.textContent = texto;
        mensaje.classList.remove('error', 'info', 'activo');
        if (tipo === 'error') mensaje.classList.add('error');
        else if (tipo === 'info') mensaje.classList.add('info');
        mensaje.classList.add('activo');
        // Oculta el mensaje después de 2.5s
        setTimeout(() => {
            mensaje.classList.remove('activo');
        }, 2500);
    }

    // Rellenar los inputs
    form.nombre.value = usuario.nombre || '';
    form.correo.value = usuario.correo || '';
    form.nombreTitular.value = usuario.metodoPago?.nombreTitular || '';
    form.numeroTarjeta.value = usuario.metodoPago?.numeroTarjeta || '';
    form.fechaCaducidad.value = usuario.metodoPago?.fechaCaducidad || '';
    form.cvv.value = usuario.metodoPago?.cvv || '';
    form.nombreCalle.value = usuario.direccionEnvio?.nombreCalle || '';
    form.ciudad.value = usuario.direccionEnvio?.ciudad || '';
    form.codigoPostal.value = usuario.direccionEnvio?.codigoPostal || '';
    form.pais.value = usuario.direccionEnvio?.pais || '';

    // Guardar cambios
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validación simple de tarjeta (opcional)
        const tarjeta = form.numeroTarjeta.value.replace(/\s+/g, '');
        if (tarjeta && !/^\d{13,19}$/.test(tarjeta)) {
            mostrarMensaje('Número de tarjeta no válido.', 'error');
            return;
        }

        usuario.nombre = form.nombre.value.trim();
        usuario.correo = form.correo.value.trim();
        usuario.metodoPago = {
            nombreTitular: form.nombreTitular.value.trim(),
            numeroTarjeta: form.numeroTarjeta.value.trim(),
            fechaCaducidad: form.fechaCaducidad.value.trim(),
            cvv: form.cvv.value.trim(),
        };
        usuario.direccionEnvio = {
            nombreCalle: form.nombreCalle.value.trim(),
            ciudad: form.ciudad.value.trim(),
            codigoPostal: form.codigoPostal.value.trim(),
            pais: form.pais.value.trim(),
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));
        mostrarMensaje('¡Cambios guardados!');
    });

    // Cerrar sesión
    document.querySelector('.cuenta-logout').addEventListener('click', () => {
        sessionStorage.removeItem('sesionIniciada');
        window.location.href = '/';
    });

    // Borrar cuenta
    document.querySelector('.cuenta-borrar').addEventListener('click', () => {
        if (confirm('¿Estás segura de que quieres borrar tu cuenta?\nEsta acción no se puede deshacer.')) {
            localStorage.removeItem('usuario');
            sessionStorage.removeItem('sesionIniciada');
            // Borrar también cesta y favoritos
            localStorage.removeItem('favoritosBrindis');
            localStorage.removeItem('brindisCesta');
            window.location.href = '/html/usuario/acceso.html';
        }
    });
});