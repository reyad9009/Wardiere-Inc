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

  return (
    <div className="w-full">
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {nonAdminUsers.length}</h2>
      </div>
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
              <td className="py-6 font-bold ">Details</td>
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

                <td>
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

                <td className="text-center">
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
                <td>
                  <TbListDetails />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
