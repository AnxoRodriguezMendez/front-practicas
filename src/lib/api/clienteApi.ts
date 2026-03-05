import { ErrorApi, extraerContenidoDesdeCuerpo } from "@/lib/api/erroresApi";

const URL_BASE_API =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:3003";

type OpcionesSolicitud = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

// Cliente base para centralizar llamadas HTTP al backend.
// En el futuro se podrá ampliar con auth, refresh token e interceptores.
export async function solicitarApi<TRespuesta>(
  ruta: string,
  opciones: OpcionesSolicitud = {}
): Promise<TRespuesta> {
  const { method: metodo = "GET", body: cuerpo, headers: cabeceras } = opciones;
  const urlCompleta = `${URL_BASE_API}${ruta.startsWith("/") ? ruta : `/${ruta}`}`;

  let respuesta: Response;
  try {
    // Objeto de configuración HTTP para la llamada al backend.
    respuesta = await fetch(urlCompleta, {
      method: metodo,
      // Objeto de cabeceras comunes para todas las peticiones JSON.
      headers: {
        "Content-Type": "application/json",
        ...cabeceras,
      },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    throw new ErrorApi(0, "No se pudo conectar con el servidor.");
  }

  const contenidoEsJson =
    respuesta.headers.get("content-type")?.includes("application/json") ?? false;
  const cuerpoRespuesta = contenidoEsJson ? await respuesta.json() : await respuesta.text();

  if (!respuesta.ok) {
    const contenido_error = extraerContenidoDesdeCuerpo(cuerpoRespuesta);
    const mensaje_backend =
      contenido_error.mensaje ||
      (typeof cuerpoRespuesta === "string" ? cuerpoRespuesta : null) ||
      respuesta.statusText;
    // Objeto de error tipado para transportar estado, título y mensaje en toda la app.
    throw new ErrorApi(
      respuesta.status,
      mensaje_backend,
      cuerpoRespuesta
    );
  }

  if (respuesta.status === 204) {
    return undefined as TRespuesta;
  }

  return cuerpoRespuesta as TRespuesta;
}

export { URL_BASE_API };
