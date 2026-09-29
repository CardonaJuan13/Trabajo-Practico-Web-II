import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Estructura from "./Layout.jsx";
import Ficha from "./Ficha.jsx";

const id = new URLSearchParams(window.location.search).get("producto");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Estructura>
      <Ficha id={id} />
    </Estructura>
  </StrictMode>,
);
