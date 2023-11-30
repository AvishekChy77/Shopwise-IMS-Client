import { FaHeadset } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { Link } from "react-router-dom";

const HelpLine = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10">
      <h2 className=" text-2xl sm:text-3xl text-black md:text-4xl xl:text-5xl font-bold">
        Helping businesses do more
      </h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div className=" text-left max-w-lg bg-[#265073] text-white p-10 pr-5 pb-16 rounded-md">
          <FaHeadset size={36} />
          <h2 className=" text-2xl mt-4 font-bold text-[#9ADE7B]">
            Talk to sales
          </h2>
          <p className=" my-3">
            Give us a call if you need help picking a Shopwise product.
          </p>
          <p>
            Call <span className=" font-semibold">1-527-937-1751</span>
          </p>
          <p>Mon-Fri, 5 AM to 6 PM GMT</p>
        </div>
        <div className=" text-left max-w-lg bg-[#265073] text-white p-10 pr-5 pb-16 rounded-md">
          <LuMonitor size={36} />
          <h2 className=" text-2xl mt-4 font-bold text-[#9ADE7B]">
            Visit our support hub
          </h2>
          <p className=" my-3">
            Find help articles, video tutorials, and connect with other
            businesses in our online community.
          </p>
          <Link
            className="mt-5 btn border-2 border-white hover:border-white bg-transparent text-white hover:bg-white hover:text-[#265073]"
            to="watchDemo"
          >
            <button>Watch Demo</button>
          </Link>{" "}
          <Link
            className=" btn border-2 border-white hover:border-white hover:bg-transparent hover:text-white bg-white text-[#265073] shadow-lg"
            to="/login"
          >
            Sign Up Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpLine;
