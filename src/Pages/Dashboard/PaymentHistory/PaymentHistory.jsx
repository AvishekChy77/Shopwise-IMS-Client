import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import { FaArrowTrendUp, FaSackDollar, FaWallet } from "react-icons/fa6";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  // monthly sale counts derived from the real payment records
  const monthlyCounts = MONTHS.map(
    (_, m) =>
      payments.filter((p) => {
        const d = new Date(p.date);
        return !isNaN(d) && d.getMonth() === m;
      }).length
  );

  const chart = {
    series: [{ name: "Sales", data: monthlyCounts }],
    options: {
      chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
      colors: ["#265073"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.35, opacityTo: 0.02 },
      },
      grid: { borderColor: "#e2e8f0", strokeDashArray: 4 },
      xaxis: { categories: MONTHS, labels: { style: { colors: "#94a3b8" } } },
      yaxis: { labels: { style: { colors: "#94a3b8" } } },
    },
  };

  const totalInvest = payments.reduce(
    (total, item) => total + (item.productlists?.productionCost || 0),
    0
  );
  const totalSellingPrice = payments.reduce(
    (total, item) => total + (item.productlists?.sellingPrice || 0),
    0
  );
  const totalProfit = totalSellingPrice - totalInvest;

  const stats = [
    { label: "Total sales", value: payments.length, icon: <FaSackDollar /> },
    { label: "Total invest", value: `Tk ${totalInvest}`, icon: <FaWallet /> },
    { label: "Total profit", value: `Tk ${totalProfit}`, icon: <FaArrowTrendUp /> },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Sales Summary</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-950">Sales summary</h1>
        <p className="text-sm text-slate-400">Your shop&apos;s performance at a glance</p>
      </div>

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="surface flex items-center gap-4 p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-900 text-lg text-white">
              {s.icon}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {s.label}
              </p>
              <p className="font-display text-2xl font-extrabold text-brand-950">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="surface mb-6 p-6">
        <h3 className="font-display mb-2 font-bold text-brand-950">Sales by month</h3>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="area"
          height={260}
        />
      </div>

      <div className="surface overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
              <th>Product</th>
              <th>Payment date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-50/50"
              >
                <td className="font-semibold text-brand-950">
                  {payment.productlists?.productName}
                </td>
                <td className="text-slate-500">{payment.date}</td>
                <td className="font-semibold text-leaf-600">
                  Tk{" "}
                  {(payment.productlists?.sellingPrice || 0) -
                    (payment.productlists?.productionCost || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-400">
            No completed sales yet — finished payments will appear here.
          </p>
        )}
      </div>
    </PageTransition>
  );
};

export default PaymentHistory;
