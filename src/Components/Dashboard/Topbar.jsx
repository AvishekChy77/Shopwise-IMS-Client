import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import useShopProductDB from "../../Hooks/useShopProductDB";
import Avatar from "../Avatar";

const Topbar = () => {
  const { shop, isShopLoading } = useShopProductDB();

  return (
    <div className="sticky top-0 z-30 hidden items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 backdrop-blur-lg lg:flex">
      <h2 className="font-display text-xl font-bold text-brand-950">Dashboard</h2>
      <div className="flex items-center gap-5">
        <Link
          to="/dashboard/addProduct"
          className="flex items-center gap-2 rounded-xl bg-brand-700/10 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-700 hover:text-white"
        >
          <IoMdAddCircleOutline size={20} /> Add product
        </Link>
        {!isShopLoading && shop?.shopName && (
          <div className="flex items-center gap-2.5">
            <Avatar src={shop?.shopLogo} name={shop?.shopName} className="size-10" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-brand-950">{shop.shopName}</p>
              <p className="text-xs text-slate-400">{shop.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
