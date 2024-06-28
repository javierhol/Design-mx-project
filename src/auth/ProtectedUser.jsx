import { Navigate, Outlet } from "react-router-dom";

export const ProtectedUser = ({ rol, redirectTo, children }) => {
  let getRole = localStorage.getItem("rol");

  if (getRole !== rol) {
     redirectTo = window.history.back();
     localStorage.clear();
    return <Navigate to={redirectTo} />;
  }
    <Navigate to={redirectTo} />;

  return children ? children : <Outlet />;
};
