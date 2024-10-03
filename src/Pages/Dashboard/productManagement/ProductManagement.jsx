import { Helmet } from "react-helmet-async";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";

const ProductManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { shop, isShopLoading, products, isProductsLoading, refetch } =
    useShopProductDB();
  const isLimitReached = shop?.limit === products?.length;
  console.log(shop, products, isLimitReached);

  const handleDelete = (item) => {
    console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${item._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isShopLoading) {
    return (
      <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>ShopWise | Product Management</title>
      </Helmet>
      <div className="space-y-5  p-10">
        {products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-10">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Add your first product today!
            </h2>
            <Link to="/dashboard/addProduct">
              <IoMdAddCircleOutline
                size={80}
                color="grey"
                className=" opacity-75 hover:opacity-100 cursor-pointer"
              />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              {isProductsLoading ? (
                <div className="max-w-4xl mx-auto p-5 mt-5 text-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <h2 className="text-lg desktop:text-xl font-semibold">
                  Total Products:{products?.length}
                </h2>
              )}
            </div>
            <div className="overflow-x-auto text-center">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-black">
                    <th className="px-2">#</th>
                    <th className="px-2">IMAGE</th>
                    <th className="px-2">NAME</th>
                    <th className="px-2">Quantity</th>
                    <th className="px-2">Sold</th>
                    <th className="px-2">Update</th>
                    <th className="px-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item, idx) => (
                    <tr key={item._id}>
                      <td className="px-2">{idx}</td>
                      <td className="px-2">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <div className="">
                              <img
                                className="bg-slate-200 border border-zinc-400 object-contain w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                src={item.img}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2">{item.productName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.saleCount}</td>
                      <td>
                        <Link to={`/dashboard/updateProduct/${item._id}`}>
                          <button>
                            <CiEdit size={24} />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item)}>
                          <GoTrash className=" hover:text-red-500" size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductManagement;
