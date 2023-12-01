import axios from "axios";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
  const { id } = useParams();
  console.log(id);
  const { products, isProductsLoading, refetch } = useShopProductDB();
  const product = products?.find((p) => p._id === id);
  console.log(product);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      productName: product?.productName,
      description: product?.description,
      location: product?.location,
      quantity: product?.quantity,
      discount: product?.discount,
      productionCost: product?.productionCost,
      profit: product?.profit,
      file: null,
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);

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
          quantity: parseInt(values.quantity),
          location: values.location,
          productionCost: productionCost,
          profit: profit,
          description: values.description,
          discount: discount,
          listPrice: listP,
          sellingPrice: sellingP,
        };
        console.log(productData);
        const productRes = await axiosSecure.patch(
          `/products/${product._id}`,
          productData
        );
        console.log(productRes.data);
        if (productRes.data.modifiedCount > 0) {
          // success popup
          Swal.fire({
            title: `product data has been updated!`,
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
          navigate("/dashboard/productManagement");

          resetForm();
        }
      }
    },
  });
  return (
    <>
      <Helmet>
        <title>ShopWise | Update-product</title>
      </Helmet>
      <div className="my-5 flex flex-col items-center">
        <div className="mb-10">
          <img className="w-[80px] md:w-[100px]" src={product?.img} alt="" />
        </div>
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
              >
                Update Product <BiShoppingBag size={26} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
