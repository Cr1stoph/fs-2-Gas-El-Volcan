import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// 1. Importamos el Layout maestro (Header + Footer)
import { Root } from './Root';

// 2. Importamos las páginas de tu proyecto
import { HomePage } from './pages/HomePage';
import { NosotrosPage } from './pages/NosotrosPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { AdminPage } from './pages/AdminPage';

// 3. Configuramos las rutas siguiendo la estructura de tu profe
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // El Root envuelve estas rutas con el Header y Footer
    children: [
      { index: true, element: <HomePage /> }, // Ruta base "/"
      { path: 'nosotros', element: <NosotrosPage /> },
      { path: 'carrito', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'registro', element: <RegistroPage /> },
    ],
  },
  {
    // El panel de admin queda fuera del Root porque tiene su propio menú lateral
    path: '/admin',
    element: <AdminPage />,
  }
]);

// 4. Renderizamos la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);