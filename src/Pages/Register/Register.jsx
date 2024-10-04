import axios from "axios";
import { updateProfile } from "firebase/auth";
import Lottie from "lottie-react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import animationData from "../../assets/login.json";
import SocialLogin from "../Login/SocialLogin";

const Register = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, auth } = useContext(AuthContext);
  const goTo = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);
    //   upload img to imgBB and get url
    const selectedimage = data.photoURL[0];
    const dataForm = new FormData();
    dataForm.append("image", selectedimage);
    console.log(selectedimage, dataForm);
    const res = await axios.post(image_hosting_api, dataForm);
    console.log(res.data);
    if (res.data.success) {
      createUser(data.email, data.password)
        .then((response) => {
          const loggedUser = response.user;
          console.log(loggedUser);

          updateProfile(auth.currentUser, {
            displayName: data.displayName,
            photoURL: res.data.data.display_url,
          })
            .then((res) => {
              // Profile information updated successfully
              // add to db
              const userInfo = {
                name: data.displayName,
                email: data.email,
              };
              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  toast("Account created succesfully!");
                  reset();
                  goTo("/createStore");
                }
              });
              console.log(res);
            })
            .catch((error) => {
              // Handle profile update errors
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      toast.error("Choose a valid file!");
    }
  };

  return (
    <>
      <Helmet>
        <title>ShopWise | Register</title>
      </Helmet>
      <div className="hero min-h-screen ">
        <div className="hero-content justify-between flex-col lg:flex-row">
          <div className="text-center md:w-1/2 lg:text-left">
            <Lottie animationData={animationData} autoPlay={true} />
          </div>
          <div className="card md:w-1/2 p-7 lg:p-4 max-w-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Name</span>
                </label>
                <input
                  type="text"
                  {...register("displayName")}
                  placeholder="Your name"
                  name="displayName"
                  className="input bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Photo</span>
                </label>
                {/* <input
                  type="file"
                  {...register("photoURL")}
                  placeholder="Your photo url"
                  name="photoURL"
                  className="input bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                  required
                /> */}
                <input
                  type="file"
                  {...register("photoURL")}
                  name="photoURL"
                  className="file-input file-input-bordered file-input-md w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="email"
                  name="email"
                  className="input bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
                  })}
                  placeholder="password"
                  name="password"
                  className="input bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500 text-sm mt-1">
                    Don't forget to choose your Password
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 text-sm mt-1">
                    Password must be atleast 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 text-sm mt-1">
                    Add At least one lowercase letter, one uppercase letter, one
                    digit & one special character
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-outline text-black hover:text-white hover:bg-black">
                  Register
                </button>
              </div>
            </form>

            <p className="flex justify-between mt-1">
              <small>Already a member?</small>{" "}
              <Link className=" hover:text-blue-500" to="/login">
                Login
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
