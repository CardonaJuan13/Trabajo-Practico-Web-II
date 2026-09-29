import { useSyncExternalStore } from "react";

const KEY = "carrito";
const listeners = new Set();

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

let items = read();

function emit() {
  listeners.forEach((l) => l());
}

function write(next) {
  items = next;
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

// Sincroniza si el carrito cambia en otra pestaña
window.addEventListener("storage", (e) => {
  if (e.key === KEY) {
    items = read();
    emit();
  }
});

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => items;

export function addItem(product, pictureUrl) {
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    write(items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i)));
  } else {
    write([
      ...items,
      { id: product.id, title: product.title, price: product.price, picture: pictureUrl, qty: 1 },
    ]);
  }
}

export function setQty(id, qty) {
  if (qty <= 0) return removeItem(id);
  write(items.map((i) => (i.id === id ? { ...i, qty } : i)));
}

export function removeItem(id) {
  write(items.filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function useCart() {
  const list = useSyncExternalStore(subscribe, getSnapshot);
  const count = list.reduce((n, i) => n + i.qty, 0);
  const total = list.reduce((s, i) => s + i.price * i.qty, 0);
  return { items: list, count, total };
}

export const formatPrice = (n) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
