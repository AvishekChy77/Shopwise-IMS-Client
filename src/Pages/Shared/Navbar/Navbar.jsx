import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import { AuthContext } from "../../../Provider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const { userDB } = useUserData();

  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error.message));
  };
  const Navbar = (
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
  return (
    <div className="navbar  pt-1">
      <div className="w-2/3 md:w-1/2 navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn px-2 btn-ghost text-black lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 md:h-5 w-4 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-white bg-black mt-3 z-[1] p-2 shadow Navbar rounded-box w-52"
          >
            {Navbar}
          </ul>
        </div>
        <div className="font-logo flex items-center text-xl md:text-2xl lg:text-3xl font-bold">
          <Link to="/">
            <span className=" text-[#265073]">Shop</span>
            <span className=" text-[#A2C579]">Wise</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base md:text-lg font-medium flex gap-3 md:gap-7 Navbar">
          {Navbar}
        </ul>
      </div>
      <div className="w-1/3 md:w-1/2 navbar-end">
        {user?.email ? (
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-52"
            >
              <li>
                <button className="btn btn-sm btn-ghost">
                  {user.displayName}
                </button>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-ghost"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="btn btn-sm btn-outline text-black hover:text-white hover:bg-black">
              LogIn
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
