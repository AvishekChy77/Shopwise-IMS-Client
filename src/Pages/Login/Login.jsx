import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageTransition } from "../../Components/Motion";
import { AuthContext } from "../../Provider/AuthProvider";
import animationData from "../../assets/login.json";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const Navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    setErrorMsg("");
    signIn(email, password)
      .then(() => {
        e.target.reset();
        toast("Successfully logged in!");
        Navigate("/createStore");
      })
      .catch(() => {
        setErrorMsg("Invalid email or password");
      });
  };

  const handleValueCap = (e) => {
    const userInput = e.target.value;
    if (userInput.length === 6) {
      setDisabled(!validateCaptcha(userInput));
    } else {
      setDisabled(true);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | LogIn</title>
      </Helmet>
      <div className="container mx-auto px-4 py-14">
        <div className="surface mx-auto grid max-w-4xl overflow-hidden !rounded-3xl lg:grid-cols-2">
          {/* visual panel */}
          <div className="relative hidden flex-col justify-center bg-gradient-to-br from-brand-700 to-brand-950 p-10 text-white lg:flex">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-leaf-400/20 blur-3xl" />
            <h1 className="font-display text-3xl font-bold">Welcome back</h1>
            <p className="mt-3 text-sm text-white/70">
              Sign in to manage your shop, track stock, and process today&apos;s sales.
            </p>
            <Lottie animationData={animationData} autoPlay={true} className="mt-4" />
          </div>

          {/* form */}
          <div className="p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-brand-950">Sign in</h2>
            <p className="mt-1 text-sm text-slate-400">
              Use your ShopWise account credentials
            </p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="label-modern">Email</label>
                <input
                  type="email"
                  placeholder="you@shop.com"
                  name="email"
                  className="input-modern"
                  required
                />
              </div>
              <div>
                <label className="label-modern">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  className="input-modern"
                  required
                />
              </div>
              <div>
                <div className="mb-2 w-fit rounded-xl bg-slate-100 p-2">
                  <LoadCanvasTemplate />
                </div>
                <input
                  onChange={handleValueCap}
                  type="text"
                  placeholder="Type the characters above"
                  name="captcha"
                  className="input-modern"
                  required
                />
              </div>
              {errorMsg && (
                <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-600">
                  {errorMsg}
                </p>
              )}
              <button disabled={disabled} className="btn-brand w-full">
                Login
              </button>
            </form>
            <p className="mt-4 flex justify-between text-sm text-slate-500">
              <span>New here?</span>
              <Link
                className="font-semibold text-brand-700 hover:underline"
                state={location.state}
                to="/register"
              >
                Create an account
              </Link>
            </p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
