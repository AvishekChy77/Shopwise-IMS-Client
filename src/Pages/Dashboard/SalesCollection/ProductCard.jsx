import { motion } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";
import ProductThumb from "../../../Components/ProductThumb";

const ProductCard = ({ item, handleCart }) => {
  const { productName, _id, quantity, discount, sellingPrice, img } = item || {};
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="surface flex w-72 flex-col overflow-hidden hover:shadow-lift"
    >
      <div className="grid h-40 place-items-center bg-slate-100 p-3">
        <ProductThumb src={img} alt={productName} className="h-full w-full !rounded-lg" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <h2 className="font-display font-bold text-brand-950">{productName}</h2>
        <p className="truncate text-[10px] text-slate-400">ID: {_id}</p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
              quantity > 0
                ? "bg-leaf-400/20 text-leaf-700"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
          </span>
          {discount > 0 && (
            <span className="text-xs font-semibold text-gold-600">-{discount}%</span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-display text-lg font-extrabold text-brand-700">
            Tk {sellingPrice}
          </p>
          <button
            onClick={() => handleCart(item)}
            className="btn-brand !px-4 !py-2 text-xs"
            type="submit"
            disabled={quantity === 0}
          >
            <IoCartOutline size={16} /> Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
