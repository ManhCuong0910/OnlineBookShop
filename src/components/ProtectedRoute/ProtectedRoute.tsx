import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "src/constants/path";
import { RootState } from "src/redux/store";

export default function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  console.log(
    "file: ProtectedRoute.tsx:10 ~ ProtectedRoute ~ isAuthenticated:",
    isAuthenticated
  );

  return (
    <>{isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.login} />}</>
  );
}
