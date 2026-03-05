"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import TablaGenerica, { type FilaTabla } from "@/components/TablaGenerica";
import { listaTareas, listaFases, type Tarea } from "@/lib/datosMock";

const colorFase: Record<string, { bg: string; text: string }> = {
  Desarrollo: { bg: "#F5F77E", text: "#713f12" },
  Pruebas: { bg: "#fde68a", text: "#92400e" },
  "Control de Calidad": { bg: "#e0e7ff", text: "#3730a3" },
  Finalizado: { bg: "#d1fae5", text: "#065f46" },
};

function ModalTarea({ tarea, onCerrar }: { tarea?: Tarea; onCerrar: () => void }) {
  const esEdicion = !!tarea;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCerrar} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {esEdicion ? "Editar Tarea" : "Nueva Tarea"}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {esEdicion ? `Modificando: ${tarea.nombre}` : "Define la nueva tarea de desarrollo"}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre de la tarea</label>
            <input
              defaultValue={tarea?.nombre}
              placeholder="Ej: Revisión de documentación"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Fase</label>
            <select
              defaultValue={tarea?.fase_id}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            >
              {listaFases.map((fase) => (
                <option key={fase.fase_id} value={fase.fase_id}>
                  {fase.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo_sn_tarea"
              defaultChecked={tarea?.activo_sn ?? true}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="activo_sn_tarea" className="text-sm text-gray-700">
              Tarea activa
            </label>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCerrar}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onCerrar}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-900 transition-all hover:shadow-md"
            style={{ backgroundColor: "#F5F77E" }}
          >
            {esEdicion ? "Guardar" : "Crear tarea"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaginaTareas() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | undefined>();
  const [filtroFase, setFiltroFase] = useState<number | null>(null);

  const tareasFiltradas = filtroFase
    ? listaTareas.filter((t) => t.fase_id === filtroFase)
    : listaTareas;

  const datosTabla = tareasFiltradas as unknown as FilaTabla[];

  const columnas = [
    {
      clave: "nombre",
      etiqueta: "Nombre de la tarea",
      renderizar: (fila: FilaTabla) => (
        <span className="font-medium text-gray-900">{String(fila.nombre)}</span>
      ),
    },
    {
      clave: "fase_nombre",
      etiqueta: "Fase",
      renderizar: (fila: FilaTabla) => {
        const fase_nombre = String(fila.fase_nombre);
        return (
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: colorFase[fase_nombre]?.bg || "#f3f4f6",
              color: colorFase[fase_nombre]?.text || "#374151",
            }}
          >
            {fase_nombre}
          </span>
        );
      },
    },
    {
      clave: "activo_sn",
      etiqueta: "Estado",
      alinear: "centro" as const,
      renderizar: (fila: FilaTabla) => (
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={
            fila.activo_sn
              ? { backgroundColor: "#d1fae5", color: "#065f46" }
              : { backgroundColor: "#fee2e2", color: "#991b1b" }
          }
        >
          {fila.activo_sn ? "Activa" : "Inactiva"}
        </span>
      ),
    },
    { clave: "fecha_creacion", etiqueta: "Fecha creación" },
  ];

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
        <p className="text-sm text-gray-400 mt-1">Tareas asociadas a cada fase del desarrollo</p>
      </div>

      {/* Filtro por fase */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Filtrar por fase</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroFase(null)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
            style={
              filtroFase === null
                ? { backgroundColor: "#807EF7", color: "white" }
                : { backgroundColor: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" }
            }
          >
            Todas
          </button>
          {listaFases.map((fase) => (
            <button
              key={fase.fase_id}
              onClick={() => setFiltroFase(fase.fase_id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={
                filtroFase === fase.fase_id
                  ? { backgroundColor: "#807EF7", color: "white" }
                  : { backgroundColor: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" }
              }
            >
              {fase.nombre}
            </button>
          ))}
        </div>
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosTabla}
        acciones={{
          onEditar: (fila) => {
            setTareaSeleccionada(fila as unknown as Tarea);
            setModalAbierto(true);
          },
          onBorrar: (fila) => confirm(`¿Borrar la tarea "${fila.nombre}"?`),
        }}
        mostrarBuscador
        campoBusqueda="nombre"
        onNuevo={() => {
          setTareaSeleccionada(undefined);
          setModalAbierto(true);
        }}
        filasPerPagina={6}
      />

      {modalAbierto && (
        <ModalTarea
          tarea={tareaSeleccionada}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </LayoutPrincipal>
  );
}
