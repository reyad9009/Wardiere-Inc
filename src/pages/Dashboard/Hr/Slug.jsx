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
  ReferenceLine,
  Label,
  Cell,
} from "recharts";
import { useMemo } from "react";

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-green-600">Salary: ${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// Extracted BarChart component with professional enhancements
const SalaryBarChart = ({ data }) => {
  if (data.length === 0) {
    return <p className="text-center text-lg text-gray-500">No salary data available to display.</p>;
  }

  // Calculate average salary for reference line
  const averageSalary = useMemo(() => {
    const total = data.reduce((sum, entry) => sum + entry.salary, 0);
    return total / data.length;
  }, [data]);

  return (
    <div className="w-full h-96 mb-12">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 50, right: 30, left: 20, bottom: 50 }}
          barGap={50}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="monthYear"
            angle={0}
            textAnchor="middle"
            tick={{ fontSize: 12 }}
            label={{
              value: "Month & Year",
              position: "insideBottom",
              offset: -20,
              fontSize: 14,
            }}
          />
          <YAxis
            label={{
              value: "Salary ($)",
              angle: -90,
              position: "insideLeft",
              offset: -10,
              fontSize: 14,
            }}
            tick={{ fontSize: 12 }}
            domain={[0, Math.max(...data.map((d) => d.salary)) + 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f5f5f5" }} />
          <ReferenceLine
            y={averageSalary}
            stroke="#FF6B6B"
            strokeDasharray="3 3"
          >
            <Label
              value={`Avg: $${averageSalary.toFixed(2)}`}
              position="insideTopRight"
              fill="#FF6B6B"
              fontSize={12}
            />
          </ReferenceLine>
          <Bar dataKey="salary" barSize={100}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#colorGradient${index % 2})`} // Alternate gradients
              />
            ))}
          </Bar>
          {/* Define gradients for bars */}
          <defs>
            <linearGradient id="colorGradient0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="100%" stopColor="#81C784" />
            </linearGradient>
            <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64B5F6" />
              <stop offset="100%" stopColor="#90CAF9" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Slug = () => {
  const paymentData = useLoaderData();

  // Memoize chart data to avoid recalculating on every render
  const chartData = useMemo(() => {
    return paymentData.flatMap((user) =>
      user.salaryDetails.map((detail) => ({
        monthYear: `${detail.month.slice(0, 3).toUpperCase()}-${detail.year.slice(-2)}`,
        salary: parseInt(detail.salary) || 0, // Fallback to 0 if parsing fails
      }))
    );
  }, [paymentData]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Salary Details</h2>
      
      {/* Render Individual Payment Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentData.map((data) => (
          <SlugDetails key={data.name} paymentData={data} />
        ))}
      </div>

      {/* Render Bar Chart */}
      <SalaryBarChart data={chartData} />
    </div>
  );
};

export default Slug;