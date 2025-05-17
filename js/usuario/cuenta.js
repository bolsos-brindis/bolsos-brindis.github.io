window.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('sesionIniciada')) {
        window.location.href = '/html/usuario/acceso.html';
        return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const form = document.getElementById('form-cuenta');
    const mensaje = document.getElementById('cuenta-mensaje');

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
            mensaje.textContent = 'Número de tarjeta no válido.';
            mensaje.style.color = '#f44336';
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
        mensaje.textContent = '¡Cambios guardados!';
        mensaje.style.color = '#388e3c';
        setTimeout(() => mensaje.textContent = '', 2000);
    });

    // Cerrar sesión
    document.querySelector('.cuenta-logout').addEventListener('click', () => {
        sessionStorage.removeItem('sesionIniciada');
        window.location.href = '/';
    });

    // Borrar cuenta
    document.querySelector('.cuenta-borrar').addEventListener('click', () => {
        if (confirm('¿Seguro que quieres borrar tu cuenta? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('usuario');
            sessionStorage.removeItem('sesionIniciada');
            // Puedes redirigir a la home o a la página de acceso
            window.location.href = '/html/usuario/acceso.html';
        }
    });
});