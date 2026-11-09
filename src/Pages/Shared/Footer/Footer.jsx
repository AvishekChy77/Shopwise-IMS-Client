import { FaCcMastercard, FaCcVisa, FaFacebook, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiAmericanexpress } from "react-icons/si";
import { Link } from "react-router-dom";
import Logo from "../../../Components/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: <FaXTwitter />, label: "Twitter / X" },
    { icon: <FaYoutube />, label: "YouTube" },
    { icon: <FaFacebook />, label: "Facebook" },
    { icon: <FaLinkedin />, label: "LinkedIn" },
  ];

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="h-1 bg-gradient-to-r from-brand-700 via-brand-500 to-leaf-400" />
      <div className="container mx-auto grid gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            The one-stop inventory platform for retail businesses in Bangladesh —
            track stock, process sales, and grow with confidence.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                className="grid size-10 cursor-pointer place-items-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-700 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-bold text-brand-950">Explore</h3>
          <nav className="mt-4 flex flex-col gap-2.5 text-sm text-slate-500">
            <Link className="w-fit transition hover:text-brand-700" to="/">
              Home
            </Link>
            <Link className="w-fit transition hover:text-brand-700" to="/watchDemo">
              Watch Demo
            </Link>
            <Link className="w-fit transition hover:text-brand-700" to="/createStore">
              Create Store
            </Link>
            <Link className="w-fit transition hover:text-brand-700" to="/register">
              Register
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-display font-bold text-brand-950">Get in touch</h3>
          <div className="mt-4 space-y-2.5 text-sm text-slate-500">
            <p>52/A Asgrad, Dhaka</p>
            <p>shopwisehr@gmail.com</p>
            <p>1-527-937-1751</p>
          </div>
          <h3 className="font-display mt-6 font-bold text-brand-950">We accept</h3>
          <div className="mt-3 flex gap-3 text-2xl text-slate-400">
            <SiAmericanexpress />
            <FaCcMastercard />
            <FaCcVisa />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-400">
        © {currentYear} ShopWise — Guiding your business into success
      </div>
    </footer>
  );
};

export default Footer;
