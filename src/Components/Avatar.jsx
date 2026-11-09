import { useState } from "react";

/* Image with an initials fallback so dead URLs never show a broken img */
const Avatar = ({ src, name = "", className = "size-10" }) => {
  const [failed, setFailed] = useState(false);
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";

  if (!src || failed) {
    return (
      <span
        className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900 font-bold text-white ${className}`}
      >
        {initial}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;
