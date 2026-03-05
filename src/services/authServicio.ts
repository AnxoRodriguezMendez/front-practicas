import { solicitarApi } from "@/lib/api/clienteApi";

export type CredencialesLogin = {
  email: string;
  password: string;
};

export type UsuarioSesion = {
  id: number;
  nombre: string;
  apellido: string | null;
  email: string;
  telefono: string | null;
  rolId: number;
  rolNombre: string;
};

export type RespuestaLogin = {
  token: string;
  usuario: UsuarioSesion;
};

type UsuarioApi = {
  id: number;
  nombre: string;
  apellido?: string | null;
  email: string;
  telefono?: string | null;
  rolId: number;
};

type RolApi = {
  id: number;
  nombre: string;
};

type DatosActualizacionPerfil = {
  nombre: string;
  apellido: string | null;
  email: string;
  telefono: string | null;
};

const CLAVE_TOKEN = "token";
const CLAVE_USUARIO = "usuario";

// Ejecuta la petición de login contra el backend y persiste la sesión local.
export async function loginServicio({
  email,
  password,
}: CredencialesLogin): Promise<RespuestaLogin> {
  const respuesta = await solicitarApi<RespuestaLogin>("/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: { email, password },
  });

  if (typeof window !== "undefined") {
    // Se guarda en sessionStorage para que la sesión expire al cerrar el navegador.
    sessionStorage.setItem(CLAVE_TOKEN, respuesta.token);
    sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(respuesta.usuario));
  }

  return respuesta;
}

// Devuelve el token guardado para llamadas protegidas.
export function obtenerTokenSesion(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CLAVE_TOKEN);
}

// Construye los headers con autorización Bearer para endpoints protegidos.
export function obtenerHeadersAutorizacion(): Record<string, string> {
  const token = obtenerTokenSesion();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Limpia los datos de sesión local al cerrar sesión.
export function limpiarSesion(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CLAVE_TOKEN);
  sessionStorage.removeItem(CLAVE_USUARIO);
}

// Sobrescribe el usuario de sesión para mantener sincronizado el header.
export function guardarUsuarioSesion(usuario: UsuarioSesion): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
}

// Recupera el usuario autenticado guardado durante el login.
export function obtenerUsuarioSesion(): UsuarioSesion | null {
  if (typeof window === "undefined") return null;

  const usuarioSerializado = sessionStorage.getItem(CLAVE_USUARIO);
  if (!usuarioSerializado) return null;

  try {
    return JSON.parse(usuarioSerializado) as UsuarioSesion;
  } catch {
    return null;
  }
}

// Obtiene el nombre del rol a partir de su id en la tabla roles.
async function obtenerNombreRolPorId(rolId: number): Promise<string> {
  const rol = await solicitarApi<RolApi>(`/roles/${rolId}`, {
    method: "GET",
    headers: obtenerHeadersAutorizacion(),
  });
  return rol.nombre;
}

// Carga el perfil del usuario autenticado desde API y enriquece el rol.
export async function obtenerPerfilUsuarioActual(): Promise<UsuarioSesion> {
  const usuarioSesion = obtenerUsuarioSesion();
  if (!usuarioSesion) {
    throw new Error("No hay usuario en sesión.");
  }

  const usuarioApi = await solicitarApi<UsuarioApi>(`/usuarios/${usuarioSesion.id}`, {
    method: "GET",
    headers: obtenerHeadersAutorizacion(),
  });

  let rolNombre = usuarioSesion.rolNombre || "Sin rol";
  try {
    rolNombre = await obtenerNombreRolPorId(usuarioApi.rolId);
  } catch {
    // Si falla la consulta de rol, se mantiene el valor conocido en sesión.
  }

  const perfilNormalizado: UsuarioSesion = {
    id: usuarioApi.id,
    nombre: usuarioApi.nombre,
    apellido: usuarioApi.apellido ?? null,
    email: usuarioApi.email,
    telefono: usuarioApi.telefono ?? null,
    rolId: usuarioApi.rolId,
    rolNombre,
  };

  guardarUsuarioSesion(perfilNormalizado);
  return perfilNormalizado;
}

// Actualiza los datos editables del perfil y devuelve el estado final actualizado.
export async function actualizarPerfilUsuarioActual(
  datosPerfil: DatosActualizacionPerfil
): Promise<UsuarioSesion> {
  const usuarioSesion = obtenerUsuarioSesion();
  if (!usuarioSesion) {
    throw new Error("No hay usuario en sesión.");
  }

  await solicitarApi<void>(`/usuarios/${usuarioSesion.id}`, {
    method: "PATCH",
    headers: obtenerHeadersAutorizacion(),
    body: {
      nombre: datosPerfil.nombre,
      apellido: datosPerfil.apellido,
      email: datosPerfil.email,
      telefono: datosPerfil.telefono,
    },
  });

  return obtenerPerfilUsuarioActual();
}
