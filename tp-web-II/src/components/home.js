import { LitElement, html } from "lit";
import { getProducts, getCategories, pictureURL } from "../api.js";
import "/placeholder.svg";
import "../index.css";

export class HomeView extends LitElement {
  createRenderRoot() {
    return this;
  }
  static properties = {
    products: { state: true },
    categories: { state: true },
    loading: { state: true },
    error: { state: true },
  };
  constructor() {
    super();
    this.products = [];
    this.categories = [];
    this.loading = false;
    this.error = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this.#load();
  }
  async #load() {
  this.loading = true;
  this.error = null;
  try {
    this.categories = await getCategories();
    const all = await getProducts();
    this.products = all.filter((p) =>
      (p.tags || []).some((t) =>
        ["promoción", "orgánico", "producto local"].includes(
          t.title.toLowerCase()
        )
      )
    );
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
        <h1 class="text-3xl font-bold text-green-700">Bienvenido</h1>
      </div>

        <h2 class="mb-3 text-lg font-bold text-green-700">Categorías</h2>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          ${this.categories.map((c) => html`
            <a href="/listado.html?categoria=${c.id}"
               class="flex flex-col items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-center transition hover:border-green-400 hover:shadow-md">
              <img src="${pictureURL(c.picture)}" class="h-16 w-16 rounded-full" alt="${c.title}">
              <span class="text-sm font-semibold text-green-900">${c.title}</span>
            </a>
          `)}
        </div>

        <h2 class="mt-10 mb-3 text-lg font-bold text-green-700">Productos destacados</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
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

customElements.define("home-view", HomeView);