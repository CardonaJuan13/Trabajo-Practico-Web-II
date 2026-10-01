const oyentes = new Set();

export function mostrarNotificacion(mensaje) {
  oyentes.forEach((oyente) => oyente({ mensaje, id: Date.now() + Math.random() }));
}

export function suscribirNotificaciones(oyente) {
  oyentes.add(oyente);
  return () => oyentes.delete(oyente);
}
