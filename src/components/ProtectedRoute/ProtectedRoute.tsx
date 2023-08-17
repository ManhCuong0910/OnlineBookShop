import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import path from "src/constants/path";
import NotPermitted from "src/pages/NotPermitted";
import { RootState } from "src/redux/store";

interface Props {
  children?: React.ReactNode;
}
const RoleBaseRoute = ({ children }: Props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  console.log(
    "file: ProtectedRoute.tsx:12 ~ RoleBaseRoute ~ isAdminRoute:",
    isAdminRoute
  );

  const user = useSelector((state: RootState) => state.account.user);
  console.log(user);
  const userRole = user.role;

  if (isAdminRoute && userRole === "ADMIN") {
    return <>{children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  console.log(
    "file: ProtectedRoute.tsx:29 ~ ProtectedRoute ~ isAuthenticated:",
    isAuthenticated
  );

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to={path.login} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
