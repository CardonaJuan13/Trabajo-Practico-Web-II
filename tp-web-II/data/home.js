import { LitElement, html } from "lit";
import { obtenerProductos, obtenerCategorias, urlImagen } from "../src/api.js";
import "../src/index.css";

export class VistaInicio extends LitElement {
  createRenderRoot() {
    return this;
  }
  static properties = {
    productos: { state: true },
    categorias: { state: true },
    cargando: { state: true },
    error: { state: true },
  };
  constructor() {
    super();
    this.productos = [];
    this.categorias = [];
    this.cargando = false;
    this.error = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this.#cargar();
  }
  async #cargar() {
    this.cargando = true;
    this.error = null;
    try {
      this.categorias = await obtenerCategorias();
      const todos = await obtenerProductos();
      this.productos = todos.filter((producto) =>
        (producto.tags || []).some((etiqueta) => etiqueta.title.toLowerCase() === "destacado")
      );
    } catch (falla) {
      this.error = falla.message;
    } finally {
      this.cargando = false;
    }
  }

  render() {
    return html`
    ${this.cargando
      ? html`<p class="py-16 text-center text-beige-700">Cargando…</p>`
      : this.error
        ? html`<p class="py-16 text-center text-red-600">Error: ${this.error}</p>`
        : html`
      <main class="mx-auto max-w-7xl px-4 py-6">
      <div class="mb-6 flex items-center justify-between rounded-xl border border-beige-300 bg-beige-50 px-4 py-3">
        <h1 class="text-3xl font-bold text-beige-700">Bienvenido</h1>
      </div>

        <h2 class="mb-3 text-lg font-bold text-beige-700">Categorías</h2>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          ${this.categorias.map((categoria) => html`
            <a href="#/listado?categoria=${categoria.id}"
               class="flex flex-col items-center gap-2 rounded-2xl border border-beige-300 bg-beige-50 p-4 text-center transition hover:border-beige-400 hover:shadow-md">
              <img src="${urlImagen(categoria.picture)}" class="h-16 w-16 rounded-full" alt="${categoria.title}">
              <span class="text-sm font-semibold text-beige-900">${categoria.title}</span>
            </a>
          `)}
        </div>

        <h2 class="mt-10 mb-3 text-lg font-bold text-beige-700">Productos destacados</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          ${this.productos.map((producto) => html`
            <article class="flex flex-col rounded-2xl border border-beige-300 bg-beige-50 p-3 shadow-sm transition hover:shadow-md">
              <img src="${urlImagen(producto.pictures?.[0])}"
                   class="h-40 w-full rounded-xl object-cover" alt="">
              <h3 class="mt-2 text-sm font-semibold text-beige-900">${producto.title}</h3>
              <p class="mt-1 text-lg font-bold text-beige-700">$${producto.price}</p>
              <a href="/ficha.html?producto=${producto.id}"
                 class="mt-2 text-center rounded-lg bg-beige-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-beige-700">
                Ver más
              </a>
            </article>
          `)}
        </div>
      </main>
    `}
  `;
  }
}

customElements.define("vista-inicio", VistaInicio);
