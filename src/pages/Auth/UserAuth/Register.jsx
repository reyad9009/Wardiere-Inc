// Import necessary libraries
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [photoURL, setPhotoURL] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: { key: "YOUR_IMGBB_API_KEY" },
        }
      );
      setPhotoURL(response.data.data.display_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Save user data in the database
      await axios.post("/api/users", {
        email: data.email,
        role: data.role,
        bankAccountNo: data.bankAccountNo,
        salary: data.salary,
        designation: data.designation,
        photo: photoURL,
      });

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message);
    }
  };

  // Social login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save social login user in the database
      await axios.post("/api/users", {
        email: user.email,
        role: "Employee",
        bankAccountNo: "N/A",
        salary: "N/A",
        designation: "N/A",
        photo: user.photoURL,
      });

      alert("Google login successful!");
    } catch (error) {
      console.error("Google login failed:", error);
      alert(error.message);
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
              type="password"
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
              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            />
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
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs focus:outline-[#ffffff] focus:border-[#fb5402]"
              onChange={handleImageUpload}
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
          <button
            onClick={handleGoogleLogin}
            className="flex justify-center items-center"
          >
            <FcGoogle className="text-4xl" />
          </button>
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
