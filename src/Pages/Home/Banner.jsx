import { motion } from "framer-motion";
import { FaArrowRight, FaBoxesStacked, FaChartLine, FaPlay } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const stats = [
  { value: "500+", label: "Active shops" },
  { value: "120k", label: "Products tracked" },
  { value: "99.9%", label: "Uptime" },
];

const bars = [42, 68, 54, 88, 62, 96, 74];

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 size-80 rounded-full bg-leaf-400/25 blur-3xl" />

      <div className="container relative mx-auto grid items-center gap-14 px-4 pb-20 pt-14 lg:grid-cols-2 lg:pb-28 lg:pt-20">
        {/* copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">
            <FaBoxesStacked /> Inventory, made effortless
          </span>
          <h1 className="font-display mt-5 text-4xl font-extrabold leading-tight text-brand-950 md:text-5xl xl:text-6xl">
            Goodbye spreadsheets, <br />
            hello <span className="text-gradient">smart inventory</span>
          </h1>
          <div className="mt-5 h-8 text-lg text-slate-500 md:text-xl">
            <TypeAnimation
              sequence={[
                "Manage your stock from any device",
                1600,
                "Process sales in a couple of clicks",
                1600,
                "Know your numbers in real time",
                1600,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <NavLink to="/register">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-brand"
              >
                Start now — it&apos;s free <FaArrowRight />
              </motion.span>
            </NavLink>
            <NavLink to="/watchDemo" className="btn-ghost-brand">
              <FaPlay className="text-sm" /> Watch demo
            </NavLink>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.12 }}
              >
                <p className="font-display text-2xl font-extrabold text-brand-700 md:text-3xl">
                  {s.value}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="surface relative z-10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  This week&apos;s revenue
                </p>
                <p className="font-display mt-1 text-3xl font-extrabold text-brand-950">
                  ৳ 84,250
                </p>
              </div>
              <span className="chip !bg-leaf-400/20 !text-leaf-700">
                <FaChartLine /> +18%
              </span>
            </div>
            <div className="mt-6 flex h-32 items-end gap-2.5">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                  className={`flex-1 rounded-t-lg ${
                    i === 5 ? "bg-gradient-to-t from-brand-700 to-brand-500" : "bg-brand-200"
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-medium uppercase text-slate-400">
              {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="surface absolute -left-6 -top-8 z-20 hidden px-5 py-4 sm:block"
          >
            <p className="text-xs text-slate-400">Low stock alert</p>
            <p className="font-display font-bold text-rose-500">4 products</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="surface absolute -bottom-8 -right-4 z-20 hidden px-5 py-4 sm:block"
          >
            <p className="text-xs text-slate-400">Orders today</p>
            <p className="font-display font-bold text-leaf-600">32 completed ✓</p>
          </motion.div>
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 to-leaf-400/20 blur-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
