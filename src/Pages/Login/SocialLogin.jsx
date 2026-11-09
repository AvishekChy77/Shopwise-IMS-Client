import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const Navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSocialSignIn = (social) => {
    social()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then(() => {
          toast("Successfully logged in!");
          Navigate("/createStore");
        });
      })
      .catch(() => toast.error("Google sign-in failed — please try again"));
  };

  return (
    <div className="w-full">
      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          or
        </span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <button
        onClick={() => handleSocialSignIn(googleLogIn)}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-brand-500 hover:bg-brand-50 hover:shadow-soft"
      >
        <FcGoogle className="text-xl" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
