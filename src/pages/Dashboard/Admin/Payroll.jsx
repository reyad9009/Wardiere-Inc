import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  const handlePaySalary = (user) => {
    const formattedDate = moment().format("MM/DD/YYYY");
    const payDate = {
      date: formattedDate,
    };
    //console.log(payDate)
    axiosSecure.patch(`/users/payroll/${user._id}`, payDate).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} payment successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto mt-16">
        <table className="table">
          {/* head */}
          <thead className="bg-teal-300">
            <tr className="">
              <th className="">Si</th>
              <th className="">Name</th>
              <th className="">Email</th>
              <th className="">Designation</th>
              <th className="">Month & Years</th>
              <th className="">Amount</th>
              <th className="">Transaction Id</th>
              <th className="">Pay</th>
              <th className="">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-teal-100">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>
                  {user.month} {user.year}
                </td>
                <td>{user.salary} $</td>
                <td>{user.transactionId}</td>

                <td>
                  {user.status === "paid" ? (
                    "Paid"
                  ) : (
                    <button
                      onClick={() => handlePaySalary(user)}
                      className="btn btn-ghost btn-lg bg-primaryColor text-white font-bold"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
