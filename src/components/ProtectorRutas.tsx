"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { obtenerTokenSesion } from "@/services/authServicio";

type PropsProtectorRutas = {
  children: React.ReactNode;
};

const RUTAS_PUBLICAS = ["/login"];

// Indica si una ruta se considera pública dentro de la app.
function esRutaPublica(ruta: string): boolean {
  return RUTAS_PUBLICAS.some((rutaPublica) => ruta === rutaPublica);
}

export default function ProtectorRutas({ children }: PropsProtectorRutas) {
  const enrutador = useRouter();
  const rutaActual = usePathname();
  const [puedeMostrarContenido, setPuedeMostrarContenido] = useState(false);

  useEffect(() => {
    if (!rutaActual) return;

    // Se valida sesión en cliente porque el token se guarda en sessionStorage.
    const tokenSesion = obtenerTokenSesion();
    const tieneSesion = Boolean(tokenSesion && tokenSesion.trim().length > 0);
    const rutaEsPublica = esRutaPublica(rutaActual);

    if (!rutaEsPublica && !tieneSesion) {
      setPuedeMostrarContenido(false);
      enrutador.replace("/login");
      return;
    }

    if (rutaEsPublica && tieneSesion) {
      setPuedeMostrarContenido(false);
      enrutador.replace("/dashboard");
      return;
    }

    setPuedeMostrarContenido(true);
  }, [rutaActual, enrutador]);

  if (!puedeMostrarContenido) return null;

  return <>{children}</>;
}
