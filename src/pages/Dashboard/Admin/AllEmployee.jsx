import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { GiSmallFire } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AllEmployee = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
  const nonAdminUsers = users.filter(
    (user) => user.role === "hr" || user.verified === true
  );

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

  const handleAdjustSalary = async (data) => {
    if (!selectedUser?._id) {
      toast.error("No user selected for salary update.");
      return;
    }
    console.log(data.salary);
    const updatedTask = {
      salary: data.salary,
    };

    try {
      const res = await axiosSecure.patch(
        `/salary/${selectedUser._id}`,
        updatedTask
      );

      if (res.data.modifiedCount > 0) {
        reset();
        refetch();
        setSelectedUser(null); // Clear selected user after successful update
        document.getElementById("salary_modal").close();
        toast.success("Salary updated successfully!");
      } else {
        toast.error("No changes detected. Update failed.");
      }
    } catch (error) {
      console.error("Error updating salary:", error);
      toast.error("Something went wrong. Please try again.");
    }
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

  const toggleView = () => {
    setViewMode(viewMode === "table" ? "grid" : "table");
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {nonAdminUsers.length}</h2>
        <button
          onClick={toggleView}
          className="btn bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Toggle {viewMode === "table" ? "Grid View" : "Table View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-hidden shadow-md rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="uppercase bg-[#f55353] text-[#e5e7eb]">
              <tr className="border border-gray-300">
                <td className="py-6 font-bold ">Si</td>
                <td className="py-6 font-bold ">Name</td>
                <td className="py-6 font-bold ">Email</td>
                <td className="py-6 font-bold ">Designation</td>
                <td className="py-6 font-bold ">Bank Account No</td>
                <td className="py-6 font-bold ">Salary</td>
                <td className="py-6 font-bold ">Adjust Salary</td>
                <td className="py-6 font-bold text-center">Fire</td>
                <td className="py-6 font-bold ">Make HR</td>
              </tr>
            </thead>
            <tbody>
              {nonAdminUsers.map((user, index) => (
                <tr key={user._id}>
                  <th className="border-b-2">{index + 1}</th>
                  <td className="border-b-2">{user.name}</td>
                  <td className="border-b-2">{user.email}</td>
                  <td className="border-b-2">{user.designation}</td>
                  <td className="border-b-2">{user.bankAccountNo}</td>
                  <td className="border-b-2">{user.salary}</td>
                  <td className="border-b-2">
                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedUser(user);
                        setValue("salary", user.salary);
                        document.getElementById("salary_modal").showModal();
                      }}
                    >
                      <FaEdit />
                    </button>
                  </td>

                  <td className="border-b-2">
                    {user.role === "Fired" ? (
                      "Fired"
                    ) : (
                      <button
                        onClick={() => handleChangeUser(user)}
                        className="btn btn-ghost"
                      >
                        <GiSmallFire className="text-red-600" />
                      </button>
                    )}
                  </td>

                  <td className="text-center border-b-2">
                    {user.role === "hr" ? (
                      "HR"
                    ) : (
                      <button
                        onClick={() => handleMakeHr(user)}
                        className="btn bg-orange-500"
                      >
                        Make HR
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {nonAdminUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            >
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Designation: {user.designation}</p>
              <p>Bank Account No: {user.bankAccountNo}</p>
              <p>Salary: {user.salary}</p>
              <div className="mt-4 flex gap-3">
                <button
                  className="btn bg-green-500"
                  onClick={() => {
                    setSelectedUser(user);
                    setValue("salary", user.salary);
                    document.getElementById("salary_modal").showModal();
                  }}
                >
                  Adjust Salary
                </button>
                <button className="btn bg-red-500">
                  <GiSmallFire className="text-white" />
                </button>
                <div>
                  {user.role === "hr" ? (
                    "HR"
                  ) : (
                    <button
                      onClick={() => handleMakeHr(user)}
                      className="btn bg-orange-500"
                    >
                      Make HR
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <dialog id="salary_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">Adjust Salary</h3>
          <form onSubmit={handleSubmit(handleAdjustSalary)}>
            <div className="form-control">
              <input
                type="number"
                {...register("salary", {
                  required: "Salary is required",
                  min: {
                    value: selectedUser?.salary || 0, // Set the minimum value as the current salary
                    message: `Salary must be at least ${selectedUser?.salary}`,
                  },
                })}
                className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm">{errors.salary.message}</p>
              )}
            </div>
            <button type="submit" className="btn bg-primaryColor mt-4">
              Submit
            </button>
          </form>
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("salary_modal").close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllEmployee;
