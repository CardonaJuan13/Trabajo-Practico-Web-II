export const API_URL = "https://ecommerce.fedegonzalez.com";
const TOKEN = "01020304";
if (!TOKEN) console.error("Error al llamar a la API");

export async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const getProducts = () => getJSON("/products/");
export const getCategories = () => getJSON("/categories/");

export function pictureURL(url) {
  if (!url) return "vite.svg";
  if (/^https?:/i.test(url)) return url;
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}