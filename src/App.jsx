import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { VendedorLayout } from './layouts/VendedorLayout';
import { ProtectedRoute } from './core/ProtectedRoute';
import { StoreRoute } from './core/StoreRoute';
import { AdminPage } from './pages/AdminPage';
import { AdminUsuariosPage } from './pages/AdminUsuariosPage';
import { AdminCategoriasPage } from './pages/AdminCategoriasPage';
import { VendedorPage } from './pages/VendedorPage';
import { VendedorProductosPage } from './pages/VendedorProductosPage';
import { VendedorProductoDetallePage } from './pages/VendedorProductoDetallePage';
import { VendedorPedidosPage } from './pages/VendedorPedidosPage';
import { VendedorPedidoDetallePage } from './pages/VendedorPedidoDetallePage';
import { MisPedidosPage } from './pages/MisPedidosPage';
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
import { NotFoundPage } from './pages/NotFoundPage';

const ROLES_COMPRA = ['ROLE_CLIENTE', 'ROLE_ADMIN'];
const ROLES_CONSULTA = ['ROLE_ADMIN', 'ROLE_VENDEDOR'];

const router = createBrowserRouter(
  [
    {
      // Un VENDEDOR nunca puede entrar a las vistas de tienda.
      element: <StoreRoute />,
      children: [
        {
          path: '/',
          element: <PublicLayout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'carrito', element: <CartPage /> },
            {
              path: 'checkout',
              element: <ProtectedRoute roles={ROLES_COMPRA}><CheckoutPage /></ProtectedRoute>,
            },
            {
              path: 'mis-pedidos',
              element: <ProtectedRoute roles={ROLES_COMPRA}><MisPedidosPage /></ProtectedRoute>,
            },
            { path: 'categorias', element: <CategoriasPage /> },
            { path: 'ofertas', element: <OfertasPage /> },
            { path: 'nosotros', element: <NosotrosPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'registro', element: <RegistroPage /> },
            { path: 'pago-correcto/:pedidoId?', element: <PagoCorrectoPage /> },
            { path: 'pago-fallido/:pedidoId?', element: <PagoFallidoPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ],
    },
    {
      // Panel administrativo: acceso exclusivo de ROLE_ADMIN.
      element: <ProtectedRoute roles={['ROLE_ADMIN']} redirectTo="/" />,
      children: [
        {
          path: '/admin',
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminPage /> },
            { path: 'usuarios', element: <AdminUsuariosPage /> },
            { path: 'categorias', element: <AdminCategoriasPage /> },
          ],
        },
      ],
    },
    {
      // Panel vendedor: ADMIN y VENDEDOR, siempre en modo consulta.
      element: <ProtectedRoute roles={ROLES_CONSULTA} redirectTo="/" />,
      children: [
        {
          path: '/vendedor',
          element: <VendedorLayout />,
          children: [
            { index: true, element: <VendedorPage /> },
            { path: 'productos', element: <VendedorProductosPage /> },
            { path: 'productos/:id', element: <VendedorProductoDetallePage /> },
            { path: 'pedidos', element: <VendedorPedidosPage /> },
            { path: 'pedidos/:id', element: <VendedorPedidoDetallePage /> },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export function App() {
  return <RouterProvider router={router} />;
}
