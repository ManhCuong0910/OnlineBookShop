import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "src/pages/NotPermitted";
import { RootState } from "src/redux/store";

interface Props {
  children?: React.ReactNode;
}
const RoleBaseRoute = ({ children }: Props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state: RootState) => state.account.user);
  const userRole = user.role;

  if (isAdminRoute && userRole === "ADMIN") {
    return <>{children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.account);
  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
