import { Navigate, Outlet, useRoutes } from "react-router-dom";
import path from "src/constants/path";
import MainLayout from "src/layouts/MainLayout";
import BookPage from "src/pages/BookPage";
import ContactPage from "src/pages/ContactPage";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import IsAdmin from "./components/IsAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
// import RejectedRoute from "./components/RejectedRoute";
import Admin from "./pages/Admin";
import NotPermitted from "./pages/NotPermitted";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function useRouteElements() {
  function RejectedRoute() {
    const { isAuthenticated } = useSelector(
      (state: RootState) => state.account
    );
    console.log(isAuthenticated);
    return (
      <>{!isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.home} />}</>
    );
  }
  const routeElements = useRoutes([
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
      path: path.admin,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.admin,
          index: true,
          element: (
            <IsAdmin>
              <Admin />
            </IsAdmin>
          ),
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
