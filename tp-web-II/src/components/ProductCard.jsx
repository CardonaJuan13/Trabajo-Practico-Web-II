import { pictureURL } from "../api.js";
import { addItem, formatPrice } from "/data/cart.js";

export default function ProductCard({ product }) {
  const picture = pictureURL(product.pictures?.[0]);
  return (
    <article className="flex flex-col rounded-2xl border border-green-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <img src={picture} alt={product.title} className="h-40 w-full rounded-xl object-cover" />
      <h3 className="mt-2 text-sm font-semibold text-gray-800">{product.title}</h3>
      <p className="mt-1 text-lg font-bold text-green-700">{formatPrice(product.price)}</p>
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <a
          href={`/ficha.html?producto=${product.id}`}
          className="rounded-lg border border-green-600 px-3 py-1.5 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50"
        >
          Ver más
        </a>
        <button
          onClick={() => addItem(product, picture)}
          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
