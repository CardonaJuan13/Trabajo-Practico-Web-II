import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Listado from "./components/Listado.jsx";
import Carrito from "./components/carrito.jsx";
import { useRoute } from "./router.js";

function App() {
  const { path, params } = useRoute();

  let page;
  if (path === "/listado") page = <Listado categoryId={params.get("categoria")} />;
  else if (path === "/carrito") page = <Carrito />;
  else page = <Home />;

  return (
    <>
      <Header />
      {page}
    </>
  );
}
export default App;
