import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReceivingStats } from "@/models/stats";
import { IGetTeamLeaders } from "@/models/team";
import roundNumber from "@/utils/roundNumber";

interface Props {
  stats: IGetTeamLeaders[];
}

type DataRow = {
  name: string;
  recCatchPct: number;
  recCatches: number;
  recDrops: number;
  recLongest: number;
  recPts: number;
  recTDs: number;
  recToPct: number;
  recYacPerCatch: number;
  recYds: number;
  recYdsAfterCatch: number;
  recYdsPerCatch: number;
  recYdsPerGame: number;
  rosterId: number;
  seasonIndex: number;
  teamId: number;
  teamName: string;
};

interface CustomTitleProps {
  row: DataRow;
}

const CustomTitle = ({ row }: CustomTitleProps) => (
  <Link
    className="text-blue-500 hover:text-blue-600"
    href={`/player/${row.teamName}/${row.teamId}/${row.rosterId}`}
  >
    {row.name}
  </Link>
);

const columns: TableColumn<DataRow>[] = [
  {
    name: "NAME",
    selector: (row) => row.name,
    maxWidth: "600px",
    grow: 1,
    cell: (row) => <CustomTitle row={row} />,
  },
  {
    name: "REC",
    selector: (row) => row.recCatches,
    sortable: true,
    compact: true,
  },
  {
    name: "REC %",
    selector: (row) => row.recCatchPct,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.recYds,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.recYdsPerCatch,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.recTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.recLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS/G",
    selector: (row) => row.recYdsPerGame,
    sortable: true,
    compact: true,
  },
  {
    name: "DROP",
    selector: (row) => row.recDrops,
    sortable: true,
    compact: true,
  },
  {
    name: "YAC",
    selector: (row) => row.recYacPerCatch,
    sortable: true,
    compact: true,
  },
];

const ReceivingTable = ({ stats }: Props) => {
  const [passing, setPassing] = useState<ReceivingStats[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, teamId, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: ReceivingStats[] = [];

    stats.forEach((stat) => {
      if (stat.dataType === "receiving") {
        newArray.push(stat);
      }
    });

    setPassing(newArray);
  }, [stats]);

  useEffect(() => {
    if (!passing.length) return;

    const newArray: DataRow[] = [];

    passing.forEach(
      ({
        recCatchPct,
        recCatches,
        recDrops,
        recLongest,
        recPts,
        recTDs,
        recToPct,
        recYacPerCatch,
        recYds,
        recYdsAfterCatch,
        recYdsPerCatch,
        recYdsPerGame,
        fullName,
        playerInfo,
      }) => {
        newArray.push({
          recCatches,
          recDrops,
          recCatchPct: roundNumber(recCatchPct, 1),
          recYacPerCatch: roundNumber(recYacPerCatch, 1),
          recLongest,
          recPts,
          recTDs,
          recToPct,
          recYds,
          recYdsAfterCatch: roundNumber(recYdsAfterCatch, 1),
          recYdsPerCatch: roundNumber(recYdsPerCatch, 1),
          recYdsPerGame: roundNumber(recYdsPerGame, 1),
          name: fullName,
          teamId: Number(teamId),
          teamName: String(teamName),
          seasonIndex: Number(seasonIndex),
          rosterId: playerInfo.rosterId,
        });
      }
    );

    setData(newArray);
  }, [passing, seasonIndex, teamId, teamName]);

  return (
    <div className="bg-white p-1 rounded text-sm">
      <DataTable dense columns={columns} data={data} />
    </div>
  );
};

export default ReceivingTable;
