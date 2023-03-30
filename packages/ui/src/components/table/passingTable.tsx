import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { PassingStats } from "@/models/stats";
import { IGetTeamLeaders } from "@/models/team";
import roundNumber from "@/utils/roundNumber";

interface Props {
  stats: IGetTeamLeaders[];
}

type DataRow = {
  name: string;
  passAtt: number;
  passComp: number;
  passCompPct: number;
  passInts: number;
  passLongest: number;
  passSacks: number;
  passTDs: number;
  passYds: number;
  passYdsPerAtt: number;
  passYdsPerGame: number;
  passerRating: number;
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
    name: "CMP",
    selector: (row) => row.passComp,
    sortable: true,
    compact: true,
  },
  {
    name: "ATT",
    selector: (row) => row.passAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "CMP%",
    selector: (row) => row.passCompPct,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS",
    selector: (row) => row.passYds,
    sortable: true,
    compact: true,
  },
  {
    name: "AVG",
    selector: (row) => row.passYdsPerAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "YDS/G",
    selector: (row) => row.passYdsPerGame,
    sortable: true,
    compact: true,
  },
  {
    name: "LNG",
    selector: (row) => row.passLongest,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.passTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "INT",
    selector: (row) => row.passInts,
    sortable: true,
    compact: true,
  },
  {
    name: "SACK",
    selector: (row) => row.passSacks,
    sortable: true,
    compact: true,
  },
  {
    name: "RTG",
    selector: (row) => row.passerRating,
    sortable: true,
    compact: true,
  },
];

const PassingTable = ({ stats }: Props) => {
  const [passing, setPassing] = useState<PassingStats[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, teamId, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: PassingStats[] = [];

    stats.forEach((stat) => {
      if (stat.dataType === "passing") {
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
        passAtt,
        passComp,
        passCompPct,
        passInts,
        passLongest,
        passSacks,
        passTDs,
        passYds,
        passYdsPerAtt,
        passYdsPerGame,
        passerRating,
        fullName,
        playerInfo,
      }) => {
        newArray.push({
          passAtt,
          passComp,
          passCompPct: roundNumber(passCompPct, 1),
          passerRating: roundNumber(passerRating, 1),
          passInts,
          passLongest,
          passSacks,
          passTDs,
          passYds,
          passYdsPerAtt: roundNumber(passYdsPerAtt, 1),
          passYdsPerGame: roundNumber(passYdsPerGame, 1),
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

export default PassingTable;
