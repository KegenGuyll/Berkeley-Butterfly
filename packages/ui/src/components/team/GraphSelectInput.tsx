import { ChartDataset } from "chart.js";
import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { DataType, TeamStats, preGameStats } from "@/models/stats";
import Button from "../common/button";

interface Props {
  perGameStats: Record<DataType, preGameStats[]>;
  setDataset: React.Dispatch<React.SetStateAction<ChartDataset<"line">[]>>;
  stats: TeamStats[];
}

type SelectOptions = {
  label: string;
  value: string;
};

const selectMenuOptions = [
  {
    value: "game",
    label: "Game",
  },
  {
    value: "redZone",
    label: "Red Zone",
  },
  {
    value: "passing",
    label: "Passing",
  },
  // {
  //   value: "rushing",
  //   label: "Rushing",
  // },
  // {
  //   value: "scoring",
  //   label: "Scoring",
  // },
];

const secondMenuOptions = {
  game: [
    {
      value: "penalties",
      label: "Number of Penalties",
    },
    {
      value: "penaltyYds",
      label: "Penalties Yards",
    },
    {
      value: "offTotalYds",
      label: "Total Offense Yards",
    },
    {
      value: "offPassYds",
      label: "Passing Yards",
    },
    {
      value: "offRushYds",
      label: "Rushing Yards",
    },
    {
      value: "offPassTDs",
      label: "Passing Touchdowns",
    },
    {
      value: "offRushTDs",
      label: "Rushing Touchdowns",
    },
  ],
  redZone: [
    {
      value: "defRedZoneFGs",
      label: "(Defense) RedZone Field Goals",
    },
    {
      value: "defRedZones",
      label: "(Defense) RedZone trips",
    },
    {
      value: "defRedZonePct",
      label: "(Defense) RedZone Percentage",
    },
    {
      value: "defRedZoneTDs",
      label: "(Defense) RedZone Touchdowns",
    },
    {
      value: "offRedZoneFGs",
      label: "(Offense) RedZone Field Goals",
    },
    {
      value: "offRedZones",
      label: "(Offense) RedZone trips",
    },
    {
      value: "offRedZonePct",
      label: "(Offense) RedZone Percentage",
    },
    {
      value: "offRedZoneTDs",
      label: "(Offense) RedZone Touchdowns",
    },
  ],
  passing: [
    {
      value: "passAtt",
      label: "Passing Attempts",
    },
    {
      value: "passComp",
      label: "Passing Completions",
    },
    {
      value: "passCompPct",
      label: "Passing Completions %",
    },
    {
      value: "passInts",
      label: "Passing Interceptions",
    },
    {
      value: "passYds",
      label: "Passing Yards",
    },
    {
      value: "passerRating",
      label: "Passing Rating",
    },
    {
      value: "passYdsPerAtt",
      label: "Passing Yards Per Att",
    },
    {
      value: "passTDs",
      label: "Passing Touchdown",
    },
    {
      value: "passSacks",
      label: "Times QB sacked",
    },
  ],
};

const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

const GraphSelectInput = ({ perGameStats, stats, setDataset }: Props) => {
  const [selectMenu, setSelectMenu] = useState<SelectOptions>();
  const [selectMenuSec, setSelectMenuSec] = useState<SelectOptions>();
  const [localDataset, setLocalDataset] = useState<ChartDataset<"line">>();

  useEffect(() => {
    if (!selectMenuSec || !selectMenu) return;

    const dataInput: number[] = [];
    const playerStats = perGameStats.passing;

    if (["redZone", "game"].includes(selectMenu.value)) {
      stats.forEach((stat) => {
        dataInput.push((stat as any)[selectMenuSec.value]);
      });
    } else {
      playerStats.forEach((stat) => {
        dataInput.push((stat as any)[selectMenuSec.value]);
      });
    }

    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);

    setLocalDataset({
      label: selectMenuSec?.label,
      data: dataInput,
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
    });
  }, [stats, perGameStats, selectMenuSec]);

  const handleMenuSelect = (
    d: SingleValue<{
      label: string;
      value: string;
    }>,
    type: "primary" | "secondary"
  ) => {
    if (!d) return;

    if (type === "primary") {
      setSelectMenu({ label: d.label, value: d.value });
    }

    if (type === "secondary") {
      setSelectMenuSec({ label: d.label, value: d.value });
    }
  };

  const handleAddData = () => {
    if (!selectMenu || !selectMenuSec || !localDataset) return;

    setDataset((prevState) => [...prevState, localDataset]);
  };

  return (
    <div className="space-y-3">
      <Select
        onChange={(d) => handleMenuSelect(d, "primary")}
        options={selectMenuOptions}
      />
      {selectMenu && (
        <Select
          onChange={(d) => handleMenuSelect(d, "secondary")}
          options={
            (secondMenuOptions as any)[selectMenu.value] as SelectOptions[]
          }
        />
      )}
      <Button onClick={handleAddData} className="w-full" variant="primary">
        Add Data to Graph
      </Button>
    </div>
  );
};

export default GraphSelectInput;
