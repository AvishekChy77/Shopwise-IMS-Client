import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSwiper } from "swiper/react";

const NavigationButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="ml-5 mb-5 flex items-center gap-5">
      <button
        className=" bottom-5 btn btn-sm btn-circle btn-outline"
        onClick={() => swiper.slidePrev()}
      >
        <FaArrowLeft />
      </button>
      <button
        className=" bottom-5 btn btn-sm btn-circle btn-outline"
        onClick={() => swiper.slideNext()}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default NavigationButtons;
