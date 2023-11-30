import axios from "axios";
import { useFormik } from "formik";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import useUserData from "../../../Hooks/useUserData";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
  const { shop, products, isProductsLoading, refetch } = useShopProductDB();
  const axiosSecure = useAxiosSecure();
  const { userDB } = useUserData();
  console.log(userDB);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      location: "",
      quantity: "",
      discount: "",
      productionCost: "",
      profit: "",
      file: null,
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      // purchase date
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const addedDate = `${year}-${month}-${day}`;
      // price calculation
      const profit = parseFloat(values.profit);
      const productionCost = parseFloat(values.productionCost);
      const discount = parseFloat(values.discount);
      const listP = parseInt(
        productionCost + (productionCost * (profit + 7.5)) / 100
      );
      const sellingP = parseInt(listP - (listP * discount) / 100);
      //   upload img to imgBB and get url
      const selectedimage = values.file[0];
      const data = new FormData();
      data.append("image", selectedimage);
      console.log(selectedimage, data);
      const res = await axios.post(image_hosting_api, data);
      console.log(res.data);
      if (res.data.success) {
        // create the item and send it to server
        const productData = {
          productName: values.productName,
          img: res.data.data.display_url,
          quantity: values.quantity,
          location: values.location,
          productionCost: productionCost,
          profit: profit,
          description: values.description,
          discount: discount,
          saleCount: 0,
          listPrice: listP,
          sellingPrice: sellingP,
          addingDate: addedDate,
          shopId: userDB.shopId,
          shopName: userDB.shop,
          email: userDB.email,
        };
        console.log(productData);
        const productRes = await axiosSecure.post("/products", productData);
        console.log(productRes.data);
        if (productRes.data.insertedId) {
          // success popup
          Swal.fire({
            title: `product has been added in to our system!`,
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
          if (shop?.limit === products?.length) {
            toast("You have reached the product limit!");
          }

          resetForm();
        }
      }
    },
  });
  return (
    <div className="my-5 flex flex-col items-center">
      <div className="mb-10">
        {isProductsLoading && (
          <div className=" max-w-4xl mx-auto p-5 mt-5 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        <img className="w-[80px] md:w-[100px]" src={shop?.shopLogo} alt="" />
      </div>
      {shop?.limit === products?.length && (
        <div className=" md:text-lg mb-5 text-red-500">
          Your shop have reached the product limit!
          <Link
            className=" cursor-pointer text-xl font-semibold text-cyan-600"
            to="/dashboard/subscription"
          >
            See plans
          </Link>{" "}
        </div>
      )}
      <div className="p-2 sm:p-4 mb-10 rounded-md  w-[365px] sm:w-[470px] md:w-[650px] xl:w-[750px]   bg-teal-900  lg:px-10">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex flex-col md:flex-row items-center justify-between gap-1">
            <div className="form-control w-full md:w-1/2">
              <label className="label text-black" htmlFor="productName">
                Product name*
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                required
                placeholder="product name"
                onChange={formik.handleChange}
                value={formik.values.productName}
                className="input bg-white input-bordered"
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label text-black" htmlFor="shoplogo">
                Image*
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files);
                }}
                className="file-input bg-white file-input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items-center justify-between gap-1">
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="productDescription">
                Product Description*
              </label>
              <input
                id="description"
                name="description"
                type="text"
                required
                placeholder="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="input bg-white input-bordered"
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="location">
                Location*
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="location"
                onChange={formik.handleChange}
                value={formik.values.location}
                className="input bg-white input-bordered"
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items-center justify-between gap-1">
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="quantity">
                Quantity*
              </label>
              <input
                id="quantity"
                name="quantity"
                type="text"
                required
                placeholder="quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
                className="input bg-white input-bordered"
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="discount">
                Discount*
              </label>
              <input
                id="discount"
                name="discount"
                type="text"
                required
                placeholder="in percentage %"
                onChange={formik.handleChange}
                value={formik.values.discount}
                className="input bg-white input-bordered"
              />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row items-center justify-between gap-1">
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="productionCost">
                Production Cost*
              </label>
              <input
                id="productionCost"
                name="productionCost"
                type="text"
                required
                placeholder="productionCost"
                onChange={formik.handleChange}
                value={formik.values.productionCost}
                className="input bg-white input-bordered"
              />
            </div>
            <div className="form-control w-full md:w-1/2">
              <label className="label" htmlFor="profit">
                Profit Margin*
              </label>
              <input
                id="profit"
                name="profit"
                type="text"
                required
                placeholder="in percentage %"
                onChange={formik.handleChange}
                value={formik.values.profit}
                className="input bg-white input-bordered"
              />
            </div>
          </div>

          <div className="my-5 text-center">
            <button
              className="btn  btn-wide text-black hover:text-white  hover:bg-gradient-to-r from-stone-700 to-stone-900  btn-outline "
              type="submit"
              disabled={shop?.limit === products?.length}
            >
              Add Product <BiShoppingBag size={26} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
