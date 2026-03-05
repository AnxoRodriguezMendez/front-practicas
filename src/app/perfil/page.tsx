"use client";

import { useEffect, useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import MensajeEstado from "@/components/MensajeEstado";
import { obtenerContenidoErrorApi } from "@/lib/api/erroresApi";
import {
  actualizarPerfilUsuarioActual,
  obtenerPerfilUsuarioActual,
  type UsuarioSesion,
} from "@/services/authServicio";

const COLOR_PRIMARIO = "#807EF7";
const COLOR_AVATAR_BORDE = "#F5F77E";
const COLOR_AVATAR_PASTEL = "#FEF9C3";
const COLOR_AVATAR_FUERTE = "#A16207";

type EstadoMensaje = {
  tipo: "success" | "error" | "warning" | "info";
  titulo?: string;
  mensaje: string;
};

type FormularioPerfil = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
};

// Construye iniciales para avatar usando nombre y primer apellido.
function obtenerInicialesAvatar(nombre: string, apellido: string): string {
  const inicialNombre = nombre.trim().charAt(0).toUpperCase();
  const primerApellido = apellido.trim().split(" ")[0] ?? "";
  const inicialApellido = primerApellido.charAt(0).toUpperCase();
  return `${inicialNombre}${inicialApellido}`.trim() || "U";
}

export default function PaginaPerfil() {
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);
  const [estadoMensaje, setEstadoMensaje] = useState<EstadoMensaje | null>(null);
  const [usuarioPerfil, setUsuarioPerfil] = useState<UsuarioSesion | null>(null);
  const [formularioPerfil, setFormularioPerfil] = useState<FormularioPerfil>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  // Carga el perfil real del usuario autenticado al entrar en la vista.
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const perfil = await obtenerPerfilUsuarioActual();
        setUsuarioPerfil(perfil);
        setFormularioPerfil({
          nombre: perfil.nombre ?? "",
          apellido: perfil.apellido ?? "",
          email: perfil.email ?? "",
          telefono: perfil.telefono ?? "",
        });
      } catch (error) {
        const contenidoError = obtenerContenidoErrorApi(error);
        setEstadoMensaje({
          tipo: "error",
          titulo: contenidoError.titulo,
          mensaje: contenidoError.mensaje,
        });
      } finally {
        setCargandoPerfil(false);
      }
    };

    cargarPerfil();
  }, []);

  const manejarCambioCampo = (
    campo: keyof FormularioPerfil,
    valor: string
  ) => {
    setFormularioPerfil((estadoActual) => ({
      ...estadoActual,
      [campo]: valor,
    }));
  };

  const manejarGuardarPerfil = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setEstadoMensaje(null);
    setGuardandoPerfil(true);

    try {
      const perfilActualizado = await actualizarPerfilUsuarioActual({
        nombre: formularioPerfil.nombre.trim(),
        apellido: formularioPerfil.apellido.trim() || null,
        email: formularioPerfil.email.trim(),
        telefono: formularioPerfil.telefono.trim() || null,
      });

      setUsuarioPerfil(perfilActualizado);
      setFormularioPerfil({
        nombre: perfilActualizado.nombre ?? "",
        apellido: perfilActualizado.apellido ?? "",
        email: perfilActualizado.email ?? "",
        telefono: perfilActualizado.telefono ?? "",
      });
      setEstadoMensaje({
        tipo: "success",
        titulo: "Perfil actualizado",
        mensaje: "Los datos de usuario se han guardado correctamente.",
      });
    } catch (error) {
      const contenidoError = obtenerContenidoErrorApi(error);
      setEstadoMensaje({
        tipo: "error",
        titulo: contenidoError.titulo,
        mensaje: contenidoError.mensaje,
      });
    } finally {
      setGuardandoPerfil(false);
    }
  };

  const inicialesAvatar = obtenerInicialesAvatar(
    formularioPerfil.nombre,
    formularioPerfil.apellido
  );

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>
        <p className="text-sm text-gray-400 mt-1">
          Consulta y actualiza tu información de usuario
        </p>
      </div>

      {estadoMensaje && (
        <MensajeEstado
          tipo={estadoMensaje.tipo}
          titulo={estadoMensaje.titulo}
          mensaje={estadoMensaje.mensaje}
          onClose={() => setEstadoMensaje(null)}
        />
      )}

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {cargandoPerfil ? (
          <p className="text-sm text-gray-500">Cargando perfil...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {/* Tarjeta lateral de identidad visual del usuario */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/60">
                <div
                  className="w-24 h-24 rounded-full border-2 text-2xl font-bold flex items-center justify-center"
                  style={{
                    backgroundColor: COLOR_AVATAR_PASTEL,
                    color: COLOR_AVATAR_FUERTE,
                    borderColor: COLOR_AVATAR_BORDE,
                  }}
                >
                  {inicialesAvatar}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-4">
                  {`${formularioPerfil.nombre} ${formularioPerfil.apellido}`.trim() || "Usuario"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{usuarioPerfil?.rolNombre ?? "Sin rol"}</p>
              </div>
            </div>

            <form className="lg:col-span-2 space-y-4" onSubmit={manejarGuardarPerfil}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Nombre
                  </label>
                  <input
                    value={formularioPerfil.nombre}
                    onChange={(evento) => manejarCambioCampo("nombre", evento.target.value)}
                    required
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                    style={{ "--tw-ring-color": COLOR_PRIMARIO } as React.CSSProperties}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Apellido
                  </label>
                  <input
                    value={formularioPerfil.apellido}
                    onChange={(evento) => manejarCambioCampo("apellido", evento.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                    style={{ "--tw-ring-color": COLOR_PRIMARIO } as React.CSSProperties}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Mail
                </label>
                <input
                  type="email"
                  value={formularioPerfil.email}
                  onChange={(evento) => manejarCambioCampo("email", evento.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                  style={{ "--tw-ring-color": COLOR_PRIMARIO } as React.CSSProperties}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Teléfono
                </label>
                <input
                  value={formularioPerfil.telefono}
                  onChange={(evento) => manejarCambioCampo("telefono", evento.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                  style={{ "--tw-ring-color": COLOR_PRIMARIO } as React.CSSProperties}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Rol
                </label>
                <input
                  value={usuarioPerfil?.rolNombre ?? "Sin rol"}
                  disabled
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={guardandoPerfil}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-900 transition-all duration-150 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#F5F77E" }}
                >
                  {guardandoPerfil ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </LayoutPrincipal>
  );
}
