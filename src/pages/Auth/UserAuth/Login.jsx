import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center">
      <Helmet>
        <title>Career Kindle | Login</title>
      </Helmet>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Login your account
        </h2>
        <form className="px-10 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
               className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
               className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute ml-[16rem] mt-[3.2rem] p-2 bg-white"
            >
              {showPassword ? (
                <FaEyeSlash className="text-lg"></FaEyeSlash>
              ) : (
                <FaEye className="text-lg"></FaEye>
              )}
            </button>

            {/* {error.login && <label className="label">{error.login}</label>} */}

            <label className="label">
              <a className="label-text-alt link link-hover text-base mt-2">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control">
            <button
              type="submit"
              className="btn bg-primaryColor text-white font-bold text-lg"
            >
              Login
            </button>
          </div>
          <div className="divider">OR</div>
        </form>

        <div className="card rounded-box flex items-center justify-center gap-2">
          <span className="font-semibold">Continue with Google</span>
         <GoogleLogin></GoogleLogin>
        </div>

        <p className="text-center mb-10 mt-5">
          Don't have an account ?
          <Link className="text-red-600 font-bold ml-2" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
