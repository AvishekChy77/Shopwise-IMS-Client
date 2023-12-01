import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { IoMail } from "react-icons/io5";
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
  const totalProducts = products?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalSale = products?.reduce(
    (total, item) => total + item.saleCount,
    0
  );
  return (
    <>
      <Helmet>
        <title>ShopWise | Sales Summary</title>
      </Helmet>
      <div className="flex flex-col items-center gap-5">
        <h2 className=" text-xl md:text-3xl text-center font-semibold text-black">
          Sales
        </h2>
        <div className="grid w-full mb-5 grid-cols-1 md:grid-cols-3 gap-5 align-middle">
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-[#ff3434] to-[#e09c9c]">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>{}</p>
              <p>Total Income</p>
            </div>
          </div>
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-green-500 to-green-200">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>{totalProducts}</p>
              <p>Total Product</p>
            </div>
          </div>
          <div className="h-32 lg:h-40 rounded text-white text-lg font-medium flex items-center justify-center shadow-lg  bg-gradient-to-r from-sky-500 to-sky-200">
            <div className="flex items-start justify-center flex-col pl-2">
              <p>{totalSale}</p>
              <p>Total Sales</p>
            </div>
          </div>
        </div>
        <h2 className="mt-10 text-xl md:text-3xl text-center font-semibold text-black">
          Users
        </h2>
        <div className="overflow-x-auto w-full text-center">
          <table className="table">
            {/* head */}
            <thead className=" bg-cyan-900 text-white ">
              <tr>
                <th className="px-2">Name</th>
                <th className="px-2">Email</th>
                <th className="px-2">Shop Name</th>
                <th className="px-2">Role</th>
                <th className="px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="px-2">{user.name}</td>
                  <td className="px-2">{user.email}</td>
                  <td className="px-2">{user.shop ? user.shop : "none"}</td>
                  <td className="px-2">{user.role ? user.role : "user"}</td>
                  <td className="px-2">
                    {user.shop || user.role === "admin" ? (
                      ""
                    ) : (
                      <button className="">
                        <IoMail className=" hover:text-blue-500" size={26} />{" "}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminSalesData;
