import React, { useEffect, useState } from "react";
import { ChartData, ChartDataset, ChartOptions } from "chart.js";
import { DataType, TeamStats, preGameStats } from "@/models/stats";
import LineChart from "../charts/lineChart";
import GraphSelectInput from "./GraphSelectInput";
import Button from "../common/button";

interface Props {
  perGameStats: Record<DataType, preGameStats[]>;
  stats: TeamStats[];
}

const optionsLine: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 20,
      right: 20,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Offensive Production",
    },
  },
};

const OffenseSeasonStatsGraph = ({ stats, perGameStats }: Props) => {
  const [dataset, setDataset] = useState<ChartDataset<"line">[]>([]);
  const [data, setData] = useState<ChartData<"line">>();

  useEffect(() => {
    const weeklyLabel: string[] = [];

    stats.forEach((teamStats) => {
      weeklyLabel.push(`Wk ${teamStats.weekIndex + 1}`);
    });

    setData({
      labels: weeklyLabel,
      datasets: dataset,
    });
  }, [dataset, stats]);

  const handleDelete = (index: number) => {
    const newDataSet = [...dataset];

    newDataSet.splice(index, 1);

    setDataset(newDataSet);
  };

  return (
    <div>
      <div className="space-y-3">
        <GraphSelectInput
          stats={stats}
          perGameStats={perGameStats}
          setDataset={setDataset}
        />
        <div className="flex items-center flex-wrap">
          {dataset.map((d, i) => (
            <Button
              onDelete={() => handleDelete(i)}
              className="mr-1 mb-1"
              variant="chip"
            >
              {d.label}
            </Button>
          ))}
        </div>
      </div>

      {data && (
        <div className="h-80">
          <LineChart options={optionsLine} data={data} />
        </div>
      )}
    </div>
  );
};

export default OffenseSeasonStatsGraph;
