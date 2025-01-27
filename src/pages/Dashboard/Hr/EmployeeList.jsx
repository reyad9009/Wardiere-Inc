import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const EmployeeList = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee-list");
      return res.data;
    },
  });

  const nonAdminUsers = users.filter(
    (user) => user.role !== "admin" && user.role !== "hr"
  );

  const handleMakeVerified = (user) => {
    axiosSecure.patch(`/users/employee/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an HR now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">All Users</h2>
          <h2 className="text-3xl">Total Users: {nonAdminUsers.length}</h2>
        </div>
        <div className="overflow-hidden shadow-md rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="uppercase bg-[#f55353] text-[#e5e7eb]">
              <tr className="border border-gray-300">
                <td className="py-6 text- font-bold ">Si</td>
                <td className="py-6 font-bold">Name</td>
                <td className="py-6 font-bold">Email</td>
                <td className="py-6 font-bold">Verified</td>
                <td className="py-6 font-bold">Bank Account No</td>
                <td className="py-6 font-bold">Salary</td>
                <td className="py-6 font-bold">Pay</td>
              </tr>
            </thead>
            <tbody>
              {nonAdminUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {user.verified ? (
                      <VscVerifiedFilled className="text-green-600 text-2xl" />
                    ) : (
                      <button
                        onClick={() => handleMakeVerified(user)}
                        className="text-2xl"
                      >
                        <FaWindowClose />
                      </button>
                    )}
                  </td>
                  <td>{user.bankAccountNo}</td>
                  <td>{user.salary}</td>
                  <td>
                    {user.verified ? (
                      <button
                        className="btn"
                        onClick={() => {
                          setSelectedUser(user);
                          document.getElementById("payment_modal").showModal();
                        }}
                      >
                        Pay
                      </button>
                    ) : (
                      <button disabled className="btn bg-slate-400">
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedUser && (
        <dialog id="payment_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Payment for {selectedUser.name}
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm user={selectedUser} salary={selectedUser.salary} />
            </Elements>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setSelectedUser(null);
                  document.getElementById("payment_modal").close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default EmployeeList;
