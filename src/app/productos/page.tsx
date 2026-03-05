"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import TablaGenerica, { type FilaTabla } from "@/components/TablaGenerica";
import { listaProductos, tareasProducto, type Producto } from "@/lib/datosMock";

const colorFase: Record<string, { bg: string; text: string }> = {
  Desarrollo: { bg: "#F5F77E", text: "#713f12" },
  Pruebas: { bg: "#fde68a", text: "#92400e" },
  "Control de Calidad": { bg: "#e0e7ff", text: "#3730a3" },
  Finalizado: { bg: "#d1fae5", text: "#065f46" },
};

// Modal de vista detalle del producto con tareas e imagen simulada
function ModalDetalleProducto({ producto, onCerrar }: { producto: Producto; onCerrar: () => void }) {
  const [tareas, setTareas] = useState(tareasProducto);

  const alternarTarea = (tarea_id: number) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.tarea_id === tarea_id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const porcentajeCompletado = Math.round(
    (tareas.filter((t) => t.completada).length / tareas.length) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCerrar} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Imagen simulada */}
        <div
          className="h-40 rounded-t-3xl flex items-center justify-center text-5xl"
          style={{
            background: `linear-gradient(135deg, ${colorFase[producto.fase_nombre]?.bg || "#f3f4f6"} 0%, #e5e7eb 100%)`,
          }}
        >
          {producto.es_electrico_sn ? "⚡" : "◈"}
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{producto.nombre}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    backgroundColor: colorFase[producto.fase_nombre]?.bg,
                    color: colorFase[producto.fase_nombre]?.text,
                  }}
                >
                  {producto.fase_nombre}
                </span>
                <span className="text-xs text-gray-400">{producto.anyo}</span>
              </div>
            </div>
            <button
              onClick={onCerrar}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all text-sm"
            >
              ✕
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{producto.descripcion}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Eléctrico</p>
              <p className="text-sm font-semibold text-gray-900">
                {producto.es_electrico_sn ? "Sí" : "No"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Montaje req.</p>
              <p className="text-sm font-semibold text-gray-900">
                {producto.requiere_montaje_sn ? "Sí" : "No"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-400 mb-1">Estado</p>
              <p className="text-sm font-semibold text-gray-900">
                {producto.activo_sn ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-700">Tareas del producto</h4>
              <span className="text-xs font-bold" style={{ color: "#807EF7" }}>
                {porcentajeCompletado}% completado
              </span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${porcentajeCompletado}%`, backgroundColor: "#807EF7" }}
              />
            </div>

            <div className="space-y-2">
              {tareas.map((tarea) => (
                <div
                  key={tarea.tarea_id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-100"
                  onClick={() => alternarTarea(tarea.tarea_id)}
                >
                  <button
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                    style={
                      tarea.completada
                        ? { backgroundColor: "#807EF7", borderColor: "#807EF7" }
                        : { backgroundColor: "white", borderColor: "#d1d5db" }
                    }
                  >
                    {tarea.completada && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-sm transition-all ${
                      tarea.completada ? "line-through text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {tarea.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCerrar}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cerrar
            </button>
            <button
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-900 transition-all hover:shadow-md"
              style={{ backgroundColor: "#F5F77E" }}
            >
              Editar producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const datosTabla = listaProductos as unknown as FilaTabla[];

export default function PaginaProductos() {
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);

  const columnas = [
    {
      clave: "nombre",
      etiqueta: "Producto",
      renderizar: (fila: FilaTabla) => {
        const fase_nombre = String(fila.fase_nombre);
        return (
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
              style={{ backgroundColor: colorFase[fase_nombre]?.bg || "#f3f4f6" }}
            >
              {fila.es_electrico_sn ? "⚡" : "◈"}
            </div>
            <span className="font-medium text-gray-900">{String(fila.nombre)}</span>
          </div>
        );
      },
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
      clave: "anyo",
      etiqueta: "Año",
      alinear: "derecha" as const,
      renderizar: (fila: FilaTabla) => (
        <span className="font-mono text-gray-700">{String(fila.anyo)}</span>
      ),
    },
    {
      clave: "es_electrico_sn",
      etiqueta: "Eléctrico",
      alinear: "centro" as const,
      renderizar: (fila: FilaTabla) => (
        <span className="text-sm">{fila.es_electrico_sn ? "⚡ Sí" : "—"}</span>
      ),
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
          {fila.activo_sn ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <p className="text-sm text-gray-400 mt-1">Gestión del ciclo de vida de los productos</p>
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosTabla}
        acciones={{
          onVer: (fila) => setProductoDetalle(fila as unknown as Producto),
          onEditar: (fila) => alert(`Editando: ${fila.nombre}`),
          onBorrar: (fila) => confirm(`¿Borrar "${fila.nombre}"?`),
        }}
        mostrarBuscador
        campoBusqueda="nombre"
        onNuevo={() => alert("Formulario de nuevo producto (próximamente)")}
        filasPerPagina={6}
      />

      {productoDetalle && (
        <ModalDetalleProducto
          producto={productoDetalle}
          onCerrar={() => setProductoDetalle(null)}
        />
      )}
    </LayoutPrincipal>
  );
}
