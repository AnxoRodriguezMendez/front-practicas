"use client";

import { useState } from "react";

export type FilaTabla = Record<string, unknown>;

export type ColumnaTabla = {
  clave: string;
  etiqueta: string;
  renderizar?: (fila: FilaTabla) => React.ReactNode;
  alinear?: "izquierda" | "derecha" | "centro";
};

export type AccionesTabla = {
  onVer?: (fila: FilaTabla) => void;
  onEditar?: (fila: FilaTabla) => void;
  onBorrar?: (fila: FilaTabla) => void;
};

type PropsTablaGenerica = {
  columnas: ColumnaTabla[];
  datos: FilaTabla[];
  acciones?: AccionesTabla;
  filasPerPagina?: number;
  mostrarBuscador?: boolean;
  campoBusqueda?: string;
  tituloTabla?: string;
  onNuevo?: () => void;
};

// Componente de tabla reutilizable con búsqueda y paginación simulada.
export default function TablaGenerica({
  columnas,
  datos,
  acciones,
  filasPerPagina = 6,
  mostrarBuscador = false,
  campoBusqueda,
  tituloTabla,
  onNuevo,
}: PropsTablaGenerica) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtra datos según el término de búsqueda en el campo configurado
  const datosFiltrados = datos.filter((fila) => {
    if (!terminoBusqueda || !campoBusqueda) return true;
    const valor = String(fila[campoBusqueda] ?? "").toLowerCase();
    return valor.includes(terminoBusqueda.toLowerCase());
  });

  const totalPaginas = Math.ceil(datosFiltrados.length / filasPerPagina);
  const inicio = (paginaActual - 1) * filasPerPagina;
  const datosPagina = datosFiltrados.slice(inicio, inicio + filasPerPagina);

  const alineacionClase = (alinear?: "izquierda" | "derecha" | "centro") => {
    if (alinear === "derecha") return "text-right";
    if (alinear === "centro") return "text-center";
    return "text-left";
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      {/* Cabecera de la tabla */}
      {(tituloTabla || mostrarBuscador || onNuevo) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          {tituloTabla && (
            <h3 className="text-sm font-semibold text-gray-700">{tituloTabla}</h3>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {mostrarBuscador && (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  ⌕
                </span>
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={terminoBusqueda}
                  onChange={(e) => {
                    setTerminoBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
                  className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-150 w-52"
                  style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
                />
              </div>
            )}
            {onNuevo && (
              <button
                onClick={onNuevo}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 transition-all duration-150 hover:shadow-md active:scale-95"
                style={{ backgroundColor: "#F5F77E" }}
              >
                + Nuevo
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columnas.map((col) => (
                <th
                  key={col.clave}
                  className={`px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider ${alineacionClase(col.alinear)}`}
                >
                  {col.etiqueta}
                </th>
              ))}
              {acciones && (
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {datosPagina.length === 0 ? (
              <tr>
                <td
                  colSpan={columnas.length + (acciones ? 1 : 0)}
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  No se encontraron resultados
                </td>
              </tr>
            ) : (
              datosPagina.map((fila, indice) => (
                <tr
                  key={indice}
                  className="hover:bg-gray-50 transition-colors duration-100"
                >
                  {columnas.map((col) => (
                    <td
                      key={col.clave}
                      className={`px-6 py-4 text-sm text-gray-700 ${alineacionClase(col.alinear)}`}
                    >
                      {col.renderizar
                        ? col.renderizar(fila)
                        : String(fila[col.clave] ?? "")}
                    </td>
                  ))}
                  {acciones && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {acciones.onVer && (
                          <button
                            onClick={() => acciones.onVer!(fila)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-all duration-150"
                          >
                            Ver
                          </button>
                        )}
                        {acciones.onEditar && (
                          <button
                            onClick={() => acciones.onEditar!(fila)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-150 hover:opacity-90"
                            style={{ backgroundColor: "#807EF7" }}
                          >
                            Editar
                          </button>
                        )}
                        {acciones.onBorrar && (
                          <button
                            onClick={() => acciones.onBorrar!(fila)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-all duration-150"
                          >
                            Borrar
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Mostrando {inicio + 1}–{Math.min(inicio + filasPerPagina, datosFiltrados.length)} de{" "}
            {datosFiltrados.length} registros
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center"
            >
              ‹
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPaginaActual(num)}
                className="w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center"
                style={
                  paginaActual === num
                    ? { backgroundColor: "#F5F77E", color: "#1f2937", fontWeight: 700 }
                    : { color: "#6b7280" }
                }
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
