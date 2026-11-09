import { useContext } from "react";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { HiMiniWallet } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { MdLogout, MdOutlineAddchart, MdTipsAndUpdates } from "react-icons/md";
import DashboardContent from "../Components/Dashboard/DashboardContent";
import Logo from "../Components/Logo";
import MenuItem from "../Components/MenuItem/MenuItem";
import useAdmin from "../Hooks/useAdmin";
import useManager from "../Hooks/useManager";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);
  const { isManager } = useManager();
  const { isAdmin } = useAdmin();
  const handleSignOut = () => {
    logOut().catch(() => {});
  };

  return (
    <div className="drawer bg-slate-50 font-Poppins lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <DashboardContent />
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="flex min-h-full w-72 flex-col border-r border-slate-200 bg-white p-5">
          <div className="mb-8 px-2">
            <Logo />
          </div>

          <nav className="flex flex-1 flex-col gap-1.5">
            {isManager && (
              <>
                <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Shop
                </p>
                <MenuItem
                  icon={FaSitemap}
                  label="Product Management"
                  address="/dashboard/productManagement"
                />
                <MenuItem
                  icon={MdOutlineAddchart}
                  label="Add Product"
                  address="/dashboard/addProduct"
                />
                <MenuItem
                  icon={BsFillCollectionFill}
                  label="Sales Collection"
                  address="/dashboard/salesCollection"
                />
                <MenuItem
                  icon={IoCartOutline}
                  label="Shop Cart"
                  address="/dashboard/shopCart"
                />
                <p className="mt-4 px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Finance
                </p>
                <MenuItem
                  icon={HiMiniWallet}
                  label="Sales Summary"
                  address="/dashboard/salesSummary"
                />
                <MenuItem
                  icon={MdTipsAndUpdates}
                  label="Subscription"
                  address="/dashboard/subscription"
                />
              </>
            )}
            {isAdmin && (
              <>
                <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Administration
                </p>
                <MenuItem
                  icon={GrUserManager}
                  label="Manage Shops"
                  address="/dashboard/manageShops"
                />
                <MenuItem
                  icon={HiMiniWallet}
                  label="Sales Summary"
                  address="/dashboard/adminSalesSummary"
                />
              </>
            )}
          </nav>

          <button
            onClick={handleSignOut}
            className="mt-6 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
          >
            <MdLogout className="size-5" /> Log out
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
