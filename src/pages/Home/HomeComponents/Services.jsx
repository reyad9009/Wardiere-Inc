import React from "react";
import img1 from "../../../assets/1.png";
import img2 from "../../../assets/2.png";

const Services = () => {
  return (
    <div className="">
      <div className="flex lg:flex-row flex-col gap-20 px-12 lg:px-0">
        <div className="mt-12">
          <span className="font-bold p-10 bg-primaryColor text-3xl text-white">
            01
          </span>
          <div className="mt-16">
            <h1 className="font-bold text-3xl">Reliable Transport Solutions</h1>
            <p className="text-xl">
              We provide safe, efficient, and timely transportation services for
              both passengers and goods. Whether it's local commutes, intercity
              travel, or long-distance journeys, our well-maintained fleet and
              highly skilled drivers ensure a smooth, comfortable, and
              hassle-free experience. With a commitment to safety and
              punctuality, we strive to make every trip stress-free, offering
              affordable rates, modern vehicles, and exceptional customer
              service to meet your transportation needs.
            </p>
          </div>
        </div>
        <img className="hover:scale-90 transition-all duration-300" src={img2} alt="" />
      </div>
      <div className="flex lg:flex-row flex-col gap-20 px-12 mt-20">
        <img className="hover:scale-90 transition-all duration-300" src={img1} alt="" />
        <div className="mt-12">
          <span className="font-bold p-10 bg-primaryColor text-3xl text-white">
            02
          </span>
          <div className="mt-16">
            <h1 className="font-bold text-3xl">Reliable Transport Solutions</h1>
            <p className="text-xl">
              We provide safe, efficient, and timely transportation services for
              both passengers and goods. Whether it's local commutes, intercity
              travel, or long-distance journeys, our well-maintained fleet and
              highly skilled drivers ensure a smooth, comfortable, and
              hassle-free experience. With a commitment to safety and
              punctuality, we strive to make every trip stress-free, offering
              affordable rates, modern vehicles, and exceptional customer
              service to meet your transportation needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
