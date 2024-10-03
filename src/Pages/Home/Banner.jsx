import { NavLink } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div className="flex rounded gap-10 md:gap-0 flex-col md:flex-row items-center justify-between  p-5 lg:p-10">
      <div className="font-YSerif text-center p-5 lg:p-10">
        <h2 className="text-2xl mb-5 md:text-3xl lg:text-4xl xl:text-5xl">
          Goodbye spreadsheets, <br /> hello{" "}
          <span
            style={{
              backgroundImage: "url(https://i.ibb.co/gWr93Nz/paint.png)",
            }}
            className="bg-cover"
          >
            inventory
          </span>{" "}
          software
        </h2>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Manage your",
            1000,
            "Manage your stock and orders",
            1000,
            "Manage your stock and orders from any device",
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="text-md lg:text-xl xl:text-2xl"
          repeat={Infinity}
        />
        <div>
          <NavLink to="/register">
        <button className="mt-10 font-Poppins btn bg-[#2b5b81] text-white hover:bg-[#265073]">Start now - It's free</button></NavLink>
        </div>
      </div>
      <div className="lg:mr-5 overflow-hidden w-[320px] h-[320px] w- md:w-[30vw] md:h-[30vw] lg:w-[25vw] lg:h-[25vw]  rounded-full">
        <img
          src="https://i.ibb.co/kgmCHsK/banner.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
