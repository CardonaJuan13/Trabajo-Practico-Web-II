import { useSyncExternalStore } from "react";
import { mostrarNotificacion } from "./toast.js";

const CLAVE = "carritoMuebles";
const oyentes = new Set();

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? [];
  } catch {
    return [];
  }
}

let articulos = leer();

function avisar() {
  oyentes.forEach((oyente) => oyente());
}

function guardar(nuevosArticulos) {
  articulos = nuevosArticulos;
  localStorage.setItem(CLAVE, JSON.stringify(nuevosArticulos));
  avisar();
}

window.addEventListener("storage", (evento) => {
  if (evento.key === CLAVE) {
    articulos = leer();
    avisar();
  }
});

const suscribirse = (oyente) => {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
};
const obtenerEstado = () => articulos;

export function agregarAlCarrito(producto, imagen) {
  const existente = articulos.find((articulo) => articulo.id === producto.id);
  if (existente) {
    guardar(
      articulos.map((articulo) =>
        articulo.id === producto.id ? { ...articulo, cantidad: articulo.cantidad + 1 } : articulo
      )
    );
  } else {
    guardar([
      ...articulos,
      { id: producto.id, titulo: producto.title, precio: producto.price, imagen, cantidad: 1 },
    ]);
  }
  mostrarNotificacion(producto.title);
}

export function cambiarCantidad(id, cantidad) {
  if (cantidad <= 0) return quitarDelCarrito(id);
  guardar(articulos.map((articulo) => (articulo.id === id ? { ...articulo, cantidad } : articulo)));
}

export function quitarDelCarrito(id) {
  guardar(articulos.filter((articulo) => articulo.id !== id));
}

export function vaciarCarrito() {
  guardar([]);
}

export function useCarrito() {
  const lista = useSyncExternalStore(suscribirse, obtenerEstado);
  const cantidadTotal = lista.reduce((suma, articulo) => suma + articulo.cantidad, 0);
  const total = lista.reduce((suma, articulo) => suma + articulo.precio * articulo.cantidad, 0);
  return { articulos: lista, cantidadTotal, total };
}

export const formatearPrecio = (numero) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(numero);
