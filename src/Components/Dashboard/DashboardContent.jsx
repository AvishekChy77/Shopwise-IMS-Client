import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Logo from "../Logo";
import Topbar from "./Topbar";

const DashboardContent = () => {
  return (
    <div className="drawer-content min-h-screen">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4 lg:hidden">
        <Logo />
        <label
          htmlFor="my-drawer-2"
          className="grid size-10 cursor-pointer place-items-center rounded-xl text-brand-900 transition hover:bg-brand-700/10"
        >
          <FaBars size={22} />
        </label>
      </div>
      <Topbar />
      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardContent;
