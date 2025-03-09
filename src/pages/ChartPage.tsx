import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { RootState } from '../store';

export const ChartPage: React.FC = () => {
  const { stores, weeks, planningData } = useSelector((state: RootState) => state.app);
  const [selectedStore, setSelectedStore] = useState<string>(stores[0]?.id || '');

  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    return weeks.map((week) => {
      const weekData = planningData.filter(
        (entry) => entry.storeId === selectedStore && entry.weekId === week.id
      );

      const totalGMDollars = weekData.reduce(
        (sum, entry) => sum + entry.gmDollars,
        0
      );
      const totalSalesDollars = weekData.reduce(
        (sum, entry) => sum + entry.salesDollars,
        0
      );
      const gmPercentage = totalSalesDollars
        ? (totalGMDollars / totalSalesDollars) * 100
        : 0;

      return {
        week: `Week ${week.weekNumber}`,
        gmDollars: totalGMDollars,
        gmPercentage,
      };
    });
  }, [selectedStore, weeks, planningData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Performance Chart</h1>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ComposedChart
          width={1000}
          height={500}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            name="GM Dollars"
            fill="#8884d8"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercentage"
            name="GM %"
            stroke="#82ca9d"
          />
        </ComposedChart>
      </div>
    </div>
  );
};