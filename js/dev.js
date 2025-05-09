const carrusel = document.querySelector('.carrusel-principal');
const miniaturas = document.querySelectorAll('.barra-imagenes img');

// Configuración drag
let isDragging = false;
let startX = 0;
let scrollStart = 0;

carrusel.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  scrollStart = carrusel.scrollLeft;
  carrusel.classList.add('dragging');
});

carrusel.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = e.clientX;
  const walk = (x - startX) * 1.2; // sensibilidad
  carrusel.scrollLeft = scrollStart - walk;
});

carrusel.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  carrusel.classList.remove('dragging');
  snapToClosest();
});

carrusel.addEventListener('mouseleave', () => {
  if (!isDragging) return;
  isDragging = false;
  carrusel.classList.remove('dragging');
  snapToClosest();
});

// Evita selección de texto e imágenes
carrusel.addEventListener('dragstart', (e) => e.preventDefault());
carrusel.addEventListener('click', (e) => {
  if (isDragging) e.preventDefault();
});

// Snap al más cercano
function snapToClosest() {
  const slideWidth = carrusel.offsetWidth;
  const index = Math.round(carrusel.scrollLeft / slideWidth);
  carrusel.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth'
  });
}

// Miniaturas: scroll directo
miniaturas.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    carrusel.scrollTo({
      left: carrusel.offsetWidth * index,
      behavior: 'smooth'
    });
  });
});
