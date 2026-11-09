import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Avatar from "../../../Components/Avatar";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import useUserData from "../../../Hooks/useUserData";
import { fileToCompressedDataUrl } from "../../../utils/uploadImage";

const AddProduct = () => {
  const { shop, products, isProductsLoading, refetch } = useShopProductDB();
  const axiosSecure = useAxiosSecure();
  const { userDB } = useUserData();
  const [submitting, setSubmitting] = useState(false);
  const limitReached = shop?.limit === products?.length;

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
      setSubmitting(true);
      try {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();
        const addedDate = `${year}-${month}-${day}`;

        // price calculation
        const profit = parseFloat(values.profit);
        const productionCost = parseFloat(values.productionCost);
        const discount = parseFloat(values.discount);
        const listP = parseInt(productionCost + (productionCost * (profit + 7.5)) / 100);
        const sellingP = parseInt(listP - (listP * discount) / 100);

        // compress the image in the browser; stored with the product record
        const img = await fileToCompressedDataUrl(values.file?.[0]);

        const productData = {
          productName: values.productName,
          img,
          quantity: parseInt(values.quantity),
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
        const productRes = await axiosSecure.post("/products", productData);
        if (productRes.data.insertedId) {
          Swal.fire({
            title: "Product added!",
            text: `"${values.productName}" is now in your inventory.`,
            icon: "success",
            confirmButtonColor: "#265073",
          });
          refetch();
          if (shop?.limit === products?.length) {
            toast("You have reached the product limit!");
          }
          resetForm();
        }
      } catch (error) {
        toast.error(error.message || "Could not add the product");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | AddProduct</title>
      </Helmet>

      <div className="mb-8 flex items-center gap-4">
        {isProductsLoading ? (
          <span className="loading loading-spinner loading-md text-brand-700"></span>
        ) : (
          <Avatar src={shop?.shopLogo} name={shop?.shopName} className="size-14" />
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">
            Add a product
          </h1>
          <p className="text-sm text-slate-400">
            {products?.length ?? 0} of {shop?.limit ?? "—"} product slots used
          </p>
        </div>
      </div>

      {limitReached && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-600">
          Your shop has reached its product limit —{" "}
          <Link className="font-bold underline" to="/dashboard/subscription">
            see plans
          </Link>{" "}
          to raise it.
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="surface max-w-3xl p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="label-modern" htmlFor="productName">
              Product name *
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              required
              placeholder="e.g. Wireless Mouse"
              onChange={formik.handleChange}
              value={formik.values.productName}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="file">
              Image *
            </label>
            <input
              type="file"
              id="file"
              name="file"
              required
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files);
              }}
              className="file-input file-input-bordered w-full rounded-xl bg-slate-50"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="description">
              Product description *
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              placeholder="Short description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="input-modern"
            />
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
              placeholder="Shelf / warehouse"
              onChange={formik.handleChange}
              value={formik.values.location}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="quantity">
              Quantity *
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              required
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="discount">
              Discount (%) *
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              step="0.1"
              required
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.discount}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="productionCost">
              Production cost *
            </label>
            <input
              id="productionCost"
              name="productionCost"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="0.00"
              onChange={formik.handleChange}
              value={formik.values.productionCost}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="profit">
              Profit margin (%) *
            </label>
            <input
              id="profit"
              name="profit"
              type="number"
              min="0"
              step="0.1"
              required
              placeholder="0"
              onChange={formik.handleChange}
              value={formik.values.profit}
              className="input-modern"
            />
          </div>
        </div>
        <button
          className="btn-brand mt-7 w-full"
          type="submit"
          disabled={limitReached || submitting}
        >
          {submitting ? "Adding product…" : "Add product"} <BiShoppingBag size={22} />
        </button>
      </form>
    </PageTransition>
  );
};

export default AddProduct;
