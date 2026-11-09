import { useState } from "react";
import { BsBoxSeam } from "react-icons/bs";

/* Product image with a graceful fallback for dead URLs
   (old records point at ImgBB, which now serves 503 placeholders) */
const ProductThumb = ({ src, alt = "", className = "size-12" }) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed || src.includes("i.ibb.co")) {
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 ${className}`}
      >
        <BsBoxSeam className="text-xl" />
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-xl border border-slate-200 bg-white object-cover ${className}`}
    />
  );
};

export default ProductThumb;
