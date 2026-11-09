import { Helmet } from "react-helmet-async";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PageTransition } from "../../../Components/Motion";
import ProductThumb from "../../../Components/ProductThumb";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const ShopCart = () => {
  const axiosSecure = useAxiosSecure();
  const { cart, refetch } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from cart?",
      text: "This item will be taken out of the current sale.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Product has been removed from the cart.",
              icon: "success",
              confirmButtonColor: "#265073",
            });
          }
        });
      }
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Cart</title>
      </Helmet>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">Your cart</h1>
          <p className="text-sm text-slate-400">{cart.length} items in this sale</p>
        </div>
        <div className="flex items-center gap-5">
          <p className="font-display text-xl font-extrabold text-brand-700">
            Total: Tk {totalPrice}
          </p>
          {cart.length ? (
            <Link to="/dashboard/payment" className="btn-brand !px-6 !py-2.5 text-sm">
              Pay now
            </Link>
          ) : (
            <button disabled className="btn-brand !px-6 !py-2.5 text-sm">
              Pay now
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="surface mx-auto max-w-md p-12 text-center">
          <p className="text-5xl">🛒</p>
          <p className="font-display mt-4 text-xl font-bold text-brand-950">
            Your cart is empty
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Add products from the sales collection to start a sale.
          </p>
          <Link
            to="/dashboard/salesCollection"
            className="btn-brand mt-6 !px-5 !py-2.5 text-sm"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="surface overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                <th>#</th>
                <th>Product</th>
                <th>Price</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-50/50"
                >
                  <td className="text-slate-400">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <ProductThumb src={item.img} alt={item.productName} />
                      <span className="font-semibold text-brand-950">
                        {item.productName}
                      </span>
                    </div>
                  </td>
                  <td className="font-semibold text-slate-600">Tk {item.price}</td>
                  <td>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(item._id)}
                        aria-label="Remove from cart"
                        className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-500"
                      >
                        <IoTrashBin size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageTransition>
  );
};

export default ShopCart;
