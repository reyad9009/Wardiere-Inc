import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaWindowClose } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salary, setSalary] = useState("");

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
                <td className="py-6 font-bold">Details</td>
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
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setSalary(user.salary);
                          setIsModalOpen(true);
                        }}
                      >
                        Pay
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="btn bg-slate-400"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/payment-details/${user._id}`}
                      className="btn"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedUser && (
        <dialog className={`modal ${isModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Payment for {selectedUser.name}
            </h3>
            <h1>{selectedUser.salary}</h1>

            <form>
              <div className="my-2">
                <label className="block font-medium mb-1">Salary:</label>
                <input
                  defaultValue={salary}
                  onChange={(e) => setSalary(e.target.value)} // Update salary state
                  type="number"
                  className="input input-bordered w-full focus:outline-[#ffffff] focus:border-[#fb5402]"
                  id="salary"
                />
              </div>
              <div className="my-2">
                <label className="block font-medium mb-1">Month:</label>
                <select
                  className="select select-bordered w-full focus:outline-[#ffffff] focus:border-[#fb5402]"
                  required
                  id="paymentMonth"
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div className="my-2">
                <label className="block font-medium mb-1">Year:</label>
                <input
                  type="number"
                  placeholder="e.g., 2025"
                  className="input input-bordered w-full focus:outline-[#ffffff] focus:border-[#fb5402]"
                  required
                  id="paymentYear"
                />
              </div>
            </form>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                user={selectedUser}
                salary={salary}
                monthFieldId="paymentMonth"
                yearFieldId="paymentYear"
              />
            </Elements>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
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
