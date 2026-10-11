import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminPage } from './pages/AdminPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { RegistroPage } from './pages/RegistroPage';
import { PagoCorrectoPage } from './pages/PagoCorrectoPage';
import { PagoFallidoPage } from './pages/PagoFallidoPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { OfertasPage } from './pages/OfertasPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'carrito', element: <CartPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'categorias', element: <CategoriasPage /> },
        { path: 'ofertas', element: <OfertasPage /> },
        { path: 'nosotros', element: <NosotrosPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'registro', element: <RegistroPage /> },
        { path: 'pago-correcto/:pedidoId?', element: <PagoCorrectoPage /> },
        { path: 'pago-fallido/:pedidoId?', element: <PagoFallidoPage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [{ index: true, element: <AdminPage /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export function App() {
  return <RouterProvider router={router} />;
}
