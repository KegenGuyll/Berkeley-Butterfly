import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { RushingStats } from "@/models/stats";
import { IGetTeamLeaders } from "@/models/team";
import roundNumber from "@/utils/roundNumber";

interface Props {
  stats: IGetTeamLeaders[];
}

type DataRow = {
  name: string;
  rosterId: number;
  rush20PlusYds: number;
  rushAtt: number;
  rushBrokenTackles: number;
  rushFum: number;
  rushLongest: number;
  rushTDs: number;
  rushYds: number;
  rushYdsAfterContact: number;
  rushYdsPerAtt: number;
  rushYdsPerGame: number;
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
    name: "ATT",
    selector: (row) => row.rushAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.rushYdsPerAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.rushYds,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.rushLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "BIG",
    selector: (row) => row.rush20PlusYds,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.rushTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS/G",
    selector: (row) => row.rushYdsPerGame,
    sortable: true,
    compact: true,
  },
  {
    name: "FUM",
    selector: (row) => row.rushFum,
    sortable: true,
    compact: true,
  },
  {
    name: "RAC",
    selector: (row) => row.rushYdsAfterContact,
    sortable: true,
    compact: true,
  },
  {
    name: "BT",
    selector: (row) => row.rushBrokenTackles,
    sortable: true,
    compact: true,
  },
];

const RushingTable = ({ stats }: Props) => {
  const [passing, setPassing] = useState<RushingStats[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, teamId, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: RushingStats[] = [];

    stats.forEach((stat) => {
      if (stat.dataType === "rushing") {
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
        rushAtt,
        rushYds,
        rushTDs,
        fullName,
        rushLongest,
        rushYdsPerAtt,
        rushYdsPerGame,
        rush20PlusYds,
        playerInfo,
        rushBrokenTackles,
        rushFum,
        rushYdsAfterContact,
      }) => {
        newArray.push({
          rushAtt,
          rushLongest,
          rushTDs,
          rushYds,
          rushYdsPerAtt: roundNumber(rushYdsPerAtt, 1),
          rushYdsPerGame: roundNumber(rushYdsPerGame, 1),
          name: fullName,
          teamId: Number(teamId),
          teamName: String(teamName),
          seasonIndex: Number(seasonIndex),
          rosterId: playerInfo.rosterId,
          rush20PlusYds,
          rushBrokenTackles,
          rushFum,
          rushYdsAfterContact,
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

export default RushingTable;
