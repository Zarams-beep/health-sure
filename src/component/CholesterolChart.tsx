"use client"; // For Next.js

import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Define TypeScript types
interface CholesterolData {
  date: string;
  LDL: number;
  HDL: number;
  total: number;
}

const cholesterolData: Record<string, CholesterolData[]> = {
  January: [
    { date: "Jan 1", LDL: 120, HDL: 50, total: 180 },
    { date: "Jan 5", LDL: 125, HDL: 52, total: 185 },
    { date: "Jan 10", LDL: 118, HDL: 48, total: 176 },
    { date: "Jan 15", LDL: 130, HDL: 55, total: 190 },
  ],
  February: [
    { date: "Feb 1", LDL: 122, HDL: 51, total: 182 },
    { date: "Feb 5", LDL: 128, HDL: 53, total: 186 },
    { date: "Feb 10", LDL: 115, HDL: 47, total: 172 },
    { date: "Feb 15", LDL: 135, HDL: 58, total: 193 },
  ],
  March: [
    { date: "Mar 1", LDL: 124, HDL: 50, total: 180 },
    { date: "Mar 5", LDL: 121, HDL: 49, total: 178 },
    { date: "Mar 10", LDL: 130, HDL: 56, total: 192 },
    { date: "Mar 15", LDL: 118, HDL: 46, total: 170 },
  ],
};

export default function CholesterolChart() {
  const [selectedMonth, setSelectedMonth] = useState<keyof typeof cholesterolData>("January");

  return (
    <div className="blood-pressure-container">
      <div className="blood-pressure-container-header">
        <h2 className="">Cholesterol Levels</h2>
        
        {/* Month Filter */}
        <select
          className=""
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as keyof typeof cholesterolData)}
        >
          {Object.keys(cholesterolData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={cholesterolData[selectedMonth]} className="bar-line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          {/* LDL & HDL Bars */}
          <Bar dataKey="LDL" fill="#E53935" name="LDL Cholesterol" barSize={40} />
          <Bar dataKey="HDL" fill="#1E88E5" name="HDL Cholesterol" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={cholesterolData[selectedMonth]} className="line-chart">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          {/* Total Cholesterol Line */}
          <Line type="monotone" dataKey="total" stroke="#FBC02D" strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
