import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import moment from "moment";

const Messages = () => {
  const axiosSecure = useAxiosSecure();
  const { data: userMessages = [] } = useQuery({
    queryKey: ["userMessages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/messages");
      return res.data;
    },
  });
  const sortedTasks = userMessages.sort((a, b) => {
    const dateA = moment(a.date, "MM/DD/YYYY");
    const dateB = moment(b.date, "MM/DD/YYYY");
    return dateB - dateA;
  });
  return (
    <div className="space-y-5 mt-16">
      {userMessages.map((user) => (
        <div className="rounded-lg outline-red-300 outline-dashed  p-6">
          <h1><span className="font-bold">Email: </span>{user.email}</h1>
          <p className="text-wrap"> <span className="font-bold">Message: </span>{user.message}</p>
          <span>{moment(user.date).format("MMMM D, YYYY h:mm:ss A")}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
