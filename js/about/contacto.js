const formulario = document.querySelector('.contacto-formulario');
const modal = document.getElementById('contactoModal');
const inputNombre = document.getElementById('contactoInputNombre');
const inputCorreo = document.getElementById('contactoInputEmail');
const inputMensaje = document.getElementById('contactoInputMensaje');
const spanNombre = document.getElementById('nombreMostrado');
const botonEnviar = document.getElementById('contactoBotonEnviar');

formulario.addEventListener('submit', (e) => {
    console.log("xd");
    e.preventDefault();

    const nombre = inputNombre.value.trim().toLowerCase();
    if (!nombre) return;

    spanNombre.textContent = nombre;
    modal.classList.add('activo');

    inputNombre.disabled = true;
    inputCorreo.disabled = true;
    inputMensaje.disabled = true;
    botonEnviar.disabled = true;
    botonEnviar.textContent = "enviado";
    // botonEnviar.style.backgroundColor = "transparent";
    // botonEnviar.style.color = "#393939";
    botonEnviar.style.pointerEvents = "none";

    // Ocultar el modal después de 3 segundos
    // setTimeout(() => {
    //     modal.classList.remove('activo');
    // }, 3000);
});
