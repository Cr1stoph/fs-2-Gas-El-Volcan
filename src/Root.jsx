import { Outlet } from 'react-router-dom';
import { Header } from './core/Header';
import { Footer } from './core/Footer';

export function Root() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      <Header />
      
      <Outlet />
      
      <Footer />
    </div>
  );
}