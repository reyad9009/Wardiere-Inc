import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";


const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // const location = useLocation();

  // Google login
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user.photoURL,
        role: "employee",
        bankAccountNo: "1501076021804",
        salary: 20000,
        designation: "Sales Assistant",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        // navigate(location?.state ? location.state : "/");
        navigate('/')
        toast.success("Registration successful");
      });
    });
  };
  
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="flex justify-center items-center"
        // onClick={handleGoogleSignIn}
      >
        <FcGoogle className="text-4xl" />
      </button>
    </div>
  );
};

export default GoogleLogin;
