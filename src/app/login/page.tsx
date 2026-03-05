"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaginaLogin() {
  const router = useRouter();
  const [correo_electronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error_mensaje, setErrorMensaje] = useState("");

  // Simula el proceso de autenticación. En el futuro se conectará con el backend.
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMensaje("");
    setCargando(true);

    await new Promise((res) => setTimeout(res, 800));

    if (correo_electronico === "admin@empresa.com" && contrasena === "1234") {
      router.push("/dashboard");
    } else {
      setErrorMensaje("Credenciales incorrectas. Prueba con admin@empresa.com / 1234");
      setCargando(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#807EF7" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "#F5F77E" }}
        />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-2xl font-bold text-gray-900 mb-4 shadow-lg"
            style={{ backgroundColor: "#F5F77E" }}
          >
            PG
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Portal de Gestión</h1>
          <p className="text-sm text-gray-500 mt-1">Fases de desarrollo de productos</p>
        </div>

        {/* Card de login */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Iniciar sesión</h2>
          <p className="text-sm text-gray-400 mb-6">Accede con tus credenciales de empresa</p>

          <form onSubmit={manejarEnvio} className="space-y-4">
            {/* Campo email */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo_electronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                placeholder="usuario@empresa.com"
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
              />
            </div>

            {/* Campo contraseña */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-150"
                style={{ "--tw-ring-color": "#807EF7" } as React.CSSProperties}
              />
            </div>

            {/* Mensaje de error */}
            {error_mensaje && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs text-red-600">
                {error_mensaje}
              </div>
            )}

            {/* Botón enviar */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 rounded-xl text-sm font-semibold text-gray-900 transition-all duration-150 hover:shadow-md active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ backgroundColor: "#F5F77E" }}
            >
              {cargando ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          {/* Credenciales de prueba */}
          <div className="mt-6 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Demo: <span className="font-mono text-gray-600">admin@empresa.com</span> /{" "}
              <span className="font-mono text-gray-600">1234</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 Portal de Gestión · Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
