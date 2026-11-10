import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import {
  FaCrown,
  FaMoneyBillTrendUp,
  FaSackDollar,
  FaStore,
} from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminSalesData = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });
  const { data: users } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // platform totals are aggregated on the server from real payment records
  const { data: overview } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => (await axiosSecure.get("/stats/admin")).data,
  });

  const topSellers = [...(products || [])]
    .sort((a, b) => (b.saleCount || 0) - (a.saleCount || 0))
    .slice(0, 6);

  const chart = {
    series: [{ name: "Units sold", data: topSellers.map((p) => p.saleCount || 0) }],
    options: {
      chart: { type: "bar", toolbar: { show: false } },
      colors: ["#265073"],
      plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
      dataLabels: { enabled: false },
      grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
      xaxis: {
        categories: topSellers.map((p) =>
          (p.productName || "").length > 12
            ? p.productName.slice(0, 12) + "…"
            : p.productName
        ),
        labels: { style: { colors: "#94a3b8" } },
      },
      yaxis: { labels: { style: { colors: "#94a3b8" } } },
    },
  };

  const stats = [
    {
      label: "Sales revenue",
      value: overview ? `Tk ${overview.sales.revenue}` : "—",
      hint: overview ? `${overview.sales.orders} orders · ${overview.sales.unitsSold} units` : "",
      icon: <FaSackDollar />,
    },
    {
      label: "Subscriptions",
      value: overview ? `$${overview.subscriptions.revenue}` : "—",
      hint: overview ? `${overview.subscriptions.count} plans sold` : "",
      icon: <FaCrown />,
    },
    {
      label: "Shops",
      value: overview?.shops ?? "—",
      hint: overview ? `${overview.users} registered users` : "",
      icon: <FaStore />,
    },
    {
      label: "Products listed",
      value: overview?.products ?? "—",
      hint: overview ? `${overview.unitsInStock} units in stock` : "",
      icon: <FaMoneyBillTrendUp />,
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Sales Summary</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-950">
          Platform overview
        </h1>
        <p className="text-sm text-slate-400">
          Sales and users across every shop on ShopWise
        </p>
      </div>

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="surface flex items-center gap-4 p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-lg text-white">
              {s.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {s.label}
              </p>
              <p className="font-display text-2xl font-extrabold text-brand-950">
                {s.value}
              </p>
              {s.hint && <p className="truncate text-xs text-slate-400">{s.hint}</p>}
            </div>
          </div>
        ))}
      </div>

      {topSellers.length > 0 && (
        <div className="surface mb-6 p-6">
          <h3 className="font-display mb-2 font-bold text-brand-950">
            Top selling products
          </h3>
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="bar"
            height={260}
          />
        </div>
      )}

      <div className="surface overflow-x-auto">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="font-display font-bold text-brand-950">Users</h3>
        </div>
        <table className="table">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
              <th>Name</th>
              <th>Email</th>
              <th>Shop</th>
              <th>Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-50/50"
              >
                <td className="font-semibold text-brand-950">{user.name}</td>
                <td className="text-slate-500">{user.email}</td>
                <td className="text-slate-500">{user.shop || "—"}</td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-gold-500/20 text-gold-600"
                        : user.role === "manager"
                        ? "bg-leaf-400/20 text-leaf-700"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end">
                    {!user.shop && user.role !== "admin" && (
                      <button
                        aria-label="Send email"
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-brand-700/10 hover:text-brand-700"
                      >
                        <IoMail size={20} />
                      </button>
                    )}
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

export default AdminSalesData;
