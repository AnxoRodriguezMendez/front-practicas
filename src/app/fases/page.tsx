"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import TablaGenerica, { type FilaTabla } from "@/components/TablaGenerica";
import { listaFases, type Fase } from "@/lib/datosMock";

const colorFase: Record<string, { bg: string; text: string }> = {
  DEV: { bg: "#F5F77E", text: "#713f12" },
  PRU: { bg: "#fde68a", text: "#92400e" },
  CAL: { bg: "#e0e7ff", text: "#3730a3" },
  FIN: { bg: "#d1fae5", text: "#065f46" },
};

function ModalFase({ fase, onCerrar }: { fase?: Fase; onCerrar: () => void }) {
  const esEdicion = !!fase;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCerrar} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {esEdicion ? "Editar Fase" : "Nueva Fase"}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {esEdicion ? `Modificando fase: ${fase.nombre}` : "Define la nueva fase de desarrollo"}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Código</label>
            <input
              defaultValue={fase?.codigo}
              placeholder="Ej: TST"
              maxLength={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all font-mono uppercase"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre</label>
            <input
              defaultValue={fase?.nombre}
              placeholder="Ej: Testing"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Orden</label>
            <input
              type="number"
              defaultValue={fase?.orden}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all text-right"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
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
            {esEdicion ? "Guardar" : "Crear fase"}
          </button>
        </div>
      </div>
    </div>
  );
}

const datosTabla = listaFases as unknown as FilaTabla[];

export default function PaginaFases() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [faseSeleccionada, setFaseSeleccionada] = useState<Fase | undefined>();

  const columnas = [
    {
      clave: "orden",
      etiqueta: "#",
      alinear: "centro" as const,
      renderizar: (fila: FilaTabla) => (
        <span className="text-sm font-bold text-gray-400">{String(fila.orden)}</span>
      ),
    },
    {
      clave: "codigo",
      etiqueta: "Código",
      renderizar: (fila: FilaTabla) => {
        const codigo = String(fila.codigo);
        return (
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono"
            style={{
              backgroundColor: colorFase[codigo]?.bg || "#f3f4f6",
              color: colorFase[codigo]?.text || "#374151",
            }}
          >
            {codigo}
          </span>
        );
      },
    },
    { clave: "nombre", etiqueta: "Nombre de la fase" },
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
        <h1 className="text-2xl font-bold text-gray-900">Fases</h1>
        <p className="text-sm text-gray-400 mt-1">Fases del ciclo de desarrollo de productos</p>
      </div>

      {/* Tarjetas visuales de fases */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {listaFases.map((fase) => (
          <div
            key={fase.fase_id}
            className="rounded-2xl p-5 border border-gray-100 hover-card"
            style={{ backgroundColor: colorFase[fase.codigo]?.bg || "#f9fafb" }}
          >
            <p
              className="text-xs font-bold font-mono mb-1"
              style={{ color: colorFase[fase.codigo]?.text || "#374151" }}
            >
              {fase.codigo}
            </p>
            <p className="text-sm font-semibold text-gray-900">{fase.nombre}</p>
            <p className="text-xs text-gray-500 mt-1">Fase {fase.orden}</p>
          </div>
        ))}
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosTabla}
        acciones={{
          onEditar: (fila) => {
            setFaseSeleccionada(fila as unknown as Fase);
            setModalAbierto(true);
          },
          onBorrar: (fila) => confirm(`¿Borrar la fase "${fila.nombre}"?`),
        }}
        onNuevo={() => {
          setFaseSeleccionada(undefined);
          setModalAbierto(true);
        }}
        filasPerPagina={8}
      />

      {modalAbierto && (
        <ModalFase
          fase={faseSeleccionada}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </LayoutPrincipal>
  );
}
