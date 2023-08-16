import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import HeaderAdmin from "src/components/HeaderAdmin";

export default function AdminLayout() {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </>
  );
}
