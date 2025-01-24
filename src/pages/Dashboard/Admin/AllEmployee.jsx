import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { GiSmallFire } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { useForm } from "react-hook-form";

const AllEmployee = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Filter users to exclude admins
  const nonAdminUsers = users.filter((user) => user.role !== "admin");

  const handleMakeHr = (user) => {
    axiosSecure.patch(`/users/hr/${user._id}`).then((res) => {
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

  const handleAdjustSalary = (data) => {
    axiosSecure
      .patch(`/users/salary/${selectedUser._id}`, { salary: data.salary })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          reset();
          document.getElementById("my_modal_1").close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Salary updated successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleChangeUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "User has been updated successfully.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {nonAdminUsers.length}</h2>
      </div>
      <div className="w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="uppercase bg-[#f55353] text-[#e5e7eb]">
            <tr className="border border-gray-300">
              <td className="py-6 text-center font-bold lg:p-4 lg:block hidden">
                Si
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Name</td>
              <td className="py-6 text-center font-bold lg:p-4">Email</td>
              <td className="py-6 text-center font-bold lg:p-4">Designation</td>
              <td className="py-6 text-center font-bold lg:p-4">
                Bank Account No
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Salary</td>
              <td className="py-6 text-center font-bold lg:p-4">
                Adjust Salary
              </td>
              <td className="py-6 text-center font-bold lg:p-4">Fire</td>
              <td className="py-6 text-center font-bold lg:p-4">Make HR</td>
              <td className="py-6 text-center font-bold lg:p-4 lg:block hidden">
                Details
              </td>
            </tr>
          </thead>
          <tbody>
            {nonAdminUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.designation}</td>
                <td>{user.bankAccountNo}</td>
                <td>{user.salary}</td>
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn"
                    onClick={() => {
                      setSelectedUser(user);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                    <FaEdit />
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg py-4">Adjust Salary</h3>
                      <form onSubmit={handleSubmit(handleAdjustSalary)}>
                        <div className="form-control">
                          <input
                            type="number"
                            {...register("salary", {
                              required: "Salary is required",
                            })}
                            className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
                          />
                          {errors.salary && (
                            <p className="text-red-500 text-sm">
                              {errors.salary.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn bg-primaryColor mt-4"
                        >
                          Submit
                        </button>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>

                <td>
                  {user.role === "Fired" ? (
                    "Fired"
                  ) : (
                    <button
                      onClick={() => handleChangeUser(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <GiSmallFire className="text-red-600" />
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "hr" ? (
                    "HR"
                  ) : (
                    <button
                      onClick={() => handleMakeHr(user)}
                      className="btn btn-lg bg-orange-500"
                    >
                      Make HR
                    </button>
                  )}
                </td>
                <td>
                  <TbListDetails />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
