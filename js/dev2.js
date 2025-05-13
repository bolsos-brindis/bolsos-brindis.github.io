function ajustarAlturaSobreNosotros() {
    const barra = document.getElementById("barraNavegacion");
    const seccion = document.querySelector(".sobre-nosotros");

    if (barra && seccion) {
        const alturaNavbar = barra.offsetHeight;
        const alturaViewport = window.innerHeight;
        seccion.style.height = (alturaViewport - alturaNavbar) + "px";
        seccion.style.minHeight = (alturaViewport - alturaNavbar) + "px";
    }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener("load", ajustarAlturaSobreNosotros);
if (!isTouchDevice()) {
    window.addEventListener("resize", ajustarAlturaSobreNosotros);
}