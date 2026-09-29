import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../api.js";
import { navigate } from "../router.js";
import ProductCard from "./ProductCard.jsx";

export default function Listado({ categoryId = null }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [prods, cats] = await Promise.all([getProducts(), getCategories()]);
        if (cancelled) return;
        setProducts(prods);
        setCategories(cats);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function selectCategory(id) {
    navigate(id ? `/listado?categoria=${id}` : "/listado");
  }

  const visible = categoryId
    ? products.filter((p) => String(p.category_id) === String(categoryId))
    : products;

  const chip = (active) =>
    `rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
      active
        ? "border-green-600 bg-green-600 text-white"
        : "border-green-200 bg-white text-green-800 hover:bg-green-50"
    }`;

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-bold text-green-800">Productos</h1>

        {loading && <p className="py-16 text-center text-gray-500">Cargando…</p>}
        {error && <p className="py-16 text-center text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className={chip(!categoryId)} onClick={() => selectCategory(null)}>
                Todas
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={chip(String(c.id) === String(categoryId))}
                  onClick={() => selectCategory(c.id)}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">{visible.length} productos</p>

            {visible.length === 0 ? (
              <p className="py-16 text-center text-gray-500">No hay productos en esta categoría.</p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
