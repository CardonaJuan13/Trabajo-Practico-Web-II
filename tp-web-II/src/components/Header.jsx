import { useCarrito } from "../../data/cart.js";

export default function Encabezado() {
  const { cantidadTotal } = useCarrito();
  return (
    <header className="border-b border-beige-300 bg-beige-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <a href="./#/" className="text-xl font-bold text-beige-700">
            Inicio
          </a>
          <a href="./#/listado" className="text-sm font-semibold text-beige-800 hover:underline">
            Productos
          </a>
        </div>
        <a
          href="./#/carrito"
          className="rounded-lg bg-beige-50 px-4 py-2 text-sm font-semibold text-beige-800 shadow-sm transition hover:bg-beige-200"
        >
          Carrito ({cantidadTotal})
        </a>
      </nav>
    </header>
  );
}
