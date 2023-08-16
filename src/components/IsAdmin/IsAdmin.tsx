import { useSelector } from "react-redux";
import { Location, Navigate, useLocation } from "react-router-dom";
import path from "src/constants/path";
import { RootState } from "src/redux/store";

interface Props {
  children?: React.ReactNode;
}
export default function IsAdmin({ children }: Props) {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.account
  );
  console.log("file: IsAdmin.tsx:11 ~ IsAdmin ~ user:", user);
  console.log(isAuthenticated);
  const location: Location = useLocation();
  return (
    <>
      {user.role === "ADMIN" ? (
        <>{children}</>
      ) : (
        <Navigate to={path.notPermitted} />
      )}
    </>
  );
}
