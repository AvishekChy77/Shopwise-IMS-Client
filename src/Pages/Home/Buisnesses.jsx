import Marquee from "react-fast-marquee";

const Buisnesses = () => {
  return (
    <div className="px-2 md:px-5 text-center space-y-14">
      <h2 className="font-YSerif text-2xl sm:text-3xl text-black md:text-4xl xl:text-5xl">
        Powering the best businesses in Bangladesh
      </h2>
      <Marquee className="gap-10">
        <div className=" flex items-center gap-10">
          <div className="w-32 md:w-40">
            <img src="https://i.ibb.co/tX1SR1M/Hatil.png" alt="" />
          </div>
          <div className="w-24 md:w-32">
            <img src="https://i.ibb.co/syxqSWt/rfl.png" alt="" />
          </div>
          <div className="w-32 md:w-40">
            <img src="https://i.ibb.co/vPcSQVk/Hallmark.png" alt="" />
          </div>
          <div className="w-32 md:w-40">
            <img src="https://i.ibb.co/GMj9BjK/yamaha-logo-yny.png" alt="" />
          </div>
          <div className="w-24 md:w-28">
            <img src="https://i.ibb.co/60qzptY/Miniso.png" alt="" />
          </div>
          <div className="w-32 md:w-40">
            <img src="https://i.ibb.co/bWvjxBT/Bata.png" alt="" />
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Buisnesses;
