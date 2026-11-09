import { Helmet } from "react-helmet-async";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { PageTransition } from "../../../Components/Motion";
import ProductThumb from "../../../Components/ProductThumb";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";

const ProductManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { shop, isShopLoading, products, isProductsLoading, refetch } =
    useShopProductDB();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete this product?",
      text: `"${item.productName}" will be removed permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Product has been removed.",
              icon: "success",
              confirmButtonColor: "#265073",
            });
          }
        });
      }
    });
  };

  if (isShopLoading || isProductsLoading) {
    return (
      <div className="mx-auto max-w-4xl p-10 text-center">
        <span className="loading loading-spinner loading-lg text-brand-700"></span>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Product Management</title>
      </Helmet>

      {products?.length === 0 ? (
        <div className="surface mx-auto flex max-w-xl flex-col items-center gap-5 p-14 text-center">
          <span className="text-6xl">📦</span>
          <h2 className="font-display text-2xl font-bold text-brand-950">
            Add your first product today!
          </h2>
          <p className="text-sm text-slate-500">
            Your inventory is empty — once you add products they&apos;ll show up here.
          </p>
          <Link to="/dashboard/addProduct" className="btn-brand">
            <IoMdAddCircleOutline size={22} /> Add a product
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-brand-950">
                Product management
              </h1>
              <p className="text-sm text-slate-400">
                {products?.length} of {shop?.limit} product slots used
              </p>
            </div>
            <Link to="/dashboard/addProduct" className="btn-brand !px-5 !py-2.5 text-sm">
              <IoMdAddCircleOutline size={20} /> Add product
            </Link>
          </div>

          <div className="surface overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400">
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Sold</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 transition-colors last:border-0 hover:bg-brand-50/50"
                  >
                    <td className="text-slate-400">{idx + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <ProductThumb src={item.img} alt={item.productName} />
                        <div>
                          <p className="font-semibold text-brand-950">
                            {item.productName}
                          </p>
                          <p className="text-xs text-slate-400">
                            Tk {item.sellingPrice} · {item.discount}% off
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.quantity > 0
                            ? "bg-leaf-400/20 text-leaf-700"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {item.quantity > 0 ? item.quantity : "Out of stock"}
                      </span>
                    </td>
                    <td className="text-slate-500">{item.saleCount}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/dashboard/updateProduct/${item._id}`}
                          aria-label="Edit product"
                          className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-brand-700/10 hover:text-brand-700"
                        >
                          <CiEdit size={22} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          aria-label="Delete product"
                          className="grid size-9 place-items-center rounded-lg text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-500"
                        >
                          <GoTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default ProductManagement;
