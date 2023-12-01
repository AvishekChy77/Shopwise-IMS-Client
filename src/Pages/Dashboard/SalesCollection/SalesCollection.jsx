import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import ProductCard from "./ProductCard";

const SalesCollection = () => {
  const { shop, isShopLoading, products, isProductsLoading, refetch } =
    useShopProductDB();
  const [items, setitems] = useState(products);
  const axiosSecure = useAxiosSecure();
  console.log(items, products);
  const handleSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const productId = form.get("productId");
    console.log(productId);
    e.currentTarget.reset();
    const filteredItems = products?.filter((item) => item._id === productId);
    setitems(filteredItems);
    e.currentTarget.reset();
  };
  const handleAll = () => {
    setitems(products);
  };

  const handleCart = (item) => {
    //send cart data
    const cartitem = {
      productId: item._id,
      img: item.img,
      discount: item.discount,
      productName: item.productName,
      price: item.sellingPrice,
      shopName: shop.shopName,
      email: shop.email,
    };
    console.log(cartitem);
    axiosSecure.post("/carts", cartitem).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Item added to cart!",
          showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
          },
          hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
          },
        });
        refetch();
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>ShopWise | Sales-Collection</title>
      </Helmet>
      <div className=" my-10 flex flex-col items-center space-y-5 ">
        {isShopLoading && (
          <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <img className="w-[80px] md:w-[100px]" src={shop?.shopLogo} alt="" />
        <h2 className=" text-lg md:text-xl text-center font-semibold text-sky-600">
          You have {products?.length} products
        </h2>
        <form
          onSubmit={handleSearch}
          className=" flex items-center justify-center"
        >
          <input
            type="text"
            name="productId"
            placeholder="Enter product Id"
            required
            className="input input-bordered h-10 bg-white text-black input-info w-full max-w-xs"
          />
          <button
            className="btn btn-outline bg-white text-black ml-3 btn-sm "
            type="submit"
          >
            Search
          </button>
        </form>
        <button
          className="btn btn-outline bg-white text-black ml-3 btn-sm "
          type="submit"
          onClick={handleAll}
        >
          Show all
        </button>
        {isProductsLoading && (
          <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <div className="grid pt-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {items?.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              handleCart={handleCart}
            ></ProductCard>
          ))}
        </div>
        <Link to="/dashboard/shopCart">
          <button
            className="btn btn-outline mt-2 bg-red-600 text-white ml-3 btn-sm "
            type="submit"
          >
            Go to Cart
          </button>
        </Link>
      </div>
    </>
  );
};

export default SalesCollection;
