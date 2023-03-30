import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: ChartData<"scatter"> | undefined;
  options: ChartOptions<"scatter">;
}

const LineChart = ({ options, data }: Props) => {
  if (!data) return null;

  return (
    <Scatter
      style={{ height: "100% !important", width: "100% !important" }}
      options={options}
      data={data}
    />
  );
};

export default LineChart;
