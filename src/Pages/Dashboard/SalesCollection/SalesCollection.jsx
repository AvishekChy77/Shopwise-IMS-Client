import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiSearch } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Avatar from "../../../Components/Avatar";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure, { apiError } from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import ProductCard from "./ProductCard";

const SalesCollection = () => {
  const { shop, isShopLoading, products, isProductsLoading, refetch } =
    useShopProductDB();
  const [query, setQuery] = useState("");
  const axiosSecure = useAxiosSecure();

  // derived list — fixes the old bug where products never appeared
  // until "Show all" was clicked (state captured an undefined initial value)
  const q = query.trim().toLowerCase();
  const items = q
    ? products?.filter(
        (item) =>
          item._id === q || item.productName?.toLowerCase().includes(q)
      )
    : products;

  // the server fills in price and details from the product record
  const handleCart = (item) => {
    axiosSecure
      .post("/carts", { productId: item._id })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Item added to cart!",
            icon: "success",
            confirmButtonColor: "#265073",
            timer: 1400,
            showConfirmButton: false,
          });
          refetch();
        }
      })
      .catch((error) =>
        Swal.fire({
          title: "Can't add this item",
          text: apiError(error),
          icon: "warning",
          confirmButtonColor: "#265073",
        })
      );
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
        <title>ShopWise | Sales-Collection</title>
      </Helmet>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar src={shop?.shopLogo} name={shop?.shopName} className="size-14" />
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-950">
              Sales collection
            </h1>
            <p className="text-sm text-slate-400">
              {products?.length ?? 0} products ready to sell
            </p>
          </div>
        </div>
        <Link to="/dashboard/shopCart" className="btn-brand !px-5 !py-2.5 text-sm">
          <IoCartOutline size={18} /> Go to cart
        </Link>
      </div>

      <div className="relative mb-8 max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name or ID"
          className="input-modern !pl-11"
        />
      </div>

      {items?.length === 0 ? (
        <div className="surface mx-auto max-w-md p-10 text-center">
          <p className="text-4xl">🔍</p>
          <p className="font-display mt-3 font-bold text-brand-950">No products found</p>
          <p className="mt-1 text-sm text-slate-400">
            Nothing matches “{query}” — try a different name or ID.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
          {items?.map((item) => (
            <ProductCard key={item._id} item={item} handleCart={handleCart} />
          ))}
        </div>
      )}
    </PageTransition>
  );
};

export default SalesCollection;
