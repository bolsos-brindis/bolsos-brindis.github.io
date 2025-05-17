class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
            <div id="contenedorFooter" class="contenedor">
                <div class="footer-contenedor">
                    <!-- Redes Sociales -->
                    <nav class="footer-bloque footer-social">
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/itsbrindis">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path
                                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@davante_medac">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path
                                            d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://es.pinterest.com/">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path
                                            d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <!-- Enlaces -->
                    <nav class="footer-bloque footer-enlaces">
                        <ul>
                            <li><a href="/html/about/contacto.html">contacto</a></li>
                            <li><a href="/html/about/faq.html">faq</a></li>
                            <li><a href="/html/about/sobre-nosotros.html">about</a></li>
                            <li><a href="/index.html" data-scroll="#marquee">diseños</a></li>
                        </ul>
                    </nav>

                    <!-- Legal -->
                    <nav class="footer-bloque footer-legal">
                        <ul>
                            <li><a href="/html/legal/politica-privacidad.html">política de privacidad</a></li>
                            <li><a href="/html/legal/politica-cookies.html">cookies</a></li>
                            <li><a href="/html/legal/condiciones-venta.html">condiciones de venta</a></li>
                        </ul>
                    </nav>
                </div>

                <!-- Derechos de Autor -->
                <div class="footer-copyright">
                    © 2025 brindis
                </div>
            </div>
        `;
    }
}

customElements.define('brindis-footer', Footer);