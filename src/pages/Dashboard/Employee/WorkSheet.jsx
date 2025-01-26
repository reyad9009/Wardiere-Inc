import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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

  // Watch the selected date
  const selectedDate = watch("date");

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
      toast.success("Task added successfully!");
    } else {
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddTask)}
        className="flex items-center gap-4 mb-6"
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
          className="bg-[#fb5402] text-white px-4 py-2 rounded-lg hover:bg-[#d64502]"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default WorkSheet;
