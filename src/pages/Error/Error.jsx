import React from "react";
import errorImg from "../../assets/404.gif";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={errorImg} alt="" />
      <Link to='/'>
        <button className="btn bg-primaryColor font-bold text-white">Go to Home</button>
      </Link>
    </div>
  );
};

export default Error;
