import { useCart, setQty, removeItem, clearCart, formatPrice } from "/data/cart.js";

export default function Carrito() {
  const { items, total } = useCart();

  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl font-bold text-green-800">Tu carrito</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Tu carrito está vacío.</p>
            <a
              href="#/listado"
              className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Ver productos
            </a>
          </div>
        ) : (
          <>
            <ul className="mt-6 flex flex-col gap-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex items-center gap-4 rounded-2xl border border-green-200 bg-white p-3 shadow-sm"
                >
                  <img src={i.picture} alt={i.title} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold text-gray-800">{i.title}</h2>
                    <p className="text-sm text-gray-500">{formatPrice(i.price)} c/u</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Restar uno"
                        onClick={() => setQty(i.id, i.qty - 1)}
                        className="h-7 w-7 rounded-lg border border-green-200 font-bold text-green-800 hover:bg-green-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button
                        aria-label="Sumar uno"
                        onClick={() => setQty(i.id, i.qty + 1)}
                        className="h-7 w-7 rounded-lg border border-green-200 font-bold text-green-800 hover:bg-green-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-green-700">{formatPrice(i.price * i.qty)}</p>
                    <button
                      onClick={() => removeItem(i.id)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <span className="text-lg font-semibold text-green-900">Total</span>
              <strong className="text-2xl text-green-700">{formatPrice(total)}</strong>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={clearCart}
                className="rounded-lg border border-green-200 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-50"
              >
                Vaciar carrito
              </button>
              <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
