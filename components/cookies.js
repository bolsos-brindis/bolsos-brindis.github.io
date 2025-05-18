class Cookies extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Solo mostrar si no ha aparecido ya
        if (!localStorage.getItem('cookiesBrindisMostrado')) {
            this.render();
            this.addEventListeners();
        } else {
            this.style.display = 'none';
        }
    }

    render() {
        this.innerHTML = /* html */ `
            <div class="fondo-cookies"></div>
            <aside class="modal-cookies">
                <div class="cookies-informacion">
                    <h2>Valoramos tu privacidad</h2>
                    <p>Utilizamos cookies y otras tecnologías para personalizar tu experiencia, para fines de marketing y recopilar análisis. Más información en la <a class="underline" href="/html/legal/politica-privacidad.html">Política de Privacidad</a>
                    </p>
                </div>
                <div class="cookies-botones">
                    <button class="cta2 cookies-aceptar" type="button">Aceptar</button>
                    <button class="cta2 cookies-rechazar" type="button">Rechazar</button>
                </div>
            </aside>           
        `;
    }

    addEventListeners() {
        this.querySelector('.cookies-aceptar').addEventListener('click', () => this.cerrar('aceptado'));
        this.querySelector('.cookies-rechazar').addEventListener('click', () => this.cerrar('rechazado'));
        // Ya NO se puede cerrar al hacer click en el fondo
    }

    cerrar(valor) {
        localStorage.setItem('cookiesBrindisMostrado', valor); // Guarda si se aceptó o rechazó
        this.style.display = 'none';
    }
}

customElements.define('brindis-cookies', Cookies);
