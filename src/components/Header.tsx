"use client";

import Link from "next/link";
import { listaMensajes } from "@/lib/datosMock";

export default function Header() {
  // Calcula el número de mensajes no leídos para el indicador de notificaciones
  const mensajesNoLeidos = listaMensajes.filter((m) => !m.leido).length;

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-30 shadow-sm">
      {/* Saludo */}
      <div>
        <p className="text-sm font-semibold text-gray-900">
          Bienvenido, <span style={{ color: "#807EF7" }}>Juan Pérez</span>
        </p>
        <p className="text-xs text-gray-400">Supervisor · Panel de Control</p>
      </div>

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

        {/* Botón logout */}
        <Link href="/login">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150 border border-gray-200">
            <span>↩</span>
            Salir
          </button>
        </Link>
      </div>
    </header>
  );
}
