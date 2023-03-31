import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { DefenseStats } from "@/models/stats";
import { IGetTeamLeaders } from "@/models/team";

interface Props {
  stats: IGetTeamLeaders[];
}

type DataRow = {
  defCatchAllowed: number;
  defDeflections: number;
  defForcedFum: number;
  defFumRec: number;
  defIntReturnYds: number;
  defInts: number;
  defPts: number;
  defSacks: number;
  defSafeties: number;
  defTDs: number;
  defTotalTackles: number;
  name: string;
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
    href={`/player/${row.rosterId}/${row.teamId}/${row.seasonIndex}`}
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
    name: "TAK",
    selector: (row) => row.defTotalTackles,
    sortable: true,
    compact: true,
  },
  {
    name: "INT",
    selector: (row) => row.defInts,
    sortable: true,
    compact: true,
  },
  {
    name: "SACK",
    selector: (row) => row.defSacks,
    sortable: true,
    compact: true,
  },
  {
    name: "TD",
    selector: (row) => row.defTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "SAFETY",
    selector: (row) => row.defSafeties,
    sortable: true,
    compact: true,
  },
  {
    name: "FF",
    selector: (row) => row.defForcedFum,
    sortable: true,
    compact: true,
  },
  {
    name: "FR",
    selector: (row) => row.defFumRec,
    sortable: true,
    compact: true,
  },
  {
    name: "PD",
    selector: (row) => row.defDeflections,
    sortable: true,
    compact: true,
  },
  {
    name: "CA",
    selector: (row) => row.defCatchAllowed,
    sortable: true,
    compact: true,
  },
];

const DefenseTable = ({ stats }: Props) => {
  const [defense, setDefense] = useState<DefenseStats[]>([]);
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, teamId, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: DefenseStats[] = [];

    stats.forEach((stat) => {
      if (stat.dataType === "defense") {
        newArray.push(stat);
      }
    });

    setDefense(newArray);
  }, [stats]);

  useEffect(() => {
    if (!defense.length) return;

    const newArray: DataRow[] = [];

    defense.forEach(
      ({
        defCatchAllowed,
        defDeflections,
        defForcedFum,
        defFumRec,
        defIntReturnYds,
        defInts,
        defPts,
        defSacks,
        defSafeties,
        defTDs,
        defTotalTackles,
        fullName,
        playerInfo,
      }) => {
        newArray.push({
          defCatchAllowed,
          defIntReturnYds,
          defDeflections,
          defForcedFum,
          defFumRec,
          defInts,
          defPts,
          defSacks,
          defSafeties,
          defTDs,
          defTotalTackles,
          name: fullName,
          teamId: Number(teamId),
          teamName: String(teamName),
          seasonIndex: Number(seasonIndex),
          rosterId: playerInfo.rosterId,
        });
      }
    );

    setData(newArray);
  }, [defense, seasonIndex, teamId, teamName]);

  return (
    <div className="bg-white p-1 rounded text-sm">
      <DataTable dense columns={columns} data={data} />
    </div>
  );
};

export default DefenseTable;
