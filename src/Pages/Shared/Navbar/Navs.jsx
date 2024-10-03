import { NavLink } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";

const Navs = () => {
  const { userDB } = useUserData();
  return (
    <>
      <NavLink className="nav text-sm desktop:text-base pl-5 lg:pl-0" to="/">
        Home
      </NavLink>
      <NavLink
        target="_blank"
        className="nav text-sm desktop:text-base pl-5 lg:pl-0"
        to="/watchDemo"
      >
        Watch Demo
      </NavLink>
      {userDB?.role !== "manager" && userDB?.role !== "admin" && (
        <NavLink
          className="nav text-sm desktop:text-base pl-5 lg:pl-0"
          to="/createStore"
        >
          Create Store
        </NavLink>
      )}
      {userDB?.role === "manager" && (
        <NavLink
          className="nav text-sm desktop:text-base pl-5 lg:pl-0"
          to="/dashboard/productManagement"
        >
          DashBoard
        </NavLink>
      )}
      {userDB?.role === "manager" && (
        <NavLink
          className="nav text-sm desktop:text-base pl-5 lg:pl-0"
          to="/feedback"
        >
          Feedback
        </NavLink>
      )}
      {userDB?.role === "admin" && (
        <NavLink
          className="nav text-sm desktop:text-base pl-5 lg:pl-0"
          to="/dashboard/manageShops"
        >
          DashBoard
        </NavLink>
      )}
      <NavLink
        className="nav text-sm desktop:text-base pl-5 lg:pl-0"
        to="/register"
      >
        Register
      </NavLink>
    </>
  );
};

export default Navs;
