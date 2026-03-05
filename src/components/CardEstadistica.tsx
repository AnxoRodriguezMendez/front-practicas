type PropsCardEstadistica = {
  titulo: string;
  valor: number | string;
  descripcion?: string;
  icono?: string;
  colorFondo?: string;
  tendencia?: "arriba" | "abajo" | "neutro";
};

// Componente que muestra una tarjeta con estadística numérica para el dashboard.
export default function CardEstadistica({
  titulo,
  valor,
  descripcion,
  icono,
  colorFondo = "#F5F77E",
  tendencia,
}: PropsCardEstadistica) {
  const iconoTendencia =
    tendencia === "arriba" ? "↑" : tendencia === "abajo" ? "↓" : null;
  const colorTendencia =
    tendencia === "arriba" ? "text-emerald-500" : tendencia === "abajo" ? "text-red-400" : "";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover-card border border-gray-100 cursor-default">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{titulo}</p>
          <p className="text-4xl font-bold text-gray-900 tracking-tight">{valor}</p>
          {descripcion && (
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              {iconoTendencia && (
                <span className={`font-semibold ${colorTendencia}`}>{iconoTendencia}</span>
              )}
              {descripcion}
            </p>
          )}
        </div>
        {icono && (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: colorFondo }}
          >
            {icono}
          </div>
        )}
      </div>
    </div>
  );
}
