"use client"; // For Next.js

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define TypeScript types
interface HeartRateData {
  date: string;
  heartRate: number;
}

const heartRateData: Record<string, HeartRateData[]> = {
  January: [
    { date: "Jan 1", heartRate: 72 },
    { date: "Jan 5", heartRate: 75 },
    { date: "Jan 10", heartRate: 70 },
    { date: "Jan 15", heartRate: 74 },
  ],
  February: [
    { date: "Feb 1", heartRate: 76 },
    { date: "Feb 5", heartRate: 73 },
    { date: "Feb 10", heartRate: 78 },
    { date: "Feb 15", heartRate: 71 },
  ],
  March: [
    { date: "Mar 1", heartRate: 74 },
    { date: "Mar 5", heartRate: 72 },
    { date: "Mar 10", heartRate: 76 },
    { date: "Mar 15", heartRate: 70 },
  ],
};

export default function HeartRateChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof heartRateData>("January");

  return (
    <div className="blood-pressure-container">
      <div className="blood-pressure-container-header">
        <h2 className="">Heart Rate Trends</h2>
        
        {/* Month Filter */}
        <select
          className=""
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as keyof typeof heartRateData)}
        >
          {Object.keys(heartRateData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={heartRateData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          {/* Heart Rate Line */}
          <Line type="monotone" dataKey="heartRate" stroke="#E53935" strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
