import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { IoMail } from "react-icons/io5";
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
  const handlebill = () => {
    //
  };
  return (
    <>
      <Helmet>
        <title>ShopWise | Manage Shops</title>
      </Helmet>
      <div className=" flex flex-col gap-5 items-center">
        <h2 className=" text-xl md:text-3xl text-center font-semibold text-black">
          Shops: {shops?.length}
        </h2>
        {isPending && (
          <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <div className="overflow-x-auto w-full text-center">
          <table className="table">
            {/* head */}
            <thead className=" bg-cyan-900 text-white ">
              <tr>
                <th className="px-2">Name</th>
                <th className="px-2">Logo</th>
                <th className="px-2">Product limit</th>
                <th className="px-2">Description</th>
                <th className="px-2">Notice</th>
              </tr>
            </thead>
            <tbody>
              {shops?.map((shop) => (
                <tr key={shop._id}>
                  <td className="px-2">{shop.shopName}</td>
                  <td className="px-2">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img
                            src={shop.shopLogo}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2">{shop.limit}</td>
                  <td className="px-2">{shop.shopDescription}</td>
                  <td className="px-2">
                    <button onClick={handlebill} className="">
                      <IoMail className=" hover:text-blue-500" size={26} />{" "}
                    </button>
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

export default ManageShops;
