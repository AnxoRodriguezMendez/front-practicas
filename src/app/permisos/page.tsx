"use client";

import { useState } from "react";
import LayoutPrincipal from "@/components/LayoutPrincipal";
import { listaPermisos } from "@/lib/datosMock";

type AccionPermiso = "ver" | "crear" | "editar" | "borrar";

const acciones: { clave: AccionPermiso; etiqueta: string }[] = [
  { clave: "ver", etiqueta: "Ver" },
  { clave: "crear", etiqueta: "Crear" },
  { clave: "editar", etiqueta: "Editar" },
  { clave: "borrar", etiqueta: "Borrar" },
];

export default function PaginaPermisos() {
  const [permisos, setPermisos] = useState(listaPermisos);
  const [rolActivo, setRolActivo] = useState("Supervisor");

  const rolesDisponibles = ["Supervisor", "Desarrollador", "Tester", "Diseñador", "Control de Calidad"];

  // Alterna el estado de un permiso específico en la matriz
  const alternarPermiso = (indicePantalla: number, accion: AccionPermiso) => {
    const nuevosPermisos = [...permisos];
    nuevosPermisos[indicePantalla] = {
      ...nuevosPermisos[indicePantalla],
      [accion]: !nuevosPermisos[indicePantalla][accion],
    };
    setPermisos(nuevosPermisos);
  };

  return (
    <LayoutPrincipal>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Permisos</h1>
        <p className="text-sm text-gray-400 mt-1">Gestión de acceso por rol y pantalla</p>
      </div>

      {/* Selector de rol */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Rol seleccionado</p>
        <div className="flex flex-wrap gap-2">
          {rolesDisponibles.map((rol) => (
            <button
              key={rol}
              onClick={() => setRolActivo(rol)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={
                rolActivo === rol
                  ? { backgroundColor: "#807EF7", color: "white" }
                  : { backgroundColor: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" }
              }
            >
              {rol}
            </button>
          ))}
        </div>
      </div>

      {/* Matriz de permisos */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Permisos para: <span style={{ color: "#807EF7" }}>{rolActivo}</span>
          </h3>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 transition-all hover:shadow-md"
            style={{ backgroundColor: "#F5F77E" }}
          >
            Guardar cambios
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-left">
                  Pantalla
                </th>
                {acciones.map((accion) => (
                  <th
                    key={accion.clave}
                    className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center"
                  >
                    {accion.etiqueta}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {permisos.map((permiso, indice) => (
                <tr key={permiso.pantalla} className="hover:bg-gray-50 transition-colors duration-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {permiso.pantalla}
                  </td>
                  {acciones.map((accion) => (
                    <td key={accion.clave} className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => alternarPermiso(indice, accion.clave)}
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-150"
                          style={
                            permiso[accion.clave]
                              ? { backgroundColor: "#807EF7", borderColor: "#807EF7" }
                              : { backgroundColor: "white", borderColor: "#d1d5db" }
                          }
                          title={`${permiso[accion.clave] ? "Quitar" : "Otorgar"} permiso de ${accion.etiqueta}`}
                        >
                          {permiso[accion.clave] && (
                            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400">
            Los cambios son visuales. En el futuro se sincronizarán con el backend.
          </p>
        </div>
      </div>
    </LayoutPrincipal>
  );
}
