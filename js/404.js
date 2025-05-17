function ajustarAltura404() {
    const barra = document.getElementById("barraNavegacion");
    const seccion = document.querySelector(".error");

    if (barra && seccion) {
        const alturaNavbar = barra.offsetHeight;
        const alturaViewport = window.innerHeight;
        seccion.style.height = (alturaViewport - alturaNavbar) + "px";
        seccion.style.minHeight = (alturaViewport - alturaNavbar) + "px";
    }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener("load", ajustarAltura404);
if (!isTouchDevice()) {
    window.addEventListener("resize", ajustarAltura404);
}