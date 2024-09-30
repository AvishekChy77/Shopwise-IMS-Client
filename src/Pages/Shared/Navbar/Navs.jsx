import { NavLink } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";

const Navs = () => {
  const { userDB } = useUserData();
  return (
    <>
      <NavLink className="nav" to="/">
        Home
      </NavLink>
      <NavLink target="_blank" className="nav" to="/watchDemo">
        Watch Demo
      </NavLink>
      {userDB?.role !== "manager" && userDB?.role !== "admin" && (
        <NavLink className="nav" to="/createStore">
          Create Store
        </NavLink>
      )}
      {userDB?.role === "manager" && (
        <NavLink className="nav" to="/dashboard/productManagement">
          DashBoard
        </NavLink>
      )}
      {userDB?.role === "manager" && (
        <NavLink className="nav" to="/feedback">
          Feedback
        </NavLink>
      )}
      {userDB?.role === "admin" && (
        <NavLink className="nav" to="/dashboard/manageShops">
          DashBoard
        </NavLink>
      )}
      <NavLink className="nav" to="/register">
        Register
      </NavLink>
    </>
  );
};

export default Navs;
