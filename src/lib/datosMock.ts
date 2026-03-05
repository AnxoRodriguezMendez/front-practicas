// Datos simulados para el portal de gestión de fases de desarrollo de productos.
// En el futuro, estos datos serán reemplazados por llamadas reales al backend.

export type Usuario = {
  usuario_id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo_sn: boolean;
  fecha_creacion: string;
  fecha_modificacion: string;
  usu_creacion: string;
  usu_modificacion: string;
};

export type Rol = {
  rol_id: number;
  nombre: string;
  activo_sn: boolean;
  eliminable: boolean;
  fecha_creacion: string;
  fecha_modificacion: string;
  usu_creacion: string;
  usu_modificacion: string;
};

export type Fase = {
  fase_id: number;
  codigo: string;
  nombre: string;
  orden: number;
  activo_sn: boolean;
  fecha_creacion: string;
  usu_creacion: string;
};

export type Tarea = {
  tarea_id: number;
  nombre: string;
  fase_id: number;
  fase_nombre: string;
  activo_sn: boolean;
  fecha_creacion: string;
  usu_creacion: string;
};

export type Producto = {
  producto_id: number;
  nombre: string;
  fase_id: number;
  fase_nombre: string;
  anyo: number;
  activo_sn: boolean;
  es_electrico_sn: boolean;
  requiere_montaje_sn: boolean;
  descripcion: string;
  fecha_creacion: string;
  usu_creacion: string;
};

export type TareaProducto = {
  tarea_id: number;
  nombre: string;
  completada: boolean;
};

export type Mensaje = {
  mensaje_id: number;
  usuario_emisor_id: number;
  usuario_emisor_nombre: string;
  usuario_receptor_id: number;
  contenido: string;
  fecha_envio: string;
  leido: boolean;
};

export type Permiso = {
  pantalla: string;
  ver: boolean;
  crear: boolean;
  editar: boolean;
  borrar: boolean;
};

// ----- USUARIOS -----
export const listaUsuarios: Usuario[] = [
  {
    usuario_id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@empresa.com",
    rol: "Supervisor",
    activo_sn: true,
    fecha_creacion: "2024-01-15",
    fecha_modificacion: "2024-03-10",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    usuario_id: 2,
    nombre: "María",
    apellido: "García",
    email: "maria.garcia@empresa.com",
    rol: "Desarrollador",
    activo_sn: true,
    fecha_creacion: "2024-02-01",
    fecha_modificacion: "2024-02-01",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    usuario_id: 3,
    nombre: "Carlos",
    apellido: "Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    rol: "Tester",
    activo_sn: true,
    fecha_creacion: "2024-02-15",
    fecha_modificacion: "2024-04-01",
    usu_creacion: "admin",
    usu_modificacion: "juan.perez",
  },
  {
    usuario_id: 4,
    nombre: "Ana",
    apellido: "Martínez",
    email: "ana.martinez@empresa.com",
    rol: "Diseñadora",
    activo_sn: false,
    fecha_creacion: "2024-03-01",
    fecha_modificacion: "2024-05-20",
    usu_creacion: "admin",
    usu_modificacion: "juan.perez",
  },
  {
    usuario_id: 5,
    nombre: "Luis",
    apellido: "Sánchez",
    email: "luis.sanchez@empresa.com",
    rol: "Desarrollador",
    activo_sn: true,
    fecha_creacion: "2024-03-10",
    fecha_modificacion: "2024-03-10",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    usuario_id: 6,
    nombre: "Elena",
    apellido: "López",
    email: "elena.lopez@empresa.com",
    rol: "Control de Calidad",
    activo_sn: true,
    fecha_creacion: "2024-04-05",
    fecha_modificacion: "2024-04-05",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    usuario_id: 7,
    nombre: "Pablo",
    apellido: "Fernández",
    email: "pablo.fernandez@empresa.com",
    rol: "Tester",
    activo_sn: true,
    fecha_creacion: "2024-05-12",
    fecha_modificacion: "2024-05-12",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    usuario_id: 8,
    nombre: "Sofía",
    apellido: "Díaz",
    email: "sofia.diaz@empresa.com",
    rol: "Desarrollador",
    activo_sn: false,
    fecha_creacion: "2024-06-01",
    fecha_modificacion: "2024-11-15",
    usu_creacion: "admin",
    usu_modificacion: "juan.perez",
  },
];

