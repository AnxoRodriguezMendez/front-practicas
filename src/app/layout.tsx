import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sistema de Gestión",
  description: "Panel interno de gestión empresarial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="hidden md:flex md:w-64 flex-col bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">Mi Empresa</h2>

            <nav className="flex flex-col gap-4 text-sm">
              <Link href="/dashboard" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
              <Link href="/usuarios" className="hover:text-gray-300 transition">
                Usuarios
              </Link>
              <Link href="/productos" className="hover:text-gray-300 transition">
                Productos
              </Link>
              <Link href="/fases" className="hover:text-gray-300 transition">
                Fases
              </Link>
              <Link href="/tareas" className="hover:text-gray-300 transition">
                Tareas
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex flex-col flex-1">

            {/* Navbar */}
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
              <h1 className="text-lg font-semibold">Panel de Gestión</h1>

              <div className="text-sm text-gray-500">
                Usuario
              </div>
            </header>

            {/* Dynamic Page */}
            <main className="flex-1 p-6">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}