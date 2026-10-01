import Estructura from "./components/Layout.jsx";
import Inicio from "./components/Home.jsx";
import Listado from "./components/Listado.jsx";
import Carrito from "./components/carrito.jsx";
import { useRuta } from "./router.js";

function App() {
  const { ruta, parametros } = useRuta();

  let pagina;
  if (ruta === "/listado") pagina = <Listado idCategoria={parametros.get("categoria")} />;
  else if (ruta === "/carrito") pagina = <Carrito />;
  else pagina = <Inicio />;

  return <Estructura>{pagina}</Estructura>;
}
export default App;
