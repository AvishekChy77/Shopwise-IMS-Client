import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [saleschartData, setSalesChartData] = useState({
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Sales count by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      const newSalesChartData = {
        ...saleschartData,
        series: [
          { name: "Sales", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        ],
      };
      setSalesChartData(newSalesChartData);
      return res.data;
    },
  });
  console.log(payments);
  console.log(saleschartData);
  const totalInvest = payments?.reduce(
    (total, item) => total + item.productlists.productionCost,
    0
  );
  const totalSellingPrice = payments?.reduce(
    (total, item) => total + item.productlists.sellingPrice,
    0
  );
  const totalProfit = totalSellingPrice - totalInvest;
  return (
    <>
      <Helmet>
        <title>ShopWise | Sales Summary</title>
      </Helmet>
      <div>
        <div className=" p-4 my-5 max-w-3xl mx-auto  pb-10 lg:px-10">
          <div className="grid mb-5 grid-cols-1 md:grid-cols-3 gap-5 align-middle">
            {/* <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-[#ff3434] to-[#e09c9c]">
              <div className="flex items-start justify-center flex-col-reverse pl-2">
                <p>Total Sale</p>
                <p>{payments?.length}</p>
              </div>
            </div> */}
            <div className="h-32 lg:h-40 rounded">
              <ReactApexChart
                options={saleschartData.options}
                series={saleschartData.series}
                type="line"
                height={200}
              />
            </div>
            <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-green-500 to-green-200">
              <div className="flex items-start justify-center flex-col-reverse pl-2">
                <p>Total Invest</p>
                <p>{totalInvest}</p>
              </div>
            </div>
            <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-sky-500 to-sky-200">
              <div className="flex items-start justify-center flex-col-reverse pl-2">
                <p>Total Profit</p>
                <p>{totalProfit}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto text-center">
            <table className="table">
              {/* head */}
              <thead className=" bg-cyan-900 text-white ">
                <tr>
                  <th className="px-2">Name</th>
                  <th className="px-2">Payment Date</th>
                  <th className="px-2">Profit</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-2">{payment.productlists.productName}</td>
                    <td className="px-2">{payment.date}</td>
                    <td className="px-2">
                      {payment.productlists.sellingPrice -
                        payment.productlists.productionCost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
