import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import moment from "moment";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedName, setSelectedName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Fetch employee tasks
  const { data: employeeTask = [], refetch } = useQuery({
    queryKey: ["employeeTask"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees-task");
      return res.data;
    },
  });

  // Extract unique years for the year dropdown
  const uniqueYears = [
    ...new Set(employeeTask.map((task) => moment(task.date).format("YYYY"))),
  ];

  // Filter tasks based on selected criteria
  const filteredTasks = employeeTask.filter((task) => {
    return (
      (selectedName ? task.name === selectedName : true) &&
      (selectedMonth
        ? new Date(task.date).getMonth() + 1 === parseInt(selectedMonth)
        : true) &&
      (selectedYear ? moment(task.date).format("YYYY") === selectedYear : true)
    );
  });

  return (
    <div>
      {/* Filters */}
      <div>
        <div className="form-control">
          <label className="label-text text-lg font-semibold">Employee</label>
          <select
            className="input input-bordered"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">All</option>
            {[
              ...new Set(employeeTask.map((task) => task.name)), // Extract unique names
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-4">
          <label className="label-text text-lg font-semibold">Month</label>
          <select
            className="input input-bordered"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {moment().month(i).format("MMMM")}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-4">
          <label className="label-text text-lg font-semibold">Year</label>
          <select
            className="input input-bordered"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Table */}
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="p-3 border border-blue-300">Name</th>
            <th className="p-3 border border-blue-300">Email</th>
            <th className="p-3 border border-blue-300">Task</th>
            <th className="p-3 border border-blue-300">Hours</th>
            <th className="p-3 border border-blue-300">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td className="p-3 border border-blue-300">{task.name}</td>
              <td className="p-3 border border-blue-300">{task.email}</td>
              <td className="p-3 border border-blue-300">{task.task}</td>
              <td className="p-3 border border-blue-300">{task.hours}</td>
              <td className="p-3 border border-blue-300">
                {moment(task.date).format("YYYY-MM-DD")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
