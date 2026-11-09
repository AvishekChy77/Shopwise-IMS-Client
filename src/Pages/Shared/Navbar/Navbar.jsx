import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import Avatar from "../../../Components/Avatar";
import Logo from "../../../Components/Logo";
import useUserData from "../../../Hooks/useUserData";
import { AuthContext } from "../../../Provider/AuthProvider";
import Navs from "./Navs";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { userDB } = useUserData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = () => {
    logOut().catch(() => {});
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <Navs />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-circle btn-ghost avatar ring-2 ring-brand-500/40 ring-offset-2 ring-offset-slate-50 transition hover:ring-brand-500"
              >
                <Avatar
                  src={userDB?.photo || user.photoURL}
                  name={user.displayName || user.email}
                  className="size-9"
                />
              </label>
              <div
                tabIndex={0}
                className="dropdown-content z-50 mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-4 shadow-lift"
              >
                <p className="font-bold text-brand-950">
                  {user.displayName || "Shopkeeper"}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
                <div className="my-3 h-px bg-slate-200" />
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-rose-500 transition hover:bg-rose-500/10"
                >
                  <FiLogOut /> Log out
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="btn-brand hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              Sign in
            </NavLink>
          )}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="grid size-10 place-items-center rounded-xl text-xl text-brand-900 transition hover:bg-brand-700/10 lg:hidden"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass overflow-hidden border-t border-slate-200/60 lg:hidden"
          >
            <div
              className="container mx-auto flex flex-col gap-1 px-4 py-4"
              onClick={() => setOpen(false)}
            >
              <Navs mobile />
              {!user?.email && (
                <NavLink to="/login" className="btn-brand mt-2 w-full !py-2.5 text-sm">
                  Sign in
                </NavLink>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
