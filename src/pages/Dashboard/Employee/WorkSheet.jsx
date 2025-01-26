import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import Swal from "sweetalert2";

const WorkSheet = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: userTask = [], refetch } = useQuery({
    queryKey: ["userTask"],
    queryFn: async () => {
      const res = await axiosSecure.get("/task");
      return res.data;
    },
  });


  // Watch the selected date
  const selectedDate = watch("date");
 // Sort userTask by date in descending order (newest first)
const sortedTasks = userTask.sort((a, b) => {
  const dateA = moment(a.date, "MM/DD/YYYY");
  const dateB = moment(b.date, "MM/DD/YYYY");
  return dateB - dateA; // Newest first
});


  // Set default value for the date field to the current date
  useEffect(() => {
    setValue("date", new Date()); // Set default date as today's date
  }, [setValue]);

  const handleAddTask = async (data) => {
    const formattedDate = moment(data.date).format("MM/DD/YYYY");
    const taskData = {
      task: data.task,
      hours: data.hours,
      date: formattedDate,
    };
    const res = await axiosSecure.post("/work-sheet", taskData);
    console.log(res.data);
    if (res.data.insertedId) {
      reset();
      refetch();
      toast.success("Task added successfully!");
    } else {
      toast.error("Failed to add task. Please try again.");
    }
  };

  const handleDeleteTask = (userTask) => {
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
          axiosSecure.delete(`/task/${userTask._id}`).then((res) => {
            if (res.data.deletedCount  > 0) {
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
    <div className="mt-16">
      <form
        onSubmit={handleSubmit(handleAddTask)}
        className="flex items-end gap-4 mb-6"
      >
        {/* Task Selection */}
        <div className="form-control">
          <label className="label-text text-lg font-semibold">Task</label>
          <select
            {...register("task", { required: "Task is required" })}
            className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
          >
            <option value="">Select Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-Work">Paper-Work</option>
          </select>
          {errors.task && (
            <p className="text-red-500 text-sm">{errors.task.message}</p>
          )}
        </div>

        {/* Worked Hours Input */}
        <div className="form-control">
          <label className="label-text text-lg font-semibold">
            Worked Hours
          </label>
          <input
            type="number"
            {...register("hours", {
              required: "Worked Hours is required",
            })}
            className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
          />
          {errors.hours && (
            <p className="text-red-500 text-sm">{errors.hours.message}</p>
          )}
        </div>

        {/* Date Picker */}
        <div className="form-control">
          <label className="label-text text-lg font-semibold">
            Select Date
          </label>
          <DatePicker
            selected={selectedDate} // Use the watched date from react-hook-form
            onChange={(date) => setValue("date", date)} // Update the form value
            className="input input-bordered focus:outline-[#ffffff] focus:border-[#fb5402]"
            closeOnScroll={true}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#fb5402] text-white px-4 py-3 rounded-lg hover:bg-[#d64502]"
        >
          Add Task
        </button>
      </form>
      <h1>{userTask.length}</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Task</th>
            <th className="border p-2">Hours Worked</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task._id}>
              <td className="border p-2">{task.task}</td>
              <td className="border p-2">{task.hours}</td>
              <td className="border p-2">{task.date}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500"
                >
                  <FaEdit className="text-2xl"/>
                </button>
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDeleteTask(task)}
                  className="text-red-500"
                >
                  <FcDeleteRow  className="text-3xl"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheet;
