"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import TablaGenerica, { type FilaTabla } from "@/components/TablaGenerica";
import { listaRoles, type Rol } from "@/lib/datosMock";

function ModalRol({ rol, onCerrar }: { rol?: Rol; onCerrar: () => void }) {
  const esEdicion = !!rol;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCerrar} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {esEdicion ? "Editar Rol" : "Nuevo Rol"}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {esEdicion ? `Modificando rol: ${rol.nombre}` : "Define el nombre del nuevo rol"}
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre del rol</label>
            <input
              defaultValue={rol?.nombre}
              placeholder="Ej: Administrador"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo_sn_rol"
              defaultChecked={rol?.activo_sn ?? true}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="activo_sn_rol" className="text-sm text-gray-700">
              Rol activo
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
            {esEdicion ? "Guardar" : "Crear rol"}
          </button>
        </div>
      </div>
    </div>
  );
}

const datosTabla = listaRoles as unknown as FilaTabla[];

export default function PaginaRoles() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState<Rol | undefined>();

  const columnas = [
    {
      clave: "nombre",
      etiqueta: "Nombre del Rol",
      renderizar: (fila: FilaTabla) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{String(fila.nombre)}</span>
          {!fila.eliminable && (
            <span
              className="px-2 py-0.5 rounded-md text-xs font-semibold"
              style={{ backgroundColor: "#e0e7ff", color: "#3730a3" }}
            >
              Sistema
            </span>
          )}
        </div>
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
    { clave: "fecha_creacion", etiqueta: "Fecha creación" },
    {
      clave: "eliminable",
      etiqueta: "Eliminable",
      alinear: "centro" as const,
      renderizar: (fila: FilaTabla) => (
        <span className="text-sm">{fila.eliminable ? "Sí" : "—"}</span>
      ),
    },
  ];

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Roles</h1>
        <p className="text-sm text-gray-400 mt-1">Gestión de roles del sistema</p>
      </div>

      <div
        className="mb-6 flex items-start gap-3 px-4 py-3 rounded-xl border text-sm"
        style={{ backgroundColor: "#eef2ff", borderColor: "#c7d2fe", color: "#3730a3" }}
      >
        <span className="text-base mt-0.5">🛡</span>
        <p>
          El rol <strong>Supervisor</strong> es un rol de sistema y no puede ser eliminado.
          Está marcado visualmente como no eliminable.
        </p>
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosTabla}
        acciones={{
          onEditar: (fila) => {
            setRolSeleccionado(fila as unknown as Rol);
            setModalAbierto(true);
          },
          onBorrar: (fila) => {
            if (!fila.eliminable) {
              alert("Este rol de sistema no puede ser eliminado.");
            } else {
              confirm(`¿Borrar el rol "${fila.nombre}"?`);
            }
          },
        }}
        onNuevo={() => {
          setRolSeleccionado(undefined);
          setModalAbierto(true);
        }}
        filasPerPagina={8}
      />

      {modalAbierto && (
        <ModalRol
          rol={rolSeleccionado}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </LayoutPrincipal>
  );
}
