import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { IoMail } from "react-icons/io5";
import Avatar from "../../../Components/Avatar";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageShops = () => {
  const axiosSecure = useAxiosSecure();
  const { data: shops, isPending } = useQuery({
    queryKey: ["admin-shops"],
    queryFn: async () => {
      const res = await axiosSecure.get("/shops");
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="mx-auto max-w-4xl p-10 text-center">
        <span className="loading loading-spinner loading-lg text-brand-700"></span>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Manage Shops</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-950">Manage shops</h1>
        <p className="text-sm text-slate-400">
          {shops?.length} shops registered on the platform
        </p>
      </div>

      <div className="surface overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
              <th>Shop</th>
              <th>Category</th>
              <th>Product limit</th>
              <th>Manager</th>
              <th className="text-right">Notice</th>
            </tr>
          </thead>
          <tbody>
            {shops?.map((shop) => (
              <tr
                key={shop._id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-50/50"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar src={shop.shopLogo} name={shop.shopName} className="size-10" />
                    <div>
                      <p className="font-semibold text-brand-950">{shop.shopName}</p>
                      <p className="text-xs text-slate-400">{shop.location}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="rounded-full bg-brand-700/10 px-3 py-1 text-xs font-bold text-brand-700">
                    {shop.shopDescription}
                  </span>
                </td>
                <td className="text-slate-600">{shop.limit}</td>
                <td className="text-slate-600">{shop.manager || shop.email}</td>
                <td>
                  <div className="flex justify-end">
                    <button
                      aria-label="Send notice"
                      className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-brand-700/10 hover:text-brand-700"
                    >
                      <IoMail size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageTransition>
  );
};

export default ManageShops;
