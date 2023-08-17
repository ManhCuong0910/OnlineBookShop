import { useRoutes } from "react-router-dom";
import path from "src/constants/path";
import MainLayout from "src/layouts/MainLayout";
import BookPage from "src/pages/BookPage";
import ContactPage from "src/pages/ContactPage";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RejectedRoute from "./components/RejectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Admin from "./pages/Admin";
import NotPermitted from "./pages/NotPermitted";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.admin,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          path: path.admin,
          element: (
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: path.home,
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />,
        },
        {
          path: path.register,
          element: <Register />,
        },
      ],
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
    {
      path: path.bookPage,
      element: (
        <MainLayout>
          <BookPage />
        </MainLayout>
      ),
    },
    {
      path: path.contactPage,
      element: (
        <MainLayout>
          <ContactPage />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: path.notPermitted,
      element: <NotPermitted />,
    },
  ]);
  return routeElements;
}
