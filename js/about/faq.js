// ABRIR Y CERRAR LOS DETAILS
document.querySelectorAll('.faq-item').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.contenido');

    summary.addEventListener('click', e => {
        e.preventDefault();

        if (details.classList.contains('activo')) {
            // Cierre
            content.style.maxHeight = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.maxHeight = '0px';
            });

            details.classList.remove('activo');
            setTimeout(() => {
                details.removeAttribute('open');
            }, 300);
        } else {
            // Apertura
            details.setAttribute('open', '');
            details.classList.add('activo');
            const scrollHeight = content.scrollHeight;
            content.style.maxHeight = '0px';
            requestAnimationFrame(() => {
                content.style.maxHeight = scrollHeight + 'px';
            });
        }
    });
});