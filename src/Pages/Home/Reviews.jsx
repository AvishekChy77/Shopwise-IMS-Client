// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Autoplay, Pagination } from "swiper/modules";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import NavigationButtons from "./NavigationButtons";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });
  console.log(reviews);
  return (
    <div className="my-10 px-2 max-w-3xl text-center mx-auto">
      <h2 className=" text-2xl sm:text-3xl text-rose-600 mb-14 md:text-4xl xl:text-5xl font-bold">
        Wall of Love
      </h2>
      <Swiper
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper shadow-xl bg-[#ECF4D6] rounded-md"
      >
        {reviews?.map((rev) => (
          <SwiperSlide key={rev._id}>
            <div className="p-8 mb-10  flex flex-col items-center justify-between gap-5">
              <div className=" overflow-hidden h-20 w-20 rounded-full">
                <img
                  className="w-full h-full object-cover"
                  src={rev.img}
                  alt=""
                />
              </div>
              <h2 className="flex gap-2 justify-center items-center text-lg md:text-xl font-bold ">
                {rev.name}, {rev.designation}
              </h2>
              <p className=" text-justify text-sm md:text-base">
                {rev.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <NavigationButtons></NavigationButtons>
      </Swiper>
    </div>
  );
};

export default Reviews;
