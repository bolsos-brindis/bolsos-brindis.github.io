class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /* html */ `
            <nav id="barraNavegacion" class="barra-navegacion">
                <!-- Parte Izquierda -->
                <div class="barra-navegacion-izquierda">
                    <ul class="barra-navegacion-izquierda-movil">
                        <li>
                            <button id="botonHamburguesa" class="boton-hamburguesa" type="button"
                                aria-label="Abrir menú lateral" aria-expanded="false" aria-controls="menuLateral">
                                <svg id="iconoHamburguesa" class="icono" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" fill="none">
                                    <rect class="linea superior" x="1" y="4.25" width="22" height="1.5" rx="0"
                                        fill="currentColor" />
                                    <rect class="linea central" x="1" y="11.25" width="22" height="1.5" rx="0"
                                        fill="currentColor" />
                                    <rect class="linea inferior" x="1" y="18.25" width="22" height="1.5" rx="0"
                                        fill="currentColor" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button type="button" aria-label="Acceder a la cuenta">
                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497"
                                        stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                    <ul class="barra-navegacion-izquierda-escritorio">
                        <li><a href="/index.html" data-scroll="#marquee">diseños</a></li>
                        <li><a href="/html/about/como-funciona.html">cómo funciona</a></li>
                        <li><a href="/html/about/sobre-nosotros.html">about</a></li>
                        <li><a href="/index.html" data-scroll="#blog">blog</a></li>
                    </ul>
                </div>

                <!-- Logo -->
                <div class="logo no-seleccionar">
                    <h1><a href="/index.html">BRINDIS</a></h1>
                </div>

                <!-- Parte Derecha -->
                <div class="barra-navegacion-derecha">
                    <ul class="barra-navegacion-acciones">
                        <li>
                            <button type="button" aria-label="Favoritos">
                                <svg class="icono icono-favoritos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
                                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2">
                                    <path
                                        d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
                                </svg>
                            </button>
                        </li>
                        <li class="boton-cuenta">
                            <button type="button" aria-label="Acceder a la cuenta">
                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497"
                                        stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <button id="botonAbrirCesta" type="button" aria-label="Abrir la cesta de la compra">
                                <svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M4.75 8.25A.75.75 0 0 0 4 9L3 19.125c0 1.418 1.207 2.625 2.625 2.625h12.75c1.418 0 2.625-1.149 2.625-2.566L20 9a.75.75 0 0 0-.75-.75H4.75Zm2.75 0v-1.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5v1.5"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            

            <aside id="menuLateral" class="menu-lateral">
                <div class="menu-lateral-contenedor">
                    <nav>
                        <ul>
                            <li><a href="/index.html" data-scroll="#marquee"><span>diseños</span></a></li>
                            <li><a href="/html/about/como-funciona.html"><span>cómo funciona</span></a></li>
                            <li><a href="/html/about/sobre-nosotros.html"><span>about</span></a></li>
                            <li><a href="/index.html" data-scroll="#blog"><span>blog</span></a></li>
                        </ul>
                    </nav>
                    <p class="menu-lateral-eslogan">
                        <span class="eslogan-contenedor">
                            <svg class="estrella estrella-izquierda" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M6.512.563A.527.527 0 0 1 7.26.047a.53.53 0 0 1 .308.52c-.009 1.466-.008 2.529.08 3.314.088.792.257 1.22.515 1.479.26.26.686.434 1.479.534.788.098 1.857.116 3.334.13a.527.527 0 0 1 .37.897.528.528 0 0 1-.373.154h-.002c-1.477-.009-2.547-.008-3.337.08-.793.088-1.22.257-1.48.516-.262.26-.436.687-.536 1.478-.098.785-.116 1.85-.13 3.32a.523.523 0 0 1-.537.53.527.527 0 0 1-.52-.525v-.002c.008-1.475.008-2.543-.08-3.331-.088-.793-.257-1.22-.516-1.479-.26-.261-.689-.435-1.48-.535-.789-.1-1.858-.116-3.334-.13h-.004a.527.527 0 0 1 .01-1.054h.002c1.477.01 2.547.009 3.337-.079.793-.088 1.22-.256 1.481-.514.261-.259.435-.685.535-1.477.098-.784.116-1.846.13-3.31Zm.446 12.049.006-.135v-.002h-.005v.137Zm0-.137h.006l.01-.251h-.016v.25Zm.03-4.996c.11-.207.245-.39.409-.553.165-.164.352-.296.561-.405a2.294 2.294 0 0 1-.554-.41 2.296 2.296 0 0 1-.403-.559c-.111.207-.246.392-.412.555a2.296 2.296 0 0 1-.56.403c.208.11.393.246.556.411.163.165.295.35.403.558Z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            <span class="eslogan-texto">diseños con la mezcla perfecta</span>
                            <svg class="estrella estrella-derecha" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M6.512.563A.527.527 0 0 1 7.26.047a.53.53 0 0 1 .308.52c-.009 1.466-.008 2.529.08 3.314.088.792.257 1.22.515 1.479.26.26.686.434 1.479.534.788.098 1.857.116 3.334.13a.527.527 0 0 1 .37.897.528.528 0 0 1-.373.154h-.002c-1.477-.009-2.547-.008-3.337.08-.793.088-1.22.257-1.48.516-.262.26-.436.687-.536 1.478-.098.785-.116 1.85-.13 3.32a.523.523 0 0 1-.537.53.527.527 0 0 1-.52-.525v-.002c.008-1.475.008-2.543-.08-3.331-.088-.793-.257-1.22-.516-1.479-.26-.261-.689-.435-1.48-.535-.789-.1-1.858-.116-3.334-.13h-.004a.527.527 0 0 1 .01-1.054h.002c1.477.01 2.547.009 3.337-.079.793-.088 1.22-.256 1.481-.514.261-.259.435-.685.535-1.477.098-.784.116-1.846.13-3.31Zm.446 12.049.006-.135v-.002h-.005v.137Zm0-.137h.006l.01-.251h-.016v.25Zm.03-4.996c.11-.207.245-.39.409-.553.165-.164.352-.296.561-.405a2.294 2.294 0 0 1-.554-.41 2.296 2.296 0 0 1-.403-.559c-.111.207-.246.392-.412.555a2.296 2.296 0 0 1-.56.403c.208.11.393.246.556.411.163.165.295.35.403.558Z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </span>
                    </p>
                </div>
            </aside>
        `;
    }
}

customElements.define('brindis-header', Header);