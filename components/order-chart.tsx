"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "JUL 1st WEEK", Orders: 40 },
  { name: "JUL 2nd WEEK", Orders: 30 },
  { name: "JUL 3rd WEEK", Orders: 20 },
  { name: "JUL 4th WEEK", Orders: 27 },
  { name: "AUG 1st WEEK", Orders: 18 },
  { name: "AUG 2nd WEEK", Orders: 23 },
  { name: "AUG 3rd WEEK", Orders: 34 },
];

export function OrderChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Orders"
          stroke="#ef4444"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
