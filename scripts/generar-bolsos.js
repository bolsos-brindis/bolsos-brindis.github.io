const fs = require("fs");
const path = require("path");

// Directorios base
const directorioActual = __dirname;
const directorioRaiz = path.join(directorioActual, "..");

// Rutas
const rutaInventario = path.join(directorioRaiz, "data", "bolsos.json");
const rutaPlantilla = path.join(directorioRaiz, "templates", "bolso-template.html");
const rutaSalida = path.join(directorioRaiz, "out", "bolsos");

// Crear carpeta si no existe
if (!fs.existsSync(rutaSalida)) {
  fs.mkdirSync(rutaSalida, { recursive: true });
}

// Cargar datos
const inventario = JSON.parse(fs.readFileSync(rutaInventario, "utf8"));
const plantilla = fs.readFileSync(rutaPlantilla, "utf8");

// Recorrer productos
inventario.forEach(producto => {
  const { sku, nombre, tagline, descripcion, precio, colores, medidas } = producto;

  // Recorrer colores
  colores.forEach(color => {
    const { nombre: nombreColor, codigo, estrellas, reviews, descripcion_color } = color;
    const skuColor = `${sku}-${nombreColor}`;

    // Generar HTML de título (meta)
    const tituloPaginaHTML = `${nombre} (${nombreColor})`;

    // Generar HTML de colores
    const coloresHTML = colores.map(c => {
      const activo = c.nombre === nombreColor ? "activo" : "";
      const href = c.nombre === nombreColor ? "#" : `/html/bolsos/${sku}-${c.nombre}.html`;
      return /*html*/ `
        <div class="producto-color ${activo}" style="background-color: ${c.codigo};" title="${c.nombre}">
          <a href="${href}"></a>
        </div>
      `;
    }).join("");

    // Generar HTML de medidas
    const medidasHTML = medidas.join("\n");

    // Generar HTML de estrellas
    const estrellaSVG = /*html*/ `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16" height="16">
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 
        51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 
        113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 
        128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 
        12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 
        7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        fill="currentColor" />
      </svg>
    `;
    const estrellasHTML = Array(estrellas).fill(estrellaSVG).join("");

    // Formatear precio como "120,00 €"
    const precioFormateado = `${precio.toFixed(2).replace(".", ",")} €`;

    // Combinar descripciones
    const descripcionHTML = `
      <p>${descripcion}</p>
      <p>${descripcion_color}</p>
    `;

    // Reemplazar en plantilla
    let paginaHTML = plantilla
      .replace(/{{titulo-pagina}}/g, tituloPaginaHTML)
      .replace(/{{sku}}/g, sku)
      .replace(/{{nombre}}/g, nombre)
      .replace(/{{tagline}}/g, tagline)
      .replace(/{{reviews-estrellas}}/g, estrellasHTML)
      .replace(/{{reviews-cantidad}}/g, reviews)
      .replace(/{{precio}}/g, precioFormateado)
      .replace(/{{color-bolso}}/g, nombreColor)
      .replace(/{{colores}}/g, coloresHTML)
      .replace(/{{descripcion}}/g, descripcionHTML)
      .replace(/{{medidas}}/g, medidasHTML);

    // Guardar archivo
    const rutaArchivo = path.join(rutaSalida, `${skuColor}.html`);
    fs.writeFileSync(rutaArchivo, paginaHTML, "utf8");
    console.log(`👜 Página generada: ${rutaArchivo}`);
  });
});
