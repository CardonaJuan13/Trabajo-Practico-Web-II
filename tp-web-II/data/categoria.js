import { LitElement, html } from "lit";
import { obtenerProductos, obtenerCategorias, urlImagen } from "../src/api.js";
import "../src/index.css";

export class VistaCategoria extends LitElement {
  createRenderRoot() {
    return this;
  }
  static properties = {
    idCategoria: { state: true },
    productos: { state: true },
    categoria: { state: true },
    cargando: { state: true },
    error: { state: true },
  };
  constructor() {
    super();
    this.idCategoria = null;
    this.productos = [];
    this.categoria = null;
    this.cargando = false;
    this.error = null;
  }
  connectedCallback() {
    super.connectedCallback();
    const parametros = new URLSearchParams(window.location.search);
    this.idCategoria = parametros.get("categoria");
    this.#cargar();
  }
  async #cargar() {
  this.cargando = true;
  this.error = null;
  try {
    const todos = await obtenerProductos();
    this.productos = todos.filter(
      (producto) => String(producto.category_id) === String(this.idCategoria)
    );
    const categorias = await obtenerCategorias();
    this.categoria = categorias.find((categoria) => String(categoria.id) === String(this.idCategoria));
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
          <span class="text-3xl font-medium text-beige-700"><strong>Supermercado</strong></span>
          <a href="/index.html" class="inline-flex items-center gap-2 rounded-lg bg-beige-50 px-4 py-2 text-sm font-semibold text-beige-800 shadow-sm transition hover:bg-beige-200">
          Volver a inicio
          </a>
        </div>
        <h1 class="text-3xl font-bold text-beige-800">
          ${this.categoria?.title ?? "Categoría"}
        </h1>
        <p class="mt-1 text-sm text-beige-700">${this.productos.length} productos</p>

        <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
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

customElements.define("vista-categoria", VistaCategoria);