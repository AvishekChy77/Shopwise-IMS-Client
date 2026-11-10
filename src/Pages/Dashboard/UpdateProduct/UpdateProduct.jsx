import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { PageTransition } from "../../../Components/Motion";
import useAxiosSecure, { apiError } from "../../../Hooks/useAxiosSecure";
import useShopProductDB from "../../../Hooks/useShopProductDB";
import { fileToCompressedDataUrl } from "../../../utils/uploadImage";

const UpdateProduct = () => {
  const { id } = useParams();
  const { products } = useShopProductDB();
  const product = products?.find((p) => p._id === id);
  const [submitting, setSubmitting] = useState(false);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.productName ?? "",
      description: product?.description ?? "",
      location: product?.location ?? "",
      quantity: product?.quantity ?? "",
      discount: product?.discount ?? "",
      productionCost: product?.productionCost ?? "",
      profit: product?.profit ?? "",
      file: null,
    },
    onSubmit: async (values, { resetForm }) => {
      setSubmitting(true);
      try {
        // price calculation
        const profit = parseFloat(values.profit);
        const productionCost = parseFloat(values.productionCost);
        const discount = parseFloat(values.discount);
        const listP = parseInt(productionCost + (productionCost * (profit + 7.5)) / 100);
        const sellingP = parseInt(listP - (listP * discount) / 100);

        // keep the current image unless a new one was chosen
        let img = product?.img || "";
        if (values.file?.[0]) {
          img = await fileToCompressedDataUrl(values.file[0]);
        }

        const productData = {
          productName: values.productName,
          img,
          quantity: parseInt(values.quantity),
          location: values.location,
          productionCost: productionCost,
          profit: profit,
          description: values.description,
          discount: discount,
          listPrice: listP,
          sellingPrice: sellingP,
        };
        const productRes = await axiosSecure.patch(`/products/${product._id}`, productData);
        if (productRes.data.modifiedCount > 0) {
          Swal.fire({
            title: "Product updated!",
            text: `"${values.productName}" has been saved.`,
            icon: "success",
            confirmButtonColor: "#265073",
          });
          navigate("/dashboard/productManagement");
          resetForm();
        } else {
          toast("Nothing was different from the saved version.");
        }
      } catch (error) {
        toast.error(apiError(error, "Could not update the product"));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Update-product</title>
      </Helmet>

      <div className="mb-8 flex items-center gap-4">
        {product?.img && (
          <img
            className="size-16 rounded-2xl border border-slate-200 object-cover"
            src={product.img}
            alt={product?.productName}
          />
        )}
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">
            Update product
          </h1>
          <p className="text-sm text-slate-400">
            Editing “{product?.productName ?? "…"}”
          </p>
        </div>
      </div>

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
              onChange={formik.handleChange}
              value={formik.values.productName}
              className="input-modern"
            />
          </div>
          <div>
            <label className="label-modern" htmlFor="file">
              New image{" "}
              <span className="font-normal text-slate-400">(optional — keeps current)</span>
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
            <label className="label-modern" htmlFor="description">
              Product description *
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
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
              onChange={formik.handleChange}
              value={formik.values.profit}
              className="input-modern"
            />
          </div>
        </div>
        <button className="btn-brand mt-7 w-full" type="submit" disabled={submitting}>
          {submitting ? "Saving…" : "Update product"} <BiShoppingBag size={22} />
        </button>
      </form>
    </PageTransition>
  );
};

export default UpdateProduct;
