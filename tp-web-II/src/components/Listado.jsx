import { useEffect, useState } from "react";
import { obtenerProductos, obtenerCategorias } from "../api.js";
import { navegar } from "../router.js";
import TarjetaProducto from "./ProductCard.jsx";

export default function Listado({ idCategoria = null }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    async function cargar() {
      try {
        const [listaProductos, listaCategorias] = await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
        ]);
        if (cancelado) return;
        setProductos(listaProductos);
        setCategorias(listaCategorias);
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
  }, []);

  function seleccionarCategoria(id) {
    navegar(id ? `/listado?categoria=${id}` : "/listado");
  }

  const visibles = idCategoria
    ? productos.filter((producto) => String(producto.category_id) === String(idCategoria))
    : productos;

  const estiloBoton = (activo) =>
    `rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
      activo
        ? "border-beige-600 bg-beige-600 text-white"
        : "border-beige-300 bg-beige-50 text-beige-800 hover:bg-beige-200"
    }`;

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-bold text-beige-800">Productos</h1>

        {cargando && <p className="py-16 text-center text-beige-700">Cargando…</p>}
        {error && <p className="py-16 text-center text-red-600">Error: {error}</p>}

        {!cargando && !error && (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className={estiloBoton(!idCategoria)} onClick={() => seleccionarCategoria(null)}>
                Todas
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  className={estiloBoton(String(categoria.id) === String(idCategoria))}
                  onClick={() => seleccionarCategoria(categoria.id)}
                >
                  {categoria.title}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-beige-700">{visibles.length} productos</p>

            {visibles.length === 0 ? (
              <p className="py-16 text-center text-beige-700">No hay productos en esta categoría.</p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {visibles.map((producto) => (
                  <TarjetaProducto key={producto.id} producto={producto} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
