import { FiSearch } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import useShopProductDB from "../../Hooks/useShopProductDB";
import { Link } from "react-router-dom";

const Topbar = () => {
  const { shop, isShopLoading } = useShopProductDB();

  return (
    <div className="flex items-center p-4 justify-between bg-white">
      <h2 className="text-lg xl:text-xl font-medium">Dashboard</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search your product"
          className="md:w-80 p-1.5 pl-10 bg-[#F9FAFB] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <FiSearch className="absolute left-3 top-3 text-gray-500" />
      </div>
      <Link to="/dashboard/addProduct"><IoMdAddCircleOutline size={30} /></Link>
     {!isShopLoading && <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 object-contain border rounded-full bg-slate-200"
          src={shop?.shopLogo}
          alt=""
        />
        <h4 className="text-lg font-medium">{shop.shopName}</h4>
      </div>}
    </div>
  );
};

export default Topbar;
