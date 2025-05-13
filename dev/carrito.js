// AÑADIR PRODUCTO AL CARRITO
document.addEventListener('DOMContentLoaded', () => {
    const btnAgregar = document.querySelector('.producto-cesta-boton');
    if (!btnAgregar) return;

    btnAgregar.addEventListener('click', () => {
        // Obtener SKU desde la URL
        const url = window.location.pathname;
        const match = url.match(/\/bolsos\/([a-z\-]+)\.html$/);
        const sku = match ? match[1].split('-').slice(0, -1).join('-') : null;
        const color = match ? match[1].split('-').slice(-1)[0] : null;
        if (!sku || !color) return;

        const nombre = document.querySelector('.producto-nombre')?.textContent.trim() || sku;
        const codigoColor = document.querySelector('.producto-color.activo')?.style.backgroundColor || '#000';
        const imagen = document.querySelector('.barra-imagenes img')?.src || '';
        const precioTexto = document.querySelector('.producto-precio')?.textContent || '0';
        const precio = parseFloat(precioTexto.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
        const cantidad = parseInt(document.querySelector('.producto-cesta-cantidad input')?.value) || 1;

        const producto = {
            sku,
            nombre,
            color,
            codigoColor,
            precio,
            cantidad,
            imagen
        };

        // Obtener la cesta actual
        let cesta = JSON.parse(localStorage.getItem('brindisCesta')) || [];

        const index = cesta.findIndex(p => p.sku === sku && p.color === color);
        if (index !== -1) {
            cesta[index].cantidad += cantidad;
        } else {
            cesta.push(producto);
        }

        localStorage.setItem('brindisCesta', JSON.stringify(cesta));

        // (Opcional) Actualizar UI
        renderizarProductoEnCesta(producto);
    });
});