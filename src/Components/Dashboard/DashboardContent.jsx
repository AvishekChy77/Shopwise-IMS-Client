import { FaBars } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const DashboardContent = () => {
  return (
    <div className="drawer-content min-h-screen">
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
      <Topbar />
      <div className="flex flex-col  px-4 mt-5 lg:px-10 bg-white w-[390px] sm:w-[500px] md:w-[650px] lg:w-[800px] xl:w-[950px] mx-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardContent;
