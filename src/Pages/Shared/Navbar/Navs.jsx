import { useContext } from "react";
import { NavLink } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import { AuthContext } from "../../../Provider/AuthProvider";

const Navs = ({ mobile = false }) => {
  const { user } = useContext(AuthContext);
  const { userDB } = useUserData();
  const cls = mobile
    ? "nav-link block w-full rounded-lg px-3 py-2.5"
    : "nav-link";
  const role = userDB?.role;

  return (
    <>
      <NavLink className={cls} to="/">
        Home
      </NavLink>
      <NavLink className={cls} to="/watchDemo">
        Watch Demo
      </NavLink>
      {role !== "manager" && role !== "admin" && (
        <NavLink className={cls} to="/createStore">
          Create Store
        </NavLink>
      )}
      {role === "manager" && (
        <>
          <NavLink className={cls} to="/dashboard/productManagement">
            Dashboard
          </NavLink>
          <NavLink className={cls} to="/feedback">
            Feedback
          </NavLink>
        </>
      )}
      {role === "admin" && (
        <NavLink className={cls} to="/dashboard/manageShops">
          Dashboard
        </NavLink>
      )}
      {!user?.email && (
        <NavLink className={cls} to="/register">
          Register
        </NavLink>
      )}
    </>
  );
};

export default Navs;
