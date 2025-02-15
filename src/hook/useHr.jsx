import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// check user is HR
const useHr = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isHr, isPending: isHrLoading } = useQuery({
    queryKey: [user?.email, "isHr"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/hr/${user.email}`);
      //console.log(res.data); //{HR: true}
      return res.data?.hr;
    },
  });
  return [isHr, isHrLoading];
};

export default useHr;
