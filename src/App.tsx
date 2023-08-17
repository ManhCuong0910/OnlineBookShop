import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { fetchAccount } from "./apis/auth.api";
import Loading from "./components/Loading";
import path from "./constants/path";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import Admin from "./pages/Admin";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { doGetAccountAction } from "./redux/account/accountSlice";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.account);
  const getAccount = async () => {
    if (location.pathname === path.login || location.pathname === path.register)
      return;
    const res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data.data.user));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);
  const router = createBrowserRouter([
    {
      path: path.home,
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <ProductList /> },
        { path: path.bookPage, element: <BookPage /> },
        { path: path.contactPage, element: <ContactPage /> },
      ],
    },

    {
      path: path.admin,
      element: <AdminLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: path.login,
      element: <Login />,
    },
    {
      path: path.register,
      element: <Register />,
    },
  ]);
  return (
    <>
      {isLoading === false ||
      location.pathname === path.home ||
      location.pathname === path.login ||
      location.pathname === path.register ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
