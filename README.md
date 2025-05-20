# Brindis – Tienda online de bolsos con carga inalámbrica

Este repositorio contiene el código fuente de **Brindis**, una tienda online de bolsos con carga inalámbrica desarrollada como proyecto académico para el centro MEDAC. El objetivo es ofrecer una web profesional, funcional y bien estructurada, aplicando buenas prácticas de desarrollo web, automatización y experiencia de usuario.

## 📂 Estructura del repositorio
```
/
├── assets/
│ ├── fonts/
│ ├── images/
│ ├── meta/
│ ├── video/
│ └── icons.html
├── components/
│ ├── cookies.js
│ ├── footer.js
│ ├── header.js
│ └── newsletter.js
├── css/
├── data/
│ └── bolsos.json
├── dev/
├── html/
├── js/
├── out/
├── scripts/
├── templates/
├── 404.html
├── dev.html
├── index.html
└── README.md
```

## 🌱 Flujo de trabajo y ramas

- **`main`**  
  Rama principal asociada a la versión de producción. Todo el contenido en esta rama se despliega automáticamente mediante Github Pages y es accesible públicamente como la web oficial de Brindis.

- **`dev`**  
  Rama de desarrollo donde se implementan y prueban nuevas funcionalidades. Aquí se trabaja en un entorno controlado antes de fusionar los cambios en producción.

### Entorno de desarrollo

- Las nuevas funcionalidades y páginas se desarrollan inicialmente en `dev.html` y en la carpeta `dev/`, agrupando recursos temporales y pruebas.
- Los componentes reutilizables se encuentran en la carpeta `/components`.
- Los recursos estáticos y de marca se almacenan en `/assets`.

### Generación automática de páginas

- El archivo `data/bolsos.json` contiene la información de todos los productos.
- Un script automatiza la generación de páginas de producto, creando los archivos correspondientes en la carpeta `/out/` para su revisión manual antes de integrarlas en producción.

## 🚀 Despliegue

- El despliegue se realiza automáticamente desde la rama `main` mediante Github Pages.
- Solo se fusionan en `main` las funcionalidades y páginas que han superado las pruebas técnicas y de integración en `dev`.

## 🧪 Pruebas y validación

- El flujo de trabajo incluye pruebas unitarias, de integración y de regresión para asegurar la calidad y estabilidad del sitio.
- Se han realizado pruebas con usuarios reales y se ha recogido feedback continuo para mejorar la experiencia y el rendimiento de la web.

## 👀 Cómo revisar el proyecto

Si quieres consultar el código fuente, analizar la estructura o probar el proyecto localmente, puedes clonar este repositorio:

```git clone https://github.com/bolsos-brindis/bolsos-brindis.github.io.git```

Puedes explorar las distintas ramas y carpetas para ver cómo se organiza el desarrollo, cómo se automatiza la generación de páginas de producto y cómo se estructura el código para facilitar el mantenimiento y la escalabilidad.