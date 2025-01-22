import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
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
