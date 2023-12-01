import { Helmet } from "react-helmet-async";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const ShopCart = () => {
  const axiosSecure = useAxiosSecure();

  const { cart, refetch } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Product has been removed form the cart.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>ShopWise | Cart</title>
      </Helmet>
      <div className=" my-10 flex flex-col items-center space-y-5 ">
        <h2 className=" text-xl md:text-2xl mb-5 text-center font-semibold text-sky-600">
          Your Cart
        </h2>
        <div className=" p-4 w-full mx-auto lg:px-10">
          <div className="mb-7 flex justify-between items-center">
            <h2 className=" text:xl sm:text-2xl font-bold">
              Total orders: {cart.length}
            </h2>
            <h2 className="text:xl sm:text-2xl font-bold">
              Total price: Tk{totalPrice}
            </h2>
            {cart.length ? (
              <Link to="/dashboard/payment">
                <button className="btn btn-outline border-black text-black hover:text-white hover:bg-black btn-sm">
                  Pay
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="btn btn-outline hover:bg-black btn-sm"
              >
                Pay
              </button>
            )}
          </div>
          <div className="overflow-x-auto text-center">
            <table className="table ">
              {/* head */}
              <thead className="text-black">
                <tr>
                  <th className="px-2">#</th>
                  <th className="px-2">Image</th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Price</th>
                  <th className="px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <th className=" text-xs px-2">{index + 1}</th>
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img
                              src={item.img}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className=" text-xs px-2">{item.productName}</td>
                    <td className=" text-xs px-2">Tk{item.price}</td>
                    <td className="px-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className=""
                      >
                        <IoTrashBin className=" hover:text-red-500" size={26} />{" "}
                      </button>
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

export default ShopCart;
