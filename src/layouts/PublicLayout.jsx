import { Outlet } from 'react-router-dom';
// Usamos ../ para salir de layouts y entrar a core
import { Header } from '../core/Header';
import { Footer } from '../core/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50/30 text-gray-800">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}