// ----- ROLES -----
export const listaRoles: Rol[] = [
  {
    rol_id: 1,
    nombre: "Supervisor",
    activo_sn: true,
    eliminable: false,
    fecha_creacion: "2024-01-01",
    fecha_modificacion: "2024-01-01",
    usu_creacion: "sistema",
    usu_modificacion: "sistema",
  },
  {
    rol_id: 2,
    nombre: "Desarrollador",
    activo_sn: true,
    eliminable: true,
    fecha_creacion: "2024-01-01",
    fecha_modificacion: "2024-01-01",
    usu_creacion: "sistema",
    usu_modificacion: "sistema",
  },
  {
    rol_id: 3,
    nombre: "Tester",
    activo_sn: true,
    eliminable: true,
    fecha_creacion: "2024-01-01",
    fecha_modificacion: "2024-03-15",
    usu_creacion: "sistema",
    usu_modificacion: "admin",
  },
  {
    rol_id: 4,
    nombre: "Diseñador",
    activo_sn: true,
    eliminable: true,
    fecha_creacion: "2024-02-10",
    fecha_modificacion: "2024-02-10",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
  {
    rol_id: 5,
    nombre: "Control de Calidad",
    activo_sn: true,
    eliminable: true,
    fecha_creacion: "2024-02-10",
    fecha_modificacion: "2024-02-10",
    usu_creacion: "admin",
    usu_modificacion: "admin",
  },
];

// ----- FASES -----
export const listaFases: Fase[] = [
  {
    fase_id: 1,
    codigo: "DEV",
    nombre: "Desarrollo",
    orden: 1,
    activo_sn: true,
    fecha_creacion: "2024-01-01",
    usu_creacion: "sistema",
  },
  {
    fase_id: 2,
    codigo: "PRU",
    nombre: "Pruebas",
    orden: 2,
    activo_sn: true,
    fecha_creacion: "2024-01-01",
    usu_creacion: "sistema",
  },
  {
    fase_id: 3,
    codigo: "CAL",
    nombre: "Control de Calidad",
    orden: 3,
    activo_sn: true,
    fecha_creacion: "2024-01-01",
    usu_creacion: "sistema",
  },
  {
    fase_id: 4,
    codigo: "FIN",
    nombre: "Finalizado",
    orden: 4,
    activo_sn: true,
    fecha_creacion: "2024-01-01",
    usu_creacion: "sistema",
  },
];

// ----- TAREAS -----
export const listaTareas: Tarea[] = [
  { tarea_id: 1, nombre: "Diseño de arquitectura", fase_id: 1, fase_nombre: "Desarrollo", activo_sn: true, fecha_creacion: "2024-01-10", usu_creacion: "admin" },
  { tarea_id: 2, nombre: "Desarrollo de módulo base", fase_id: 1, fase_nombre: "Desarrollo", activo_sn: true, fecha_creacion: "2024-01-10", usu_creacion: "admin" },
  { tarea_id: 3, nombre: "Revisión de código", fase_id: 1, fase_nombre: "Desarrollo", activo_sn: true, fecha_creacion: "2024-01-10", usu_creacion: "admin" },
  { tarea_id: 4, nombre: "Pruebas unitarias", fase_id: 2, fase_nombre: "Pruebas", activo_sn: true, fecha_creacion: "2024-01-15", usu_creacion: "admin" },
  { tarea_id: 5, nombre: "Pruebas de integración", fase_id: 2, fase_nombre: "Pruebas", activo_sn: true, fecha_creacion: "2024-01-15", usu_creacion: "admin" },
  { tarea_id: 6, nombre: "Pruebas de regresión", fase_id: 2, fase_nombre: "Pruebas", activo_sn: false, fecha_creacion: "2024-01-15", usu_creacion: "admin" },
  { tarea_id: 7, nombre: "Auditoría de calidad", fase_id: 3, fase_nombre: "Control de Calidad", activo_sn: true, fecha_creacion: "2024-02-01", usu_creacion: "admin" },
  { tarea_id: 8, nombre: "Revisión de estándares", fase_id: 3, fase_nombre: "Control de Calidad", activo_sn: true, fecha_creacion: "2024-02-01", usu_creacion: "admin" },
  { tarea_id: 9, nombre: "Certificación final", fase_id: 3, fase_nombre: "Control de Calidad", activo_sn: true, fecha_creacion: "2024-02-01", usu_creacion: "admin" },
  { tarea_id: 10, nombre: "Documentación técnica", fase_id: 4, fase_nombre: "Finalizado", activo_sn: true, fecha_creacion: "2024-02-15", usu_creacion: "admin" },
  { tarea_id: 11, nombre: "Entrega al cliente", fase_id: 4, fase_nombre: "Finalizado", activo_sn: true, fecha_creacion: "2024-02-15", usu_creacion: "admin" },
];

// ----- PRODUCTOS -----
export const listaProductos: Producto[] = [
  {
    producto_id: 1,
    nombre: "Sistema de Control de Temperatura",
    fase_id: 1,
    fase_nombre: "Desarrollo",
    anyo: 2024,
    activo_sn: true,
    es_electrico_sn: true,
    requiere_montaje_sn: true,
    descripcion: "Sistema avanzado de control térmico para entornos industriales con sensores de alta precisión.",
    fecha_creacion: "2024-02-01",
    usu_creacion: "admin",
  },
  {
    producto_id: 2,
    nombre: "Panel de Visualización Modular",
    fase_id: 2,
    fase_nombre: "Pruebas",
    anyo: 2024,
    activo_sn: true,
    es_electrico_sn: true,
    requiere_montaje_sn: false,
    descripcion: "Panel LED modular para visualización de datos en tiempo real con conectividad WiFi.",
    fecha_creacion: "2024-01-15",
    usu_creacion: "admin",
  },
  {
    producto_id: 3,
    nombre: "Carcasa de Aluminio Serie X",
    fase_id: 3,
    fase_nombre: "Control de Calidad",
    anyo: 2024,
    activo_sn: true,
    es_electrico_sn: false,
    requiere_montaje_sn: true,
    descripcion: "Carcasa de aluminio anodizado de alta resistencia para equipos de precisión.",
    fecha_creacion: "2023-11-01",
    usu_creacion: "admin",
  },
  {
    producto_id: 4,
    nombre: "Unidad de Procesamiento Edge",
    fase_id: 4,
    fase_nombre: "Finalizado",
    anyo: 2023,
    activo_sn: true,
    es_electrico_sn: true,
    requiere_montaje_sn: false,
    descripcion: "Unidad de procesamiento local para análisis de datos IoT en tiempo real.",
    fecha_creacion: "2023-06-20",
    usu_creacion: "admin",
  },
  {
    producto_id: 5,
    nombre: "Kit de Sensores Ambientales",
    fase_id: 1,
    fase_nombre: "Desarrollo",
    anyo: 2025,
    activo_sn: true,
    es_electrico_sn: true,
    requiere_montaje_sn: true,
    descripcion: "Kit completo de sensores para medición de temperatura, humedad y presión atmosférica.",
    fecha_creacion: "2024-12-01",
    usu_creacion: "admin",
  },
  {
    producto_id: 6,
    nombre: "Soporte Articulado Pro",
    fase_id: 4,
    fase_nombre: "Finalizado",
    anyo: 2023,
    activo_sn: false,
    es_electrico_sn: false,
    requiere_montaje_sn: true,
    descripcion: "Soporte articulado de precisión para montaje de equipos en superficies variables.",
    fecha_creacion: "2023-03-15",
    usu_creacion: "admin",
  },
];

// Tareas asociadas a productos (simulación de progreso)
export const tareasProducto: TareaProducto[] = [
  { tarea_id: 1, nombre: "Diseño de arquitectura", completada: true },
  { tarea_id: 2, nombre: "Desarrollo de módulo base", completada: true },
  { tarea_id: 3, nombre: "Revisión de código", completada: false },
  { tarea_id: 4, nombre: "Pruebas unitarias", completada: false },
];

// ----- MENSAJES -----
export const listaMensajes: Mensaje[] = [
  {
    mensaje_id: 1,
    usuario_emisor_id: 2,
    usuario_emisor_nombre: "María García",
    usuario_receptor_id: 1,
    contenido: "Hola Juan, ¿cómo va el desarrollo del módulo de temperatura?",
    fecha_envio: "2024-12-10T09:15:00",
    leido: true,
  },
  {
    mensaje_id: 2,
    usuario_emisor_id: 1,
    usuario_emisor_nombre: "Juan Pérez",
    usuario_receptor_id: 2,
    contenido: "Bien María, estamos en la fase de revisión de código. Deberíamos terminar mañana.",
    fecha_envio: "2024-12-10T09:32:00",
    leido: true,
  },
  {
    mensaje_id: 3,
    usuario_emisor_id: 3,
    usuario_emisor_nombre: "Carlos Rodríguez",
    usuario_receptor_id: 1,
    contenido: "Necesito acceso al panel de pruebas para el producto #2.",
    fecha_envio: "2024-12-10T10:05:00",
    leido: false,
  },
  {
    mensaje_id: 4,
    usuario_emisor_id: 6,
    usuario_emisor_nombre: "Elena López",
    usuario_receptor_id: 1,
    contenido: "El informe de calidad de la Carcasa Serie X está listo para revisión.",
    fecha_envio: "2024-12-10T11:20:00",
    leido: false,
  },
  {
    mensaje_id: 5,
    usuario_emisor_id: 5,
    usuario_emisor_nombre: "Luis Sánchez",
    usuario_receptor_id: 1,
    contenido: "¿Puedo empezar con el desarrollo del Kit de Sensores esta semana?",
    fecha_envio: "2024-12-10T14:45:00",
    leido: false,
  },
  {
    mensaje_id: 6,
    usuario_emisor_id: 2,
    usuario_emisor_nombre: "María García",
    usuario_receptor_id: 1,
    contenido: "Documentación del Panel de Visualización actualizada en el repositorio.",
    fecha_envio: "2024-12-11T08:30:00",
    leido: false,
  },
];

// ----- PERMISOS -----
export const listaPermisos: Permiso[] = [
  { pantalla: "Dashboard", ver: true, crear: false, editar: false, borrar: false },
  { pantalla: "Usuarios", ver: true, crear: true, editar: true, borrar: true },
  { pantalla: "Roles", ver: true, crear: true, editar: true, borrar: false },
  { pantalla: "Permisos", ver: true, crear: false, editar: true, borrar: false },
  { pantalla: "Fases", ver: true, crear: true, editar: true, borrar: false },
  { pantalla: "Tareas", ver: true, crear: true, editar: true, borrar: true },
  { pantalla: "Productos", ver: true, crear: true, editar: true, borrar: false },
  { pantalla: "Chat", ver: true, crear: true, editar: false, borrar: false },
];

// Estadísticas del dashboard (simuladas)
export const estadisticasDashboard = {
  productos_en_desarrollo: listaProductos.filter((p) => p.fase_nombre === "Desarrollo").length,
  productos_en_pruebas: listaProductos.filter((p) => p.fase_nombre === "Pruebas").length,
  productos_en_calidad: listaProductos.filter((p) => p.fase_nombre === "Control de Calidad").length,
  productos_finalizados: listaProductos.filter((p) => p.fase_nombre === "Finalizado").length,
  total_usuarios_activos: listaUsuarios.filter((u) => u.activo_sn).length,
  total_tareas_pendientes: listaTareas.filter((t) => t.activo_sn).length,
};
