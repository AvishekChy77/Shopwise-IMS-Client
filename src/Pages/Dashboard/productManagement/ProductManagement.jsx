import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";

const ProductManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { shop, isShopLoading, products, isProductsLoading, refetch } =
    useShopProductDB();
  console.log(shop, products);

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
  if(isShopLoading){
    return <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
  }

  return (
    <>
      <Helmet>
        <title>ShopWise | Product Management</title>
      </Helmet>
      <div className="space-y-5">

        {products?.length === 0 ? (
          <div className=" text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold my-5">
              Add your first product today!
            </h2>
            <Link to="/dashboard/addProduct">
              <button
                disabled={shop?.limit === products?.length}
                className="btn btn-sm btn-outline text-black hover:text-white hover:bg-black"
              >
                Add Product
              </button>
            </Link>
          </div>
        ) : (
          <div className=" space-y-5">
            <div className="flex justify-between items-center">
              <h2 className=" text-xl md:text-2xl font-semibold">
                Total Products:{products?.length}
              </h2>
              {isProductsLoading && (
                <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
              <Link to="/dashboard/addProduct">
                <button
                  disabled={shop?.limit === products?.length}
                  className="btn btn-sm btn-outline text-black hover:text-white hover:bg-black"
                >
                  Add Product
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto text-center">
              <table className="table">
                {/* head */}
                <thead className=" bg-cyan-900 text-white ">
                  <tr>
                    <th className="px-2">IMAGE</th>
                    <th className="px-2">NAME</th>
                    <th className="px-2">Quantity</th>
                    <th className="px-2">Sold</th>
                    <th className="px-2">Update</th>
                    <th className="px-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-2">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <div className="">
                              <img className="border border-zinc-400 object-contain w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                src={item.img}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2">{item.productName}</td>
                      <td className="px-2">{item.quantity}</td>
                      <td className="px-2">{item.saleCount}</td>
                      <td className="px-2">
                        <Link to={`/dashboard/updateProduct/${item._id}`}>
                          <button>
                            <FaEdit size={26} />
                          </button>
                        </Link>
                      </td>
                      <td className="px-2">
                        <button onClick={() => handleDelete(item)}>
                          <IoTrashBin
                            className=" hover:text-red-500"
                            size={26}
                          />
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
