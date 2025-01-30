import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import moment from "moment";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userPayment = [],} = useQuery({
    queryKey: ["userPayment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history/${user?.email}`);
      return res.data;
    },
  });
  const sortedTasks = userPayment.sort((a, b) => {
    const dateA = moment(a.date, "MM");
    const dateB = moment(b.date, "MM");
    return dateB - dateA;
  });

  return (
    <div className="overflow-x-auto mt-16">
      <table className="table">
        <thead>
          <tr className="bg-teal-300">
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Transaction Id</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task._id} className=" hover:bg-teal-200">
              {task.status === "pending" ? (
                <></>
              ) : (
                <>
                  <td className="border-b-2">{task.month}</td>
                  <td className="border-b-2">{task.year}</td>
                  <td className="border-b-2">{task.salary} $</td>
                  <td className="border-b-2">{task.transactionId}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
