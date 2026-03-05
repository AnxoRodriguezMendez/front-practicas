"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { listaMensajes } from "@/lib/datosMock";
import { obtenerUsuarioSesion, type UsuarioSesion } from "@/services/authServicio";

const COLOR_PRIMARIO = "#807EF7";
const COLOR_AVATAR_BORDE = "#F5F77E";
const COLOR_AVATAR_PASTEL = "#FEF9C3";
const COLOR_AVATAR_FUERTE = "#A16207";

// Genera iniciales con nombre y primer apellido para el avatar textual.
function obtenerInicialesAvatar(nombre: string, apellido: string | null): string {
  const inicialNombre = nombre.trim().charAt(0).toUpperCase();
  const primerApellido = (apellido ?? "").trim().split(" ")[0] ?? "";
  const inicialApellido = primerApellido.charAt(0).toUpperCase();
  return `${inicialNombre}${inicialApellido}`.trim();
}

export default function Header() {
  const enrutador = useRouter();
  const [usuarioSesion, setUsuarioSesion] = useState<UsuarioSesion | null>(null);

  // Calcula el número de mensajes no leídos para el indicador de notificaciones
  const mensajesNoLeidos = listaMensajes.filter((m) => !m.leido).length;

  useEffect(() => {
    setUsuarioSesion(obtenerUsuarioSesion());
  }, []);

  // Navega a la vista de perfil para consultar/editar los datos del usuario.
  const manejarAbrirPerfil = () => {
    enrutador.push("/perfil");
  };

  const nombreCompletoUsuario = usuarioSesion
    ? `${usuarioSesion.nombre} ${usuarioSesion.apellido ?? ""}`.trim()
    : "Usuario";
  const inicialesAvatar = obtenerInicialesAvatar(
    usuarioSesion?.nombre ?? "U",
    usuarioSesion?.apellido ?? null
  );
  const rolUsuario = usuarioSesion?.rolNombre ?? "Sin rol";

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-30 shadow-sm">
      {/* Mensaje principal de cabecera */}
      <p className="text-sm font-semibold text-gray-900">
        Bienvenido a <span style={{ color: COLOR_PRIMARIO }}>Mobel Manager</span>
      </p>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        {/* Icono notificaciones */}
        <Link href="/chat">
          <button className="relative w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all duration-150 border border-gray-200">
            <span className="text-base">✉</span>
            {mensajesNoLeidos > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: "#807EF7" }}
              >
                {mensajesNoLeidos}
              </span>
            )}
          </button>
        </Link>

        {/* Separador */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Botón de perfil que abre la vista de detalle/edición */}
        <button
          type="button"
          onClick={manejarAbrirPerfil}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-gray-50 transition-all duration-150 border border-gray-200"
        >
          <span
            className="w-9 h-9 rounded-full border text-xs font-bold flex items-center justify-center"
            style={{
              backgroundColor: COLOR_AVATAR_PASTEL,
              color: COLOR_AVATAR_FUERTE,
              borderColor: COLOR_AVATAR_BORDE,
            }}
          >
            {inicialesAvatar}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold text-gray-800">{nombreCompletoUsuario}</span>
            <span className="block text-xs text-gray-500">{rolUsuario}</span>
          </span>
        </button>

      </div>
    </header>
  );
}
