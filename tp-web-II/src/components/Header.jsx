import { useCart } from "/data/cart.js";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="border-b border-green-200 bg-green-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <a href="#/" className="text-xl font-bold text-green-700">
            Inicio
          </a>
          <a href="#/listado" className="text-sm font-semibold text-green-800 hover:underline"> Productos</a>
        </div>
        <a href="#/carrito" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-800 shadow-sm transition hover:bg-green-100">Carrito ({count}) </a>
      </nav>
    </header>
  );
}
