"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { limpiarSesion } from "@/services/authServicio";

type ElementoMenu = {
  etiqueta: string;
  ruta: string;
  icono: string;
};

const elementosMenu: ElementoMenu[] = [
  { etiqueta: "Dashboard", ruta: "/dashboard", icono: "⊞" },
  { etiqueta: "Usuarios", ruta: "/usuarios", icono: "👤" },
  { etiqueta: "Roles", ruta: "/roles", icono: "🔑" },
  { etiqueta: "Permisos", ruta: "/permisos", icono: "🛡" },
  { etiqueta: "Fases", ruta: "/fases", icono: "◎" },
  { etiqueta: "Tareas", ruta: "/tareas", icono: "✓" },
  { etiqueta: "Productos", ruta: "/productos", icono: "◈" },
  { etiqueta: "Chat", ruta: "/chat", icono: "✉" },
];

export default function Sidebar() {
  const enrutador = useRouter();
  const rutaActual = usePathname();

  // Cierra sesión desde el menú lateral y redirige al login.
  const manejarCerrarSesion = () => {
    limpiarSesion();
    enrutador.replace("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-gray-800"
            style={{ backgroundColor: "#F5F77E" }}
          >
            PG
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Mobel Manager</p>
            <p className="text-xs text-gray-400">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Navegación
        </p>
        <ul className="space-y-0.5">
          {elementosMenu.map((elemento) => {
            const estaActivo = rutaActual === elemento.ruta || rutaActual.startsWith(elemento.ruta + "/");
            return (
              <li key={elemento.ruta}>
                <Link
                  href={elemento.ruta}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    estaActivo
                      ? "text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                  style={estaActivo ? { backgroundColor: "#F5F77E" } : {}}
                >
                  <span className="text-base w-5 text-center">{elemento.icono}</span>
                  {elemento.etiqueta}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer del sidebar */}
      <div className="px-6 py-4 border-t border-gray-100">
        <button
          type="button"
          onClick={manejarCerrarSesion}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-150 border border-gray-200"
        >
          <span>↩</span>
          Salir
        </button>
      </div>
    </aside>
  );
}
