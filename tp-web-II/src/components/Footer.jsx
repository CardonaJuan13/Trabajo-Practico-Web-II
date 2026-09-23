// Editá estos datos con los de tu tienda
const INFORMACION = {
  nombre: "Tu Tienda de Muebles",
  descripcion: "Muebles para cada ambiente de tu hogar: living, comedor, dormitorio y oficina.",
  correo: "contacto@tutienda.com",
  telefono: "+54 11 0000-0000",
  horario: "Lunes a viernes de 9 a 18 hs",
};

export default function PiePagina() {
  return (
    <footer className="mt-12 border-t border-beige-300 bg-beige-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-beige-800">{INFORMACION.nombre}</h2>
          <p className="mt-2 text-sm text-beige-800">{INFORMACION.descripcion}</p>
        </div>

        <nav aria-label="Navegación del pie de página">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-beige-800">Navegación</h3>
          <ul className="mt-2 space-y-1 text-sm text-beige-800">
            <li><a href="./#/" className="hover:text-beige-700 hover:underline">Inicio</a></li>
            <li><a href="./#/listado" className="hover:text-beige-700 hover:underline">Productos</a></li>
            <li><a href="./#/carrito" className="hover:text-beige-700 hover:underline">Carrito</a></li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-beige-800">Contacto</h3>
          <ul className="mt-2 space-y-1 text-sm text-beige-800">
            <li>{INFORMACION.correo}</li>
            <li>{INFORMACION.telefono}</li>
            <li>{INFORMACION.horario}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-beige-300 py-3 text-center text-xs text-beige-700">
        © {new Date().getFullYear()} {INFORMACION.nombre}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
