import { Navigate, Outlet } from "react-router-dom";
import path from "src/constants/path";
interface Props {
  isAuthenticated?: boolean;
}
export default function RejectedRoute({ isAuthenticated }: Props) {
  return (
    <>{!isAuthenticated ? <Outlet></Outlet> : <Navigate to={path.home} />}</>
  );
}
