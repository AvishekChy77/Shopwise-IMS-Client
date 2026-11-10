import { FaBell } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import useNotices from "../../Hooks/useNotices";
import useShopProductDB from "../../Hooks/useShopProductDB";
import Avatar from "../Avatar";

const NoticeBell = () => {
  const { unread, notices, markRead } = useNotices();
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        aria-label="Notices"
        className="relative grid size-10 cursor-pointer place-items-center rounded-xl text-slate-500 transition hover:bg-brand-700/10 hover:text-brand-700"
      >
        <FaBell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-lift"
      >
        <p className="px-2 pb-2 font-display font-bold text-brand-950">Notices</p>
        {notices.length === 0 ? (
          <p className="px-2 py-4 text-center text-sm text-slate-400">No notices yet</p>
        ) : (
          <ul className="max-h-80 space-y-1 overflow-y-auto">
            {notices.map((n) => (
              <li key={n._id}>
                <button
                  onClick={() => !n.read && markRead(n._id)}
                  className={`w-full rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 ${
                    n.read ? "" : "bg-brand-50"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand-950">
                    {!n.read && <span className="size-2 shrink-0 rounded-full bg-brand-600" />}
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{n.message}</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {new Date(n.createdAt).toLocaleString("en-GB")}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Topbar = () => {
  const { shop, isShopLoading } = useShopProductDB();

  return (
    <div className="sticky top-0 z-30 hidden items-center justify-between border-b border-slate-200 bg-white/90 px-8 py-4 backdrop-blur-lg lg:flex">
      <h2 className="font-display text-xl font-bold text-brand-950">Dashboard</h2>
      <div className="flex items-center gap-4">
        {shop && (
          <Link
            to="/dashboard/addProduct"
            className="flex items-center gap-2 rounded-xl bg-brand-700/10 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-700 hover:text-white"
          >
            <IoMdAddCircleOutline size={20} /> Add product
          </Link>
        )}
        <NoticeBell />
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
