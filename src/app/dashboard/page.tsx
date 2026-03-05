import LayoutPrincipal from "@/components/LayoutPrincipal";
import CardEstadistica from "@/components/CardEstadistica";
import { estadisticasDashboard, listaProductos, listaTareas } from "@/lib/datosMock";

// Colores de badge para cada fase del producto
const colorFase: Record<string, string> = {
  Desarrollo: "#F5F77E",
  Pruebas: "#fde68a",
  "Control de Calidad": "#c7d2fe",
  Finalizado: "#d1fae5",
};

const textColorFase: Record<string, string> = {
  Desarrollo: "#78716c",
  Pruebas: "#92400e",
  "Control de Calidad": "#3730a3",
  Finalizado: "#065f46",
};

export default function PaginaDashboard() {
  const productosRecientes = listaProductos.slice(0, 4);
  const tareasRecientes = listaTareas.filter((t) => t.activo_sn).slice(0, 5);

  return (
    <LayoutPrincipal>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Resumen del estado actual del desarrollo de productos</p>
      </div>

      {/* Cards estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CardEstadistica
          titulo="En Desarrollo"
          valor={estadisticasDashboard.productos_en_desarrollo}
          descripcion="productos activos"
          icono="⚙"
          colorFondo="#F5F77E"
          tendencia="arriba"
        />
        <CardEstadistica
          titulo="En Pruebas"
          valor={estadisticasDashboard.productos_en_pruebas}
          descripcion="pendientes de validar"
          icono="🔬"
          colorFondo="#fef9c3"
          tendencia="neutro"
        />
        <CardEstadistica
          titulo="Control de Calidad"
          valor={estadisticasDashboard.productos_en_calidad}
          descripcion="en revisión"
          icono="✓"
          colorFondo="#e0e7ff"
          tendencia="neutro"
        />
        <CardEstadistica
          titulo="Finalizados"
          valor={estadisticasDashboard.productos_finalizados}
          descripcion="completados"
          icono="★"
          colorFondo="#d1fae5"
          tendencia="arriba"
        />
      </div>

      {/* Segunda fila de stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <CardEstadistica
          titulo="Usuarios Activos"
          valor={estadisticasDashboard.total_usuarios_activos}
          descripcion="miembros del equipo"
          icono="👥"
          colorFondo="#fce7f3"
        />
        <CardEstadistica
          titulo="Tareas Activas"
          valor={estadisticasDashboard.total_tareas_pendientes}
          descripcion="en progreso"
          icono="📋"
          colorFondo="#f3e8ff"
        />
      </div>

      {/* Grid de contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productos recientes */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Productos Recientes</h3>
            <a href="/productos" className="text-xs font-medium" style={{ color: "#807EF7" }}>
              Ver todos →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {productosRecientes.map((producto) => (
              <div key={producto.producto_id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ backgroundColor: colorFase[producto.fase_nombre] || "#f3f4f6" }}
                  >
                    {producto.es_electrico_sn ? "⚡" : "◈"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{producto.nombre}</p>
                    <p className="text-xs text-gray-400">{producto.anyo}</p>
                  </div>
                </div>
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    backgroundColor: colorFase[producto.fase_nombre] || "#f3f4f6",
                    color: textColorFase[producto.fase_nombre] || "#374151",
                  }}
                >
                  {producto.fase_nombre}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Tareas Activas</h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            {tareasRecientes.map((tarea) => (
              <div key={tarea.tarea_id} className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: "#807EF7" }}
                />
                <div>
                  <p className="text-sm text-gray-800 font-medium leading-tight">{tarea.nombre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tarea.fase_nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de progreso por fases */}
      <div className="mt-6 bg-white rounded-2xl shadow-card border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Distribución de Productos por Fase</h3>
        <div className="space-y-3">
          {[
            { fase: "Desarrollo", valor: estadisticasDashboard.productos_en_desarrollo, total: listaProductos.length, color: "#F5F77E" },
            { fase: "Pruebas", valor: estadisticasDashboard.productos_en_pruebas, total: listaProductos.length, color: "#fbbf24" },
            { fase: "Control de Calidad", valor: estadisticasDashboard.productos_en_calidad, total: listaProductos.length, color: "#818cf8" },
            { fase: "Finalizado", valor: estadisticasDashboard.productos_finalizados, total: listaProductos.length, color: "#34d399" },
          ].map(({ fase, valor, total, color }) => (
            <div key={fase} className="flex items-center gap-4">
              <p className="text-xs text-gray-500 w-36 flex-shrink-0">{fase}</p>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(valor / total) * 100}%`, backgroundColor: color }}
                />
              </div>
              <p className="text-xs font-semibold text-gray-700 w-6 text-right">{valor}</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutPrincipal>
  );
}
