import { useQuery } from "@tanstack/react-query";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Avatar from "../../Components/Avatar";
import { Reveal, Section } from "../../Components/Motion";
import SectionHeading from "../../Components/SectionHeading";
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

  if (!reviews?.length) return null;

  return (
    <Section className="container mx-auto max-w-4xl px-4">
      <SectionHeading
        eyebrow="Wall of love"
        title={
          <>
            Shopkeepers <span className="text-gradient">trust us</span>
          </>
        }
        subtitle="Real words from businesses running on ShopWise every day."
      />
      <Reveal>
        <Swiper
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev._id}>
              <div className="surface mx-auto mb-12 flex max-w-2xl flex-col items-center gap-5 p-10 text-center">
                <FaQuoteLeft className="text-3xl text-leaf-400" />
                <p className="leading-relaxed text-slate-600">{rev.description}</p>
                <div className="flex gap-1 text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar src={rev.img} name={rev.name} className="size-12" />
                  <div className="text-left">
                    <p className="font-display font-bold text-brand-950">{rev.name}</p>
                    <p className="text-xs text-slate-400">{rev.designation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <NavigationButtons />
        </Swiper>
      </Reveal>
    </Section>
  );
};

export default Reviews;
