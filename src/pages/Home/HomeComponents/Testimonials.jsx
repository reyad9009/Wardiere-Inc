import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "Amazing service! The team is professional and reliable. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Smith",
      review: "Fast and secure delivery. I trust them for all my logistics needs!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "David Johnson",
      review: "The best transport service I have used. Always on time and very friendly staff.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-xl shadow-md">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="ml-[45%] w-20 h-20 rounded-full mb-4 border-4 border-primaryColor"
            />
            <p className="text-lg italic text-gray-700">"{testimonial.review}"</p>
            <h4 className="mt-3 font-semibold text-primaryColor">{testimonial.name}</h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
