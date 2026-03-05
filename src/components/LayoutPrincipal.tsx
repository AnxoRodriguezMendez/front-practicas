import Sidebar from "./Sidebar";
import Header from "./Header";

type PropsLayoutPrincipal = {
  children: React.ReactNode;
};

// Layout principal que envuelve todas las páginas protegidas (excepto login).
// Incluye sidebar fijo a la izquierda y header superior.
export default function LayoutPrincipal({ children }: PropsLayoutPrincipal) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
