import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useManager from "../Hooks/useManager";
import { AuthContext } from "../Provider/AuthProvider";

const ManagerRoutes = ({ children }) => {
  const { isManager, isManagerLoading } = useManager();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || isManagerLoading) {
    console.log(loading, isManagerLoading);
    return (
      <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isManager) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default ManagerRoutes;
