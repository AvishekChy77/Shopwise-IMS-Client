const Banner = () => {
  return (
    <div className="flex rounded bg-[#FAEED1]  bgJar gap-10 md:gap-0 flex-col md:flex-row items-center justify-between  p-5 lg:p-10">
      <div className=" font-YSerif text-center p-5 lg:p-10">
        <h2 className=" text-2xl mb-5 md:text-3xl lg:text-4xl xl:text-5xl">
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
        <p className="text-md lg:text-xl xl:text-2xl">
          Manage your stock and orders from any device
        </p>
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
