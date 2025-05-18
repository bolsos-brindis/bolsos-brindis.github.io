class Newsletter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.innerHTML = /* html */ `
            <div class="fondo-newsletter"></div>
            <aside class="modal-newsletter">
                <div class="modal-contenedor">
                    <div class="newsletter-imagen">
                        <img src="/dev/assets/newsletter.avif">
                    </div>
                    <div class="newsletter-contenido">
                        <h2>10% de descuento<br /><span class="newsletter-subtitulo">en tu primera compra</span></h2>
                        <h3>Solo por tiempo limitado</h3>
                        <p class="newsletter-mensaje">
                            Suscríbete para recibir tu <strong>descuento de primera compra</strong>. Además, disfruta de
                            <strong>accesos exclusivos</strong> y
                            <strong>ofertas únicas</strong>.
                        </p>
                        <form class="modal-newsletter-formulario">
                            <div class="newsletter-nombre">
                                <label for="newsletterInputNombre">nombre</label>
                                <input id="newsletterInputNombre" class="newsletter-nombre" name="nombre" type="text"
                                    placeholder="nombre" required />
                            </div>
                            <div class="newsletter-correo">
                                <label for="newsletterInputCorreo">email</label>
                                <input id="newsletterInputCorreo" class="newsletter-correo" name="correo" type="email"
                                    placeholder="correo" required />
                            </div>
                            <button class="cta2" type="submit">¡lo quiero!</button>
                        </form>
                        <p class="newsletter-legal">Al suscribirte, aceptas nuestra <a class="underline"
                                href="/html/legal/politica-privacidad.html">Política de Privacidad</a>. Puedes
                            darte de baja en cualquier momento.</p>
                    </div>
                </div>
            </aside>
        `;
    }

    addEventListeners() {
        // Cerrar al hacer click fuera del modal-contenedor
        this.querySelector('.modal-newsletter').addEventListener('click', (e) => {
            // Solo cerrar si el click es directamente en el fondo (no dentro del contenedor)
            if (e.target === this.querySelector('.modal-newsletter')) {
                this.cerrar();
            }
        });

        // Cerrar al enviar el formulario (puedes personalizar el comportamiento)
        this.querySelector('.modal-newsletter-formulario').addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí puedes añadir lógica para enviar el formulario por AJAX si lo deseas
            this.cerrar();
        });
    }

    cerrar() {
        this.style.display = 'none';
    }
}

customElements.define('brindis-newsletter', Newsletter);

// === Lógica para mostrar el modal solo una vez por sesión, 5s después del primer scroll ===

let newsletterTimeout;
let newsletterScrollDetectado = false;

function mostrarNewsletter() {
    if (sessionStorage.getItem('newsletterBrindisMostrada')) return;
    if (!document.querySelector('brindis-newsletter')) {
        document.body.insertAdjacentHTML('beforeend', '<brindis-newsletter></brindis-newsletter>');
    }
    sessionStorage.setItem('newsletterBrindisMostrada', 'true');
}

function onFirstScroll() {
    if (newsletterScrollDetectado) return;
    newsletterScrollDetectado = true;
    newsletterTimeout = setTimeout(mostrarNewsletter, 5000);
    window.removeEventListener('scroll', onFirstScroll);
}

if (!sessionStorage.getItem('newsletterBrindisMostrada')) {
    window.addEventListener('scroll', onFirstScroll, { passive: true });
}
