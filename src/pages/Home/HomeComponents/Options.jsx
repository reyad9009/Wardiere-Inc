import React from "react";
import option1 from "../../../assets/option1.png";
import option2 from "../../../assets/option2.png";
import option3 from "../../../assets/option3.png";
const Options = () => {
  return (
    <div className="flex flex-col px-12 lg:flex-row gap-10">
      <div className="flex flex-col justify-start items-center">
        <img src={option1} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">
          {" "}
          Real-Time Inventory Tracking
        </h1>
        <p className="text-center px-10">
          Keep track of your inventory effortlessly with real-time updates.
          Sortly allows you to monitor stock levels, track movements, and reduce
          errors, ensuring smooth and efficient inventory management.
        </p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <img src={option2} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">
          {" "}
          Multi-Location Facilities
        </h1>
        <p className="text-center px-10">
          Manage inventory across multiple warehouses, stores, or storage
          locations with ease. Sortly helps you organize, categorize, and access
          inventory data from anywhere, keeping your operations seamless and
          well-coordinated.
        </p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <img src={option3} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">
          {" "}
          Temperature-Controlled Storage
        </h1>
        <p className="text-center px-10">
          Need to store sensitive items? Sortly supports temperature-controlled
          storage tracking, ensuring that perishable goods, pharmaceuticals, and
          other temperature-sensitive products are maintained under optimal
          conditions.
        </p>
      </div>
    </div>
  );
};

export default Options;
