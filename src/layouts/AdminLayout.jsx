import { Outlet } from 'react-router-dom';
import { Footer } from '../core/Footer';
import { Header } from '../core/Header';

// La protección de rol se hace en App.jsx mediante <ProtectedRoute roles={['ROLE_ADMIN']} />.
// Este layout solo se encarga de la estructura visual.
export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 text-gray-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
