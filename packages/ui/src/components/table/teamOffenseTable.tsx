import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { TeamStats } from "@/models/stats";
import roundNumber from "@/utils/roundNumber";

interface Props {
  stats: TeamStats[];
}

type DataRow = TeamStats & {
  teamName: string;
};

interface CustomTitleProps {
  row: DataRow;
}

const CustomTitle = ({ row }: CustomTitleProps) => (
  <Link
    className="text-blue-500 hover:text-blue-600"
    href={`/game/${row.teamName}/${row.teamId}/${row.scheduleId}`}
  >
    {row.weekIndex + 1}
  </Link>
);

const columns: TableColumn<DataRow>[] = [
  {
    name: "Week",
    selector: (row) => row.weekIndex + 1,
    sortable: true,
    compact: true,
    maxWidth: "600px",
    cell: (row) => <CustomTitle row={row} />,
  },
  {
    name: "Total Yds",
    selector: (row) => row.offTotalYdsGained,
    sortable: true,
    compact: true,
  },
  {
    name: "Pass Yds",
    selector: (row) => row.offPassYds,
    sortable: true,
    compact: true,
  },
  {
    name: "Pass TDs",
    selector: (row) => row.offPassTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "Rush Yds",
    selector: (row) => row.offRushYds,
    sortable: true,
    compact: true,
  },
  {
    name: "Rush TDs",
    selector: (row) => row.offRushTDs,
    sortable: true,
    compact: true,
  },
  {
    name: "1st down",
    selector: (row) => row.off1stDowns,
    sortable: true,
    compact: true,
  },
  {
    name: "3rd down Att",
    selector: (row) => row.off3rdDownAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "3rd down %",
    selector: (row) => `${roundNumber(row.off3rdDownConvPct, 1)}%`,
    sortable: true,
    compact: true,
  },
  {
    name: "4th down Att",
    selector: (row) => row.off4thDownAtt,
    sortable: true,
    compact: true,
  },
  {
    name: "4th down %",
    selector: (row) => `${roundNumber(row.off4thDownConvPct, 1)}%`,
    sortable: true,
    compact: true,
  },
];

const OffenseTable = ({ stats }: Props) => {
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, teamId, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: DataRow[] = [];

    stats.forEach((value) => {
      newArray.push({
        ...value,
        teamName: String(teamName),
        teamId: Number(teamId),
      });
    });

    setData(newArray);
  }, [stats, seasonIndex, teamId, teamName]);

  return (
    <div className="bg-white p-1 rounded text-sm">
      <DataTable dense columns={columns} data={data} />
    </div>
  );
};

export default OffenseTable;
