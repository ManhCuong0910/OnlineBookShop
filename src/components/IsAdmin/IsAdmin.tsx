import { useSelector } from "react-redux";
import { Location, Navigate, Outlet, useLocation } from "react-router-dom";
import path from "src/constants/path";
import { RootState } from "src/redux/store";

export default function IsAdmin() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.account
  );
  return (
    <>
      {user.role === "ADMIN" ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to={path.notPermitted} />
      )}
    </>
  );
}
