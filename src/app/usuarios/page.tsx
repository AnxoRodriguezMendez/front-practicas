"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import TablaGenerica, { type FilaTabla } from "@/components/TablaGenerica";
import { listaUsuarios, type Usuario } from "@/lib/datosMock";

function ModalUsuario({
  usuario,
  onCerrar,
}: {
  usuario?: Usuario;
  onCerrar: () => void;
}) {
  const esEdicion = !!usuario;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onCerrar} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          {esEdicion ? `Modificando a ${usuario.nombre} ${usuario.apellido}` : "Completa los datos del nuevo usuario"}
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nombre</label>
              <input
                defaultValue={usuario?.nombre}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Apellido</label>
              <input
                defaultValue={usuario?.apellido}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
            <input
              type="email"
              defaultValue={usuario?.email}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rol</label>
            <select
              defaultValue={usuario?.rol}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all"
              style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
            >
              <option>Supervisor</option>
              <option>Desarrollador</option>
              <option>Tester</option>
              <option>Diseñador</option>
              <option>Control de Calidad</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo_sn"
              defaultChecked={usuario?.activo_sn ?? true}
              className="w-4 h-4 rounded"
            />
            <label htmlFor="activo_sn" className="text-sm text-gray-700">
              Usuario activo
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
            {esEdicion ? "Guardar cambios" : "Crear usuario"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Convierte la lista tipada a FilaTabla para el componente genérico
const datosTabla = listaUsuarios as unknown as FilaTabla[];

export default function PaginaUsuarios() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | undefined>();

  const abrirEdicion = (fila: FilaTabla) => {
    setUsuarioSeleccionado(fila as unknown as Usuario);
    setModalAbierto(true);
  };

  const columnas = [
    {
      clave: "nombre",
      etiqueta: "Nombre",
      renderizar: (fila: FilaTabla) => {
        const u = fila as unknown as Usuario;
        return (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: "#807EF7" }}
            >
              {u.nombre[0]}{u.apellido[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{u.nombre} {u.apellido}</p>
              <p className="text-xs text-gray-400">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    { clave: "rol", etiqueta: "Rol" },
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
    { clave: "fecha_creacion", etiqueta: "Fecha alta" },
  ];

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-sm text-gray-400 mt-1">Gestión de usuarios del sistema</p>
      </div>

      <TablaGenerica
        columnas={columnas}
        datos={datosTabla}
        acciones={{
          onVer: (fila) => alert(`Viendo usuario: ${fila.nombre}`),
          onEditar: abrirEdicion,
          onBorrar: (fila) => confirm(`¿Borrar a ${fila.nombre}?`),
        }}
        mostrarBuscador
        campoBusqueda="nombre"
        onNuevo={() => {
          setUsuarioSeleccionado(undefined);
          setModalAbierto(true);
        }}
        filasPerPagina={6}
      />

      {modalAbierto && (
        <ModalUsuario
          usuario={usuarioSeleccionado}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </LayoutPrincipal>
  );
}
