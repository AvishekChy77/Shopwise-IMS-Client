import { motion } from "framer-motion";
import { MdOutlineInventory2 } from "react-icons/md";
import { Link } from "react-router-dom";

const Logo = ({ size = "md", to = "/" }) => {
  const text = size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
  const box = size === "lg" ? "size-10 text-xl" : "size-8 text-base md:size-9";
  return (
    <Link to={to} className="flex items-center gap-2">
      <motion.span
        whileHover={{ rotate: -8, scale: 1.06 }}
        className={`grid ${box} place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-900 text-white shadow-soft`}
      >
        <MdOutlineInventory2 />
      </motion.span>
      <span className={`font-display font-bold ${text}`}>
        <span className="text-brand-700">Shop</span>
        <span className="text-leaf-500">Wise</span>
      </span>
    </Link>
  );
};

export default Logo;
