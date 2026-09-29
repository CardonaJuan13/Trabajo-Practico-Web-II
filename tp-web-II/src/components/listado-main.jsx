import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Listado from "./Listado.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Listado />
  </StrictMode>,
);
