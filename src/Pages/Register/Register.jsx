import { updateProfile } from "firebase/auth";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PageTransition } from "../../Components/Motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import animationData from "../../assets/login.json";
import { fileToCompressedDataUrl } from "../../utils/uploadImage";
import SocialLogin from "../Login/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, auth } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const goTo = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // optional avatar: compressed in the browser, stored with the user record
      let photo = "";
      const file = data.photoURL?.[0];
      if (file) {
        photo = await fileToCompressedDataUrl(file, { maxDimension: 240 });
      }

      await createUser(data.email, data.password);
      await updateProfile(auth.currentUser, { displayName: data.displayName });

      // the server takes the email from this verified token, not from the form
      const idToken = await auth.currentUser.getIdToken();
      const userInfo = {
        idToken,
        name: data.displayName,
        photo,
      };
      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        toast("Account created successfully!");
        reset();
        goTo("/createStore");
      }
    } catch (error) {
      toast.error(
        error?.code === "auth/email-already-in-use"
          ? "This email is already registered — try logging in."
          : error.message || "Could not create the account"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>ShopWise | Register</title>
      </Helmet>
      <div className="container mx-auto px-4 py-14">
        <div className="surface mx-auto grid max-w-4xl overflow-hidden !rounded-3xl lg:grid-cols-2">
          {/* visual panel */}
          <div className="relative hidden flex-col justify-center bg-gradient-to-br from-brand-700 to-brand-950 p-10 text-white lg:flex">
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-56 rounded-full bg-leaf-400/20 blur-3xl" />
            <h1 className="font-display text-3xl font-bold">Join ShopWise</h1>
            <p className="mt-3 text-sm text-white/70">
              Create a free account and open your shop in minutes.
            </p>
            <Lottie animationData={animationData} autoPlay={true} className="mt-4" />
          </div>

          {/* form */}
          <div className="p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold text-brand-950">
              Create account
            </h2>
            <p className="mt-1 text-sm text-slate-400">It&apos;s free, forever</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="label-modern">Name</label>
                <input
                  type="text"
                  {...register("displayName")}
                  placeholder="Your name"
                  name="displayName"
                  className="input-modern"
                  required
                />
              </div>
              <div>
                <label className="label-modern">
                  Photo <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("photoURL")}
                  name="photoURL"
                  className="file-input file-input-bordered w-full rounded-xl bg-slate-50"
                />
              </div>
              <div>
                <label className="label-modern">Email</label>
                <input
                  type="email"
                  {...register("email")}
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
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
                  })}
                  placeholder="••••••••"
                  name="password"
                  className="input-modern"
                />
                {errors.password?.type === "required" && (
                  <span className="mt-1 block text-sm text-rose-500">
                    Don&apos;t forget to choose your password
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="mt-1 block text-sm text-rose-500">
                    Password must be at least 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="mt-1 block text-sm text-rose-500">
                    Add at least one lowercase letter, one uppercase letter, one digit
                    &amp; one special character
                  </span>
                )}
              </div>
              <button disabled={submitting} className="btn-brand w-full">
                {submitting ? "Creating account…" : "Register"}
              </button>
            </form>
            <p className="mt-4 flex justify-between text-sm text-slate-500">
              <span>Already a member?</span>
              <Link className="font-semibold text-brand-700 hover:underline" to="/login">
                Login
              </Link>
            </p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
