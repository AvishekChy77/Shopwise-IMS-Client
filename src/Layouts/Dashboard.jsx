import { useContext } from "react";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { HiMiniWallet } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { MdLogout, MdOutlineAddchart, MdTipsAndUpdates } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import MenuItem from "../Components/MenuItem/MenuItem";
import useAdmin from "../Hooks/useAdmin";
import useManager from "../Hooks/useManager";
import Footer from "../Pages/Shared/Footer/Footer";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);
  const { isManager } = useManager();
  const { isAdmin } = useAdmin();
  const handleSignOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Page content here */}
        <div className="flex p-4 justify-between lg:hidden">
          <div className="font-logo text-xl md:text-2xl lg:text-3xl font-bold">
            <Link to="/">
              <span className=" text-[#265073]">Shop</span>
              <span className=" text-[#A2C579]">Wise</span>
            </Link>
          </div>
          <label htmlFor="my-drawer-2" className=" cursor-pointer ">
            <FaBars className="mb-5 " size={28} />
          </label>
        </div>
        <div className="flex flex-col min-h-screen">
          <div className="px-4 my-5 lg:p-10 w-[390px] sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[950px] mx-auto flex-grow">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className="font-logo mb-10 text-xl md:text-2xl lg:text-3xl font-bold">
            <Link to="/">
              <span className=" text-[#265073]">Shop</span>
              <span className=" text-[#A2C579]">Wise</span>
            </Link>
          </div>

          {isManager && (
            <>
              <MenuItem
                icon={FaSitemap}
                label="Product Management"
                address="/dashboard/productManagement"
              ></MenuItem>
              <MenuItem
                icon={MdOutlineAddchart}
                label="Add Product"
                address="/dashboard/addProduct"
              ></MenuItem>
              <MenuItem
                icon={MdTipsAndUpdates}
                label="Subscription"
                address="/dashboard/subscription"
              ></MenuItem>
              <MenuItem
                icon={BsFillCollectionFill}
                label="Sales Collection"
                address="/dashboard/salesCollection"
              ></MenuItem>
              <MenuItem
                icon={IoCartOutline}
                label="Shop Cart"
                address="/dashboard/shopCart"
              ></MenuItem>
              <MenuItem
                icon={HiMiniWallet}
                label="Sales Summary"
                address="/dashboard/salesSummary"
              ></MenuItem>
            </>
          )}
          {isAdmin && (
            <>
              <MenuItem
                icon={GrUserManager}
                label="Manage Shops"
                address="/dashboard/manageShops"
              ></MenuItem>
              <MenuItem
                icon={HiMiniWallet}
                label="Sales Summary"
                address="/dashboard/adminSalesSummary"
              ></MenuItem>
            </>
          )}
          <button onClick={handleSignOut}>
            <MenuItem
              icon={MdLogout}
              label="Log Out"
              address="/login"
            ></MenuItem>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
