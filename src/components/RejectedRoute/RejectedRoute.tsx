import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "src/constants/path";
import { RootState } from "src/redux/store";

export default function RejectedRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  return (
    <>{!isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.home} />}</>
  );
}
