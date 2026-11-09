import { useFormik } from "formik";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PageTransition } from "../../Components/Motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserData from "../../Hooks/useUserData";
import { AuthContext } from "../../Provider/AuthProvider";
import shop from "../../assets/shop.json";
import { fileToCompressedDataUrl } from "../../utils/uploadImage";

const CATEGORIES = [
  "Apparel",
  "Bike",
  "Electronics",
  "Home Decor",
  "Gift Store",
  "Health & Beauty",
];

const CreateShop = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { userDB, refetch } = useUserData();
  const [submitting, setSubmitting] = useState(false);
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
        errors.shopDescription = "Please pick a category";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        // compress the logo in the browser; no third-party image host needed
        let shopLogo = "";
        const selectedImage = values.file?.[0];
        if (selectedImage) {
          shopLogo = await fileToCompressedDataUrl(selectedImage, { maxDimension: 240 });
        }

        const shopData = {
          shopName: values.shopName,
          shopDescription: values.shopDescription,
          location: values.location,
          shopLogo,
          limit: 3,
          manager: user.displayName,
          email: user.email,
        };
        const shopRes = await axiosSecure.post("/shops", shopData);
        if (shopRes.data.insertedId) {
          const userData = {
            shopId: shopRes.data.insertedId,
            shopLogo,
            shop: values.shopName,
          };
          const userRes = await axiosSecure.patch(`users/manager/${user.email}`, userData);
          if (userRes.data.modifiedCount > 0) {
            Swal.fire({
              title: `${values.shopName} is now part of ShopWise!`,
              text: "Your dashboard is ready — let's add your first product.",
              icon: "success",
              confirmButtonColor: "#265073",
            });
            navigate("/");
            refetch();
          }
          resetForm();
        }
      } catch (error) {
        Swal.fire({
          title: "Could not create the shop",
          text: error?.response?.data?.message || error.message,
          icon: "error",
          confirmButtonColor: "#265073",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const alreadyHasRole = userDB?.role === "manager" || userDB?.role === "admin";

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | CreateShop</title>
      </Helmet>
      <div className="container mx-auto px-4 py-14">
        {userDB?.role === "manager" && (
          <p className="mx-auto mb-8 w-fit rounded-2xl bg-leaf-400/20 px-6 py-3 text-center font-medium text-leaf-700">
            You already have a shop!{" "}
            <Link className="font-bold underline" to="/dashboard/productManagement">
              Go to your dashboard
            </Link>
          </p>
        )}
        {userDB?.role === "admin" && (
          <p className="mx-auto mb-8 w-fit rounded-2xl bg-brand-700/10 px-6 py-3 text-center font-medium text-brand-700">
            You&apos;re a system admin.{" "}
            <Link className="font-bold underline" to="/dashboard/manageShops">
              Go to your dashboard
            </Link>
          </p>
        )}

        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="text-center lg:text-left">
            <span className="chip">
              <BiShoppingBag /> Free to start
            </span>
            <h1 className="font-display mt-4 text-3xl font-extrabold text-brand-950 md:text-4xl">
              Your store, <span className="text-gradient">your way</span>
            </h1>
            <p className="mt-3 text-slate-500">
              Set up your shop once and manage products, sales, and insights from a
              single dashboard.
            </p>
            <Lottie className="mx-auto max-w-sm" animationData={shop} autoPlay={true} />
          </div>

          <form onSubmit={formik.handleSubmit} className="surface p-8">
            <h2 className="font-display mb-6 text-xl font-bold text-brand-950">
              Begin shop setup
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="label-modern" htmlFor="shopName">
                  Shop name *
                </label>
                <input
                  id="shopName"
                  name="shopName"
                  type="text"
                  required
                  placeholder="e.g. Dhaka Gadget House"
                  onChange={formik.handleChange}
                  value={formik.values.shopName}
                  className="input-modern"
                />
              </div>
              <div>
                <label className="label-modern" htmlFor="file">
                  Shop logo{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files);
                  }}
                  className="file-input file-input-bordered w-full rounded-xl bg-slate-50"
                />
              </div>
              <div>
                <label className="label-modern" htmlFor="shopDescription">
                  Category *
                </label>
                <select
                  className="select select-bordered w-full rounded-xl bg-slate-50 focus:border-brand-500 focus:outline-none"
                  id="shopDescription"
                  name="shopDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shopDescription}
                >
                  <option disabled value="">
                    Pick a category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {formik.touched.shopDescription && formik.errors.shopDescription && (
                  <p className="mt-1 text-sm text-rose-500">
                    {formik.errors.shopDescription}
                  </p>
                )}
              </div>
              <div>
                <label className="label-modern" htmlFor="location">
                  Location *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="e.g. Mirpur, Dhaka"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  className="input-modern"
                />
              </div>
              <div>
                <label className="label-modern" htmlFor="ownerName">
                  Owner name
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  readOnly
                  value={user.displayName || ""}
                  className="input-modern opacity-70"
                />
              </div>
              <div>
                <label className="label-modern" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  readOnly
                  value={user.email || ""}
                  className="input-modern opacity-70"
                />
              </div>
            </div>
            <button
              className="btn-brand mt-7 w-full"
              type="submit"
              disabled={alreadyHasRole || submitting}
            >
              {submitting ? "Creating your shop…" : "Here we go"}{" "}
              <BiShoppingBag size={22} />
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default CreateShop;
