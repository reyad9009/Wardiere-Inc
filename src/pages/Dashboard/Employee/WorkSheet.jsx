import React, { useEffect, useState } from "react";
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
import useAuth from "../../../hook/useAuth";

const WorkSheet = () => {
  const {user} = useAuth();
  //console.log(user?.email)
  //console.log(user?.displayName)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [editingTask, setEditingTask] = useState(null); // Task being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const axiosSecure = useAxiosSecure();

  const { data: userTask = [], refetch } = useQuery({
    queryKey: ["userTask", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/task/${user?.email}`);
      return res.data;
    },
  });

  const selectedDate = watch("date");

  // Sort tasks by date (most recent first)
  const sortedTasks = userTask.sort((a, b) => {
    const dateA = moment(a.date, "MM/DD/YYYY");
    const dateB = moment(b.date, "MM/DD/YYYY");
    return dateB - dateA;
  });

  useEffect(() => {
    setValue("date", new Date());
  }, [setValue]);

  // Add task
  const handleAddTask = async (data) => {
    const formattedDate = moment(data.date).format("MM/DD/YYYY");
    const taskData = {
      name: user?.displayName,
      email: user?.email,
      task: data.task,
      hours: data.hours,
      date: formattedDate,
    };

    try {
      const res = await axiosSecure.post("/work-sheet", taskData);
      if (res.data.insertedId) {
        reset();
        refetch();
        toast.success("Task added successfully!");
      } else {
        toast.error("Failed to add task. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the task.");
    }
  };

  // Update task
  const handleUpdateTask = async (data) => {
    if (!editingTask || !editingTask._id) {
      toast.error("No task selected for editing.");
      return;
    }

    const formattedDate = moment(data.date).format("MM/DD/YYYY");
    const updatedTask = {
      task: data.task,
      hours: data.hours,
      date: formattedDate,
    };

    try {
      const res = await axiosSecure.patch(
        `/task/${editingTask._id}`,
        updatedTask
      );
      if (res.data.modifiedCount > 0) {
        reset();
        refetch();
        setEditingTask(null);
        setIsModalOpen(false); // Close the modal after successful update
        toast.success("Task updated successfully!");
      } else {
        toast.error("Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the task.");
    }
  };

  // Delete task
  const handleDeleteTask = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/task/${task._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          }
        });
      }
    });
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setValue("task", task.task);
    setValue("hours", task.hours);
    setValue("date", moment(task.date, "MM/DD/YYYY").toDate());
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
    reset(); // Reset the form
  };

  return (
    <div className="mt-16">
      <form
        onSubmit={handleSubmit(handleAddTask)}
        className="flex items-end gap-4 mb-6"
      >
        <div className="form-control">
          <label className="label-text text-lg font-semibold">Task</label>
          <select
            {...register("task", { required: "Task is required" })}
            className="input input-bordered"
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

        <div className="form-control">
          <label className="label-text text-lg font-semibold">
            Worked Hours
          </label>
          <input
            type="number"
            {...register("hours", { required: "Worked Hours is required" })}
            className="input input-bordered"
          />
          {errors.hours && (
            <p className="text-red-500 text-sm">{errors.hours.message}</p>
          )}
        </div>

        <div className="form-control">
          <label className="label-text text-lg font-semibold">
            Select Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setValue("date", date)}
            className="input input-bordered"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Task</th>
            <th>Hours</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task._id}>
              <td>{task.task}</td>
              <td>{task.hours}</td>
              <td>{task.date}</td>
              <td>
                <button
                  onClick={() => openEditModal(task)}
                  className="text-blue-500"
                >
                  <FaEdit />
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteTask(task)}
                  className="text-red-500"
                >
                  <FcDeleteRow />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <form onSubmit={handleSubmit(handleUpdateTask)}>
              <div className="form-control mb-4">
                <label className="label-text font-semibold">Task</label>
                <select {...register("task")} className="input input-bordered">
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-Work">Paper-Work</option>
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label-text font-semibold">Worked Hours</label>
                <input
                  type="number"
                  {...register("hours")}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label-text font-semibold">Select Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setValue("date", date)}
                  className="input input-bordered"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
