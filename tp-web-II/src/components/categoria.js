import { LitElement, html } from "lit";
import { getProducts, getCategories, pictureURL } from "../api.js";
import "../index.css";

export class CategoryView extends LitElement {
  createRenderRoot() {
    return this;
  }
  static properties = {
    categoryId: { state: true },
    products: { state: true },
    category: { state: true },
    loading: { state: true },
    error: { state: true },
  };
  constructor() {
    super();
    this.categoryId = null;
    this.products = [];
    this.category = null;
    this.loading = false;
    this.error = null;
  }
  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    this.categoryId = params.get("categoria");
    this.#load();
  }
  async #load() {
  this.loading = true;
  this.error = null;
  try {
    const all = await getProducts();
    this.products = all.filter(
      (p) => String(p.category_id) === String(this.categoryId)
    );
    const cats = await getCategories();
    this.category = cats.find((c) => String(c.id) === String(this.categoryId));
  } catch (e) {
    this.error = e.message;
  } finally {
    this.loading = false;
  }
}

  render() {
  return html`
    ${this.loading
      ? html`<p class="py-16 text-center text-gray-500">Cargando…</p>`
      : this.error
        ? html`<p class="py-16 text-center text-red-600">Error: ${this.error}</p>`
        : html`
      <main class="mx-auto max-w-7xl px-4 py-6">
        <div class="mb-6 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">
          <span class="text-3xl font-medium text-green-700"><strong>Supermercado</strong></span>
          <a href="/index.html" class="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-800 shadow-sm transition hover:bg-green-100">
          Volver a inicio
          </a>
        </div>
        <h1 class="text-3xl font-bold text-green-800">
          ${this.category?.title ?? "Categoría"}
        </h1>
        <p class="mt-1 text-sm text-gray-500">${this.products.length} productos</p>

        <div class="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          ${this.products.map((p) => html`
            <article class="flex flex-col rounded-2xl border border-green-200 bg-white p-3 shadow-sm transition hover:shadow-md">
              <img src="${pictureURL(p.pictures?.[0])}"
                   class="h-40 w-full rounded-xl object-cover" alt="">
              <h3 class="mt-2 text-sm font-semibold text-gray-800">${p.title}</h3>
              <p class="mt-1 text-lg font-bold text-green-700">$${p.price}</p>
              <a href="/ficha.html?producto=${p.id}"
                 class="mt-2 text-center rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700">
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

customElements.define("category-view", CategoryView);