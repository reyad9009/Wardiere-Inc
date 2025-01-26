import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaWindowClose } from "react-icons/fa";

const EmployeeList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser)

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employee-list");
      return res.data;
    },
  });
  // Filter users to exclude admins
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
            {/* head */}
            <thead className="uppercase bg-[#f55353] text-[#e5e7eb]">
              <tr className="border border-gray-300">
                <td className="py-6 text- font-bold ">Si</td>
                <td className="py-6  font-bold ">Name</td>
                <td className="py-6  font-bold ">Email</td>
                <td className="py-6  font-bold ">Verified</td>
                <td className="py-6  font-bold ">Bank Account No</td>
                <td className="py-6  font-bold ">Salary</td>
                <td className="py-6  font-bold ">Pay</td>
                <td className="py-6  font-bold ">Details</td>
              </tr>
            </thead>
            <tbody className="">
              {nonAdminUsers.map((user, index) => (
                <tr key={user._id} className="">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td className="text-center">
                    {user.verified === true ? (
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
                    {user.verified !== true ? (
                      <button disabled className="btn bg-slate-400">
                        Pa
                      </button>
                    ) : (
                      <div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          className="btn"
                          onClick={() => {
                            setSelectedUser(user);
                            document.getElementById("my_modal_1").showModal();
                          }}
                        >
                          Pay
                        </button>
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <input
                              defaultValue={user.salary}

                              className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
                            />
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    )}
                  </td>
                  <td>Details</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
