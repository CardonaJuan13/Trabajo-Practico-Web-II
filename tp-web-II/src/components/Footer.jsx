const INFORMACION = {
  nombre: "MuebleMundo",
  descripcion: "Muebles de todas las variedades. Veni y aprovecha nuestras ofertas y los nuevos productos!!!",
  correo: "nose@gmail.com",
  telefono: "+54 9 2901 12345",
  horario: "Lunes a viernes de 08:00AM a 08:01AM ",
};

export default function PiePagina() {
  return (
    <footer className="mt-12 border-t border-beige-300 bg-beige-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-bold text-beige-800">{INFORMACION.nombre}</h2>
          <p className="mt-2 text-sm text-beige-800">{INFORMACION.descripcion}</p>
        </div>

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
