import { useEffect, useState } from "react";
import { obtenerProductos, urlImagen } from "../api.js";
import { agregarAlCarrito, useCarrito, formatearPrecio } from "../../data/cart.js";

export default function Ficha({ id }) {
  const { articulos } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [seleccionada, setSeleccionada] = useState(0);

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      try {
        const todos = await obtenerProductos();
        if (cancelado) return;
        setProducto(todos.find((candidato) => String(candidato.id) === String(id)) ?? null);
      } catch (falla) {
        if (!cancelado) setError(falla.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, [id]);

  const enlaceVolver = (
    <a href="./#/listado" className="text-sm font-semibold text-beige-700 hover:underline">
      ← Volver a productos
    </a>
  );

  if (cargando) return <p className="py-16 text-center text-beige-700">Cargando…</p>;
  if (error) return <p className="py-16 text-center text-red-600">Error: {error}</p>;
  if (!producto)
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="mb-4 text-beige-700">No encontramos ese producto.</p>
        {enlaceVolver}
      </main>
    );

  const imagenes = producto.pictures?.length ? producto.pictures : [null];
  const imagenPrincipal = urlImagen(imagenes[seleccionada] ?? imagenes[0]);
  const enCarrito = articulos.find((articulo) => articulo.id === producto.id)?.cantidad ?? 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {enlaceVolver}
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={imagenPrincipal}
            alt={producto.title}
            className="aspect-square w-full rounded-2xl border border-beige-300 object-cover"
          />
          {imagenes.length > 1 && (
            <div className="mt-3 flex gap-2">
              {imagenes.map((imagen, indice) => (
                <button key={indice} onClick={() => setSeleccionada(indice)} aria-label={`Ver imagen ${indice + 1}`}>
                  <img
                    src={urlImagen(imagen)}
                    alt=""
                    className={`h-16 w-16 rounded-lg object-cover ${
                      indice === seleccionada ? "ring-2 ring-beige-600" : "opacity-70 hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {producto.category && (
            <a
              href={`./#/listado?categoria=${producto.category_id}`}
              className="w-fit rounded-full bg-beige-200 px-3 py-1 text-xs font-semibold text-beige-800 hover:bg-beige-300"
            >
              {producto.category.title}
            </a>
          )}
          <h1 className="text-3xl font-bold text-beige-900">{producto.title}</h1>
          <p className="text-3xl font-bold text-beige-700">{formatearPrecio(producto.price)}</p>

          {producto.tags?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {producto.tags.map((etiqueta) => (
                <li
                  key={etiqueta.id ?? etiqueta.title}
                  className="rounded-full border border-beige-300 px-3 py-1 text-xs text-beige-800"
                >
                  {etiqueta.title}
                </li>
              ))}
            </ul>
          )}

          <p className="text-beige-800">{producto.description}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => agregarAlCarrito(producto, imagenPrincipal)}
              className="rounded-lg bg-beige-600 px-6 py-3 font-semibold text-white transition hover:bg-beige-700"
            >
              Agregar al carrito
            </button>
            {enCarrito > 0 && (
              <a href="./#/carrito" className="text-sm font-semibold text-beige-700 hover:underline">
                En tu carrito: {enCarrito} · Ver carrito
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
