import { motion } from "framer-motion";
import { FaHouse } from "react-icons/fa6";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center font-Poppins"
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="font-display text-8xl font-extrabold md:text-9xl"
      >
        <span className="text-gradient">404</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h1 className="font-display mt-4 text-2xl font-bold text-brand-950 md:text-3xl">
          This shelf is empty
        </h1>
        <p className="mt-3 max-w-md text-slate-500">
          The page you&apos;re looking for was moved, removed, or never stocked in the
          first place.
        </p>
        {(error?.statusText || error?.message) && (
          <p className="mt-2 text-xs italic text-slate-400">
            {error.statusText || error.message}
          </p>
        )}
        <Link to="/" className="btn-brand mt-8">
          <FaHouse /> Back to home
        </Link>
      </motion.div>
    </div>
  );
}
