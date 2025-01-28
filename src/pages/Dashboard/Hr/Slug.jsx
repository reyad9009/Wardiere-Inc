import { useLoaderData } from "react-router-dom";
import SlugDetails from "./SlugDetails";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Slug = () => {
  const paymentData = useLoaderData();

  // Combine salary details from all users into one array for the chart
  const chartData = paymentData.flatMap((user) =>
    user.salaryDetails.map((detail) => ({
      monthYear: `${detail.month.slice(0, 3).toUpperCase()}-${detail.year.slice(
        -2
      )}`, // Format as DEC-25
      salary: parseInt(detail.salary), // Ensure salary is a number
    }))
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Salary Details</h2>
      {/* Render Individual Payment Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentData.map((data) => (
          <SlugDetails key={data.name} paymentData={data}></SlugDetails>
        ))}
      </div>
      {/* Render Bar Chart */}
      {chartData.length > 0 ? (
        <div className="w-full h-96 mb-12">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 50, right: 30, left: 20, bottom: 50 }}
              barGap={50}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="monthYear"
                angle={0}
                textAnchor="middle"
                tick={{ fontSize: 12 }}
                label={{
                  value: "Month & Year",
                  position: "insideBottom",
                  offset: -20,
                }}
              />
              <YAxis
                label={{
                  value: "Salary",
                  angle: -90,
                  position: "insideLeft",
                  offset: -10,
                }}
                tick={{ fontSize: 12 }}
                domain={[0, Math.max(...chartData.map((d) => d.salary)) + 100]} // Dynamically adjust Y-axis range
              />
              <Tooltip cursor={{ fill: "#f5f5f5" }} />
              <Bar dataKey="salary" fill="#4CAF50" barSize={100} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No salary data available to display.
        </p>
      )}
    </div>
  );
};

export default Slug;
