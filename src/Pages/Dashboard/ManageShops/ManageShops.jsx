import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { IoMail } from "react-icons/io5";
import Swal from "sweetalert2";
import Avatar from "../../../Components/Avatar";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure, { apiError } from "../../../Hooks/useAxiosSecure";

const escapeHtml = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const ManageShops = () => {
  const axiosSecure = useAxiosSecure();
  const { data: shops, isPending } = useQuery({
    queryKey: ["admin-shops"],
    queryFn: async () => {
      const res = await axiosSecure.get("/shops");
      return res.data;
    },
  });

  const sendNotice = async (shop) => {
    const { value } = await Swal.fire({
      title: `Notice to ${escapeHtml(shop.shopName)}`,
      html: `
        <input id="notice-title" class="swal2-input" placeholder="Title" maxlength="100">
        <textarea id="notice-message" class="swal2-textarea" placeholder="Message" maxlength="1000"></textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Send notice",
      confirmButtonColor: "#265073",
      preConfirm: () => {
        const title = document.getElementById("notice-title").value.trim();
        const message = document.getElementById("notice-message").value.trim();
        if (!title || !message) {
          Swal.showValidationMessage("Both a title and a message are required");
          return false;
        }
        return { title, message };
      },
    });
    if (!value) return;
    try {
      await axiosSecure.post("/notices", { email: shop.email, ...value });
      Swal.fire({
        icon: "success",
        title: "Notice sent",
        text: `${shop.manager || "The manager"} will see it in their dashboard.`,
        confirmButtonColor: "#265073",
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Not sent", text: apiError(error), confirmButtonColor: "#265073" });
    }
  };

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
              <th>Products / limit</th>
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
                <td>
                  <span className="text-sm font-semibold text-slate-600">
                    {shop.productCount ?? "—"}
                  </span>
                  <span className="text-xs text-slate-400"> / {shop.limit}</span>
                </td>
                <td className="text-slate-600">{shop.manager || shop.email}</td>
                <td>
                  <div className="flex justify-end">
                    <button
                      onClick={() => sendNotice(shop)}
                      aria-label="Send notice"
                      title="Send a notice to this shop"
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
