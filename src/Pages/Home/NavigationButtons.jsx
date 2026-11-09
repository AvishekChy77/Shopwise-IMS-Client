import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSwiper } from "swiper/react";

const NavigationButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="mb-2 flex items-center justify-center gap-4">
      <button
        aria-label="Previous review"
        className="grid size-10 place-items-center rounded-full border border-slate-300 text-slate-500 transition-all duration-300 hover:border-brand-700 hover:bg-brand-700 hover:text-white"
        onClick={() => swiper.slidePrev()}
      >
        <FaArrowLeft />
      </button>
      <button
        aria-label="Next review"
        className="grid size-10 place-items-center rounded-full border border-slate-300 text-slate-500 transition-all duration-300 hover:border-brand-700 hover:bg-brand-700 hover:text-white"
        onClick={() => swiper.slideNext()}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default NavigationButtons;
