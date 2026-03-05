"use client";

import { useEffect } from "react";

type TipoMensaje = "success" | "error" | "warning" | "info";

type PropsMensajeEstado = {
  tipo: TipoMensaje;
  titulo?: string;
  mensaje: string;
  onClose?: () => void;
};

// Objeto de estilos por tipo de mensaje para mantener una apariencia consistente.
const estilosPorTipo: Record<
  TipoMensaje,
  { contenedor: string; icono: string; botonCerrar: string }
> = {
  success: {
    contenedor: "bg-emerald-50 border-emerald-400 text-emerald-700",
    icono: "✓",
    botonCerrar: "text-emerald-700 hover:bg-emerald-100",
  },
  error: {
    contenedor: "bg-red-50 border-red-400 text-red-700",
    icono: "!",
    botonCerrar: "text-red-700 hover:bg-red-100",
  },
  warning: {
    contenedor: "bg-amber-50 border-amber-400 text-amber-700",
    icono: "!",
    botonCerrar: "text-amber-700 hover:bg-amber-100",
  },
  info: {
    contenedor: "bg-blue-50 border-blue-400 text-blue-700",
    icono: "i",
    botonCerrar: "text-blue-700 hover:bg-blue-100",
  },
};

// Componente unificado para mostrar mensajes de estado en toda la aplicación.
export default function MensajeEstado({
  tipo,
  titulo,
  mensaje,
  onClose,
}: PropsMensajeEstado) {
  const estilo = estilosPorTipo[tipo];

  // Cierra automáticamente el mensaje a los 5 segundos para no bloquear la vista.
  useEffect(() => {
    if (!onClose) return;
    const temporizadorCierre = window.setTimeout(() => onClose(), 5000);
    return () => window.clearTimeout(temporizadorCierre);
  }, [onClose, tipo, titulo, mensaje]);

  return (
    <div className="fixed top-4 right-4 z-[60] w-full max-w-md">
      <div
        className={`border rounded-2xl shadow-lg px-4 py-3 ${estilo.contenedor}`}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold border border-current/30 flex-shrink-0">
          {estilo.icono}
        </span>
          <div className="flex-1 min-w-0">
          {titulo && <p className="text-sm font-semibold">{titulo}</p>}
            <p className="text-sm leading-snug">{mensaje}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
              className={`w-6 h-6 rounded-md text-sm font-semibold transition-colors ${estilo.botonCerrar}`}
            aria-label="Cerrar mensaje"
          >
            ✕
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

