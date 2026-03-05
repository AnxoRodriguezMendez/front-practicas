import { redirect } from "next/navigation";

// Redirige automáticamente desde la raíz al login
export default function PaginaRaiz() {
  redirect("/login");
}
