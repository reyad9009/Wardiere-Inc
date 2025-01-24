import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { toast } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegistrationForm = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //image for upload
    const imageFile = { image: data.image[0] };
    // Await image upload response
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const imageUrl = res.data.data.display_url;
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, imageUrl);
      //user data to send to the database
      const userInfo = {
        email: data.email,
        name: data.name,
        photo: imageUrl,
        role: data.role,
        bankAccountNo: data.bankAccountNo,
        salary: data.salary,
        designation: data.designation,
      };
      // Store user info in the database
      const response = await axiosPublic.post("/users", userInfo);
      if (response.data.insertedId) {
        reset();
        navigate(location?.state ? location.state : "/");
        toast.success("Registration successful");
      }
    } else {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="card bg-base-100 shrink-0 shadow-2xl px-16">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Register your account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-10 items-end w-full"
        >
          <div className="form-control">
            <label className="label-text text-lg font-semibold">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label-text text-lg font-semibold">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
                  message:
                    "Password must contain a capital letter and a special character",
                },
              })}
              className=" relative input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute ml-[17rem] mt-[2.2rem] px-2 py-2 bg-white"
            >
              {showPassword ? (
                <FaEyeSlash className="text-lg"></FaEyeSlash>
              ) : (
                <FaEye className="text-lg"></FaEye>
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            >
              <option value="">Select Role</option>
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">
              Bank Account Number
            </label>
            <input
              type="text"
              {...register("bankAccountNo", {
                required: "Bank account number is required",
              })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            {errors.bankAccountNo && (
              <p className="text-red-500 text-sm">
                {errors.bankAccountNo.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">Salary</label>
            <input
              type="number"
              {...register("salary", { required: "Salary is required" })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">
              Designation
            </label>
            <input
              type="text"
              {...register("designation", {
                required: "Designation is required",
              })}
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
            {errors.designation && (
              <p className="text-red-500 text-sm">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label-text text-lg font-semibold">Photo</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full max-w-xs focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn bg-primaryColor text-white font-bold text-lg"
            >
              Register
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="card rounded-box flex items-center justify-center gap-2">
          <GoogleLogin></GoogleLogin>
        </div>
        <p className="text-center mb-10 mt-5">
          Don't have an account ?
          <Link className="text-red-600 font-bold ml-2" to="/login">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
