function ajustarAlturaSobreNosotros() {
    const barra = document.getElementById("barraNavegacion");
    const seccion = document.querySelector(".sobre-nosotros");

    if (barra && seccion) {
        const alturaNavbar = barra.offsetHeight;
        const alturaViewport = window.innerHeight;
        const mediaQuery = window.matchMedia("(max-width: 900px)");

        let ajuste = mediaQuery.matches ? 0 : 16;

        seccion.style.height = (alturaViewport - alturaNavbar - ajuste) + "px";
        seccion.style.minHeight = (alturaViewport - alturaNavbar - ajuste) + "px";
    }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener("load", ajustarAlturaSobreNosotros);
if (!isTouchDevice()) {
    window.addEventListener("resize", ajustarAlturaSobreNosotros);
}