
import React from "react";


const SlugDetails = ({paymentData}) => {
  const { name, photo, designation } = paymentData;

  return (
    <div>
      <img src={photo} alt="" />
      <h1>{name}</h1>
      <h1>{designation}</h1>
    </div>
  );
};

export default SlugDetails;
