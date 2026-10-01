import { urlImagen } from "../api.js";
import { agregarAlCarrito, formatearPrecio } from "../../data/cart.js";

export default function TarjetaProducto({ producto }) {
  const imagen = urlImagen(producto.pictures?.[0]);
  return (
    <article className="flex flex-col rounded-2xl border border-beige-300 bg-beige-50 p-3 shadow-sm transition hover:shadow-md">
      <img src={imagen} alt={producto.title} className="h-40 w-full rounded-xl object-cover" />
      <h3 className="mt-2 text-sm font-semibold text-beige-900">{producto.title}</h3>
      {producto.tags?.length > 0 && (
        <ul className="mt-1 flex flex-wrap gap-1">
          {producto.tags.map((etiqueta) => (
            <li
              key={etiqueta.id ?? etiqueta.title}
              className="rounded-full bg-beige-200 px-2 py-0.5 text-xs font-semibold text-beige-800"
            >
              {etiqueta.title}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-1 text-lg font-bold text-beige-700">{formatearPrecio(producto.price)}</p>
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <a
          href={`ficha.html?producto=${producto.id}`}
          className="rounded-lg border border-beige-600 px-3 py-1.5 text-center text-sm font-semibold text-beige-700 transition hover:bg-beige-200"
        >
          Ver más
        </a>
        <button
          onClick={() => agregarAlCarrito(producto, imagen)}
          className="rounded-lg bg-beige-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-beige-700"
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
