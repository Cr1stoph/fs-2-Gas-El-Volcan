import { Outlet } from 'react-router-dom';
// Usamos ../ para salir de layouts y entrar a core
import { Header } from '../core/Header';
import { Footer } from '../core/Footer';

export function PublicLayout() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Header />
      
      <Outlet />
      
      <Footer />
    </div>
  );
}