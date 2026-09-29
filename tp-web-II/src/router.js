import { useSyncExternalStore } from "react";

function subscribe(cb) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}
const getHash = () => window.location.hash;

export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash);
  const [rawPath, query = ""] = hash.replace(/^#/, "").split("?");
  return { path: rawPath || "/", params: new URLSearchParams(query) };
}

export function navigate(to) {
  window.location.hash = to;
}

//Archivo armado con ayuda de Claude :(
