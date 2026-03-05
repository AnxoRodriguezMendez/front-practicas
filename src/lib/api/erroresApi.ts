// Define la estructura del bloque "error" que envía LoopBack en respuestas fallidas.
type ErrorBackendApi = {
  statusCode?: number;
  message?: string;
};

// Define el cuerpo completo de error recibido desde la API.
type CuerpoErrorApi = {
  error?: ErrorBackendApi;
};

const MENSAJE_FALLBACK_ERROR_API =
  "Ha ocurrido un error inesperado. Intentalo de nuevo.";
const TITULO_FALLBACK_ERROR_API = "Error";

export class ErrorApi extends Error {
  codigo_estado: number;
  cuerpo?: unknown;

  constructor(codigo_estado: number, mensaje: string, cuerpo?: unknown) {
    super(mensaje);
    this.name = "ErrorApi";
    this.codigo_estado = codigo_estado;
    this.cuerpo = cuerpo;
  }
}

// Extrae el mensaje de error desde el cuerpo de respuesta.
export function extraerContenidoDesdeCuerpo(
  cuerpo: unknown
): { mensaje: string | null } {
  if (!cuerpo || typeof cuerpo !== "object") {
    return { mensaje: null };
  }

  const cuerpo_error = cuerpo as CuerpoErrorApi & ErrorBackendApi;
  // Algunos backends envían el error dentro de "error" y otros lo dejan plano.
  const error_backend = cuerpo_error.error ?? cuerpo_error;

  const mensaje =
    (error_backend.message && error_backend.message.trim()) ||
    null;

  return { mensaje };
}

// Obtiene un contenido seguro para UI y evita repetir esta lógica en cada catch.
export function obtenerContenidoErrorApi(error: unknown): {
  titulo: string;
  mensaje: string;
} {
  if (error instanceof ErrorApi) {
    return {
      titulo: TITULO_FALLBACK_ERROR_API,
      mensaje: error.message || MENSAJE_FALLBACK_ERROR_API,
    };
  }

  if (error instanceof Error && error.message) {
    // Objeto de notificación para errores estándar de JavaScript.
    return {
      titulo: TITULO_FALLBACK_ERROR_API,
      mensaje: error.message,
    };
  }

  // Objeto de notificación por defecto cuando no hay información de error.
  return {
    titulo: TITULO_FALLBACK_ERROR_API,
    mensaje: MENSAJE_FALLBACK_ERROR_API,
  };
}

