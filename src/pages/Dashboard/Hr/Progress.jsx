import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedName, setSelectedName] = useState("");

  const { data: employeeTask = [], refetch } = useQuery({
    queryKey: ["employeeTask", selectedName],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees-task");
      return res.data;
    },
  });

  const filteredTasks = selectedName
    ? employeeTask.filter((task) => task.name === selectedName)
    : employeeTask;

  return (
    <div>
      <div>
        <div className="form-control">
          <label className="label-text text-lg font-semibold">Task</label>
          <select
            className="input input-bordered"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          >
            <option value="">All</option>
            {employeeTask.map((task) => (
              <option key={task._id} value={task.name}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="w-full border">
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
              <td className="p-3 border border-blue-300">{task.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Progress;
