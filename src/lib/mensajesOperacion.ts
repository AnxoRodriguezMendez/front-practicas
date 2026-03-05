export type TipoOperacionMensaje = "insert" | "update" | "show" | "count";

// Define si una operación debe mostrar mensaje al usuario.
export function debeMostrarMensajeOperacion(tipoOperacion: TipoOperacionMensaje): boolean {
  return tipoOperacion === "insert" || tipoOperacion === "update";
}

// Devuelve el tipo visual recomendado para notificación según operación.
export function obtenerTipoMensajeOperacion(
  tipoOperacion: TipoOperacionMensaje
): "success" | "info" {
  return tipoOperacion === "insert" || tipoOperacion === "update"
    ? "success"
    : "info";
}

