"use client";

import { useState, useRef, useEffect } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import { listaMensajes, listaUsuarios } from "@/lib/datosMock";

type MensajeChat = {
  mensaje_id: number;
  usuario_emisor_id: number;
  usuario_emisor_nombre: string;
  usuario_receptor_id: number;
  contenido: string;
  fecha_envio: string;
  leido: boolean;
};

const ID_USUARIO_ACTUAL = 1;

// Formatea una fecha ISO en hora legible
function formatearHora(fechaIso: string): string {
  return new Date(fechaIso).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PaginaChat() {
  const usuariosDisponibles = listaUsuarios.filter((u) => u.usuario_id !== ID_USUARIO_ACTUAL);
  const [usuarioActivoId, setUsuarioActivoId] = useState(usuariosDisponibles[0].usuario_id);
  const [mensajes, setMensajes] = useState<MensajeChat[]>(listaMensajes);
  const [textoNuevo, setTextoNuevo] = useState("");
  const contenedorRef = useRef<HTMLDivElement>(null);

  const usuarioActivo = usuariosDisponibles.find((u) => u.usuario_id === usuarioActivoId)!;

  // Filtra los mensajes de la conversación activa
  const conversacionActiva = mensajes.filter(
    (m) =>
      (m.usuario_emisor_id === ID_USUARIO_ACTUAL && m.usuario_receptor_id === usuarioActivoId) ||
      (m.usuario_emisor_id === usuarioActivoId && m.usuario_receptor_id === ID_USUARIO_ACTUAL)
  );

  // Cuenta mensajes no leídos por usuario para el indicador de notificaciones
  const contarNoLeidos = (usuarioId: number) =>
    mensajes.filter((m) => m.usuario_emisor_id === usuarioId && !m.leido).length;

  // Simula el envío de un mensaje nuevo
  const enviarMensaje = () => {
    if (!textoNuevo.trim()) return;
    const nuevoMensaje: MensajeChat = {
      mensaje_id: mensajes.length + 1,
      usuario_emisor_id: ID_USUARIO_ACTUAL,
      usuario_emisor_nombre: "Juan Pérez",
      usuario_receptor_id: usuarioActivoId,
      contenido: textoNuevo.trim(),
      fecha_envio: new Date().toISOString(),
      leido: true,
    };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setTextoNuevo("");
  };

  const manejarTecla = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  // Hace scroll automático al final cuando llegan mensajes nuevos
  useEffect(() => {
    if (contenedorRef.current) {
      contenedorRef.current.scrollTop = contenedorRef.current.scrollHeight;
    }
  }, [conversacionActiva.length]);

  return (
    <LayoutPrincipal>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        <p className="text-sm text-gray-400 mt-1">Mensajes internos del equipo</p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden" style={{ height: "calc(100vh - 220px)" }}>
        <div className="flex h-full">
          {/* Lista de usuarios */}
          <div className="w-72 border-r border-gray-100 flex flex-col flex-shrink-0">
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conversaciones</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {usuariosDisponibles.map((usuario) => {
                const noLeidos = contarNoLeidos(usuario.usuario_id);
                const estaActivo = usuario.usuario_id === usuarioActivoId;
                return (
                  <button
                    key={usuario.usuario_id}
                    onClick={() => setUsuarioActivoId(usuario.usuario_id)}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-100 text-left"
                    style={estaActivo ? { backgroundColor: "#f5f3ff" } : {}}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: "#807EF7" }}
                      >
                        {usuario.nombre[0]}{usuario.apellido[0]}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm truncate ${estaActivo ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                          {usuario.nombre} {usuario.apellido}
                        </p>
                        {noLeidos > 0 && (
                          <span
                            className="ml-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "#807EF7" }}
                          >
                            {noLeidos}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{usuario.rol}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Área de conversación */}
          <div className="flex-1 flex flex-col">
            {/* Cabecera de la conversación */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: "#807EF7" }}
              >
                {usuarioActivo.nombre[0]}{usuarioActivo.apellido[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {usuarioActivo.nombre} {usuarioActivo.apellido}
                </p>
                <p className="text-xs text-gray-400">{usuarioActivo.rol} · En línea</p>
              </div>
            </div>

            {/* Mensajes */}
            <div ref={contenedorRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {conversacionActiva.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-4xl mb-3">✉</span>
                  <p className="text-sm">No hay mensajes aún. ¡Empieza la conversación!</p>
                </div>
              ) : (
                conversacionActiva.map((mensaje) => {
                  const esMio = mensaje.usuario_emisor_id === ID_USUARIO_ACTUAL;
                  return (
                    <div
                      key={mensaje.mensaje_id}
                      className={`flex gap-3 ${esMio ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {!esMio && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-1"
                          style={{ backgroundColor: "#807EF7" }}
                        >
                          {mensaje.usuario_emisor_nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md ${esMio ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        <div
                          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                          style={
                            esMio
                              ? { backgroundColor: "#807EF7", color: "white", borderBottomRightRadius: "6px" }
                              : { backgroundColor: "#f3f4f6", color: "#1f2937", borderBottomLeftRadius: "6px" }
                          }
                        >
                          {mensaje.contenido}
                        </div>
                        <p className="text-xs text-gray-400 px-1">{formatearHora(mensaje.fecha_envio)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input de mensaje */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={textoNuevo}
                    onChange={(e) => setTextoNuevo(e.target.value)}
                    onKeyDown={manejarTecla}
                    placeholder="Escribe un mensaje... (Enter para enviar)"
                    rows={1}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl bg-gray-50 resize-none focus:outline-none focus:ring-2 transition-all leading-relaxed"
                    style={{
                      "--tw-ring-color": "#807EF7",
                      maxHeight: "120px",
                    } as React.CSSProperties}
                  />
                </div>
                <button
                  onClick={enviarMensaje}
                  disabled={!textoNuevo.trim()}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all duration-150 hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  style={{ backgroundColor: "#807EF7" }}
                >
                  <svg className="w-4 h-4 rotate-90" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
