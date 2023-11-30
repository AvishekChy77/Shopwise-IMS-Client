import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";

const AdminRoutes = ({ children }) => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || isAdminLoading) {
    console.log(loading, isAdminLoading);
    return (
      <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoutes;
