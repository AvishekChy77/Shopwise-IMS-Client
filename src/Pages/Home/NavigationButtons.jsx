import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSwiper } from "swiper/react";

/* Side arrows, vertically centered — the pagination dots keep the
   bottom center to themselves. Hidden on mobile, where swiping works. */
const buttonClass =
  "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-soft transition-all duration-300 hover:border-brand-700 hover:bg-brand-700 hover:text-white md:grid";

const NavigationButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <button
        aria-label="Previous review"
        className={`${buttonClass} left-0`}
        onClick={() => swiper.slidePrev()}
      >
        <FaArrowLeft />
      </button>
      <button
        aria-label="Next review"
        className={`${buttonClass} right-0`}
        onClick={() => swiper.slideNext()}
      >
        <FaArrowRight />
      </button>
    </>
  );
};

export default NavigationButtons;
