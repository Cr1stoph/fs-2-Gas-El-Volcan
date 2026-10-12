import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from '../core/Footer';
import { Header } from '../core/Header';
import { getSesionDemo } from '../data/demoAuth';

export function AdminLayout() {
  if (getSesionDemo()?.rol !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 text-gray-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
