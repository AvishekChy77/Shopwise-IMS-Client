import axios from "axios";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import { useContext } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserData from "../../Hooks/useUserData";
import { AuthContext } from "../../Provider/AuthProvider";
import shop from "../../assets/shop.json";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateShop = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { userDB, refetch } = useUserData();
  console.log(userDB);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      shopName: "",
      shopDescription: "",
      location: "",
      file: null,
    },
    validate: (values) => {
      const errors = {};

      if (!values.shopDescription) {
        errors.shopDescription = "Please select an option";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      //   upload img to imgBB and get url
      const selectedimage = values.file[0];
      const data = new FormData();
      data.append("image", selectedimage);
      console.log(selectedimage, data);
      const res = await axios.post(image_hosting_api, data);
      console.log(res.data);
      if (res.data.success) {
        // create the item and send it to server
        const shopData = {
          shopName: values.shopName,
          shopDescription: values.shopDescription,
          location: values.location,
          shopLogo: res.data.data.display_url,
          limit: 3,
          manager: user.displayName,
          email: user.email,
        };
        const shopRes = await axiosSecure.post("/shops", shopData);
        console.log(shopRes.data);
        if (shopRes.data.insertedId) {
          const userData = {
            shopId: shopRes.data.insertedId,
            shopLogo: shopData.shopLogo,
            shop: values.shopName,
          };
          const userRes = await axiosSecure.patch(
            `users/manager/${user.email}`,
            userData
          );
          console.log(userRes.data);
          if (userRes.data.modifiedCount > 0) {
            // success popup
            Swal.fire({
              title: `${values.shopName} has been added in to our system!`,
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
            navigate("/");
            refetch();
          }
          resetForm();
        }
        console.log(shopData);
      }
    },
  });
  return (
    <div className="my-14 text-center">
      {userDB?.role === "manager" && (
        <p className=" text-xl font-medium text-sky-700 mb-5">
          You already have a shop!{" "}
          <Link
            className=" cursor-pointer text-xl font-semibold text-cyan-600"
            to="/dashboard/productManagement"
          >
            Go to your Shop
          </Link>
        </p>
      )}
      <div className=" flex items-center flex-col lg:flex-row lg:gap-10">
        <h2 className=" text-2xl text-black md:text-3xl space-y-3 xl:text-4xl font-semibold">
          <p className=" pl-5  text-left">Your Store, Your Way</p>{" "}
          <p className="pr-5 text-right">Begin Shop Setup</p>
          <Lottie className="px-2" animationData={shop} autoPlay={true} />
        </h2>
        <div className="p-1 sm:p-4 mb-10 rounded-md  w-[350px] sm:w-[450px] md:w-[550px] lg:w-[600px]  mx-auto bg-teal-900 pb-10 lg:px-10">
          <form onSubmit={formik.handleSubmit}>
            <div className=" flex flex-col md:flex-row items-center justify-between gap-1">
              <div className="form-control w-full md:w-2/5">
                <label className="label text-black" htmlFor="shopName">
                  Shop name*
                </label>
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  required
                  placeholder="shop name"
                  onChange={formik.handleChange}
                  value={formik.values.shopName}
                  className="input bg-white input-bordered"
                />
              </div>
              <div className="form-control w-full md:w-3/5">
                <label className="label text-black" htmlFor="shoplogo">
                  Shop logo*
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
                <label className="label" htmlFor="shopDescription">
                  Shop Description*
                </label>
                <select
                  className="input bg-white input-bordered "
                  id="shopDescription"
                  name="shopDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shopDescription}
                >
                  <option disabled value="" label="Category" />
                  <option value="Apparel" label="Apparel" />
                  <option value="Bike" label="Bike" />
                  <option value="Electronics" label="Electronics" />
                  <option value="Home Decor" label="Home Decor" />
                  <option value="Gift Store" label="Gift Store" />
                  <option value="Health & Beauty" label="Health & Beauty" />
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div>{formik.errors.category}</div>
                ) : null}
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label" htmlFor="location">
                  Location
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
                <label className="label text-black" htmlFor="ownerName">
                  Owner name
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  readOnly
                  onChange={formik.handleChange}
                  value={user.displayName}
                  className="input bg-white input-bordered"
                />
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label text-black" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  readOnly
                  onChange={formik.handleChange}
                  value={user.email}
                  className="input bg-white input-bordered"
                />
              </div>
            </div>
            <div className="my-5 text-center">
              <button
                className="btn  btn-wide text-black hover:text-white  hover:bg-gradient-to-r from-stone-700 to-stone-900  btn-outline "
                type="submit"
                disabled={userDB?.role === "manager"}
              >
                Here we go <BiShoppingBag size={26} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
