import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { Player } from "@/models/players";
import PlayerPortrait from "../common/image/playerPortrait";
import InchesToFeet from "@/utils/inchesToFeet";
import DevTraitImage from "../common/image/devTraitImage";
import convertToInternationalCurrencySystem from "@/utils/CurrencySystem";

interface Props {
  players: Player[];
}

type DataRow = Player & {
  seasonIndex: number;
  teamName: string;
};

interface CustomElementProps {
  row: DataRow;
}

const PlayerName = ({ row }: CustomElementProps) => (
  <span className="flex items-center space-x-3 py-2">
    <div className=" relative h-12 w-12 ">
      <PlayerPortrait portraitId={row.portraitId} playerName={row.lastName} />
    </div>

    <Link
      className="text-blue-500 hover:text-blue-600"
      href={`/player/${row.rosterId}/${row.teamId}/${row.seasonIndex}`}
    >
      {`${row.firstName} ${row.lastName}`}
    </Link>
  </span>
);

const DevTrait = ({ row }: CustomElementProps) => (
  <span>
    <div className=" relative h-8 w-8">
      <DevTraitImage devTrait={row.devTrait} />
    </div>
  </span>
);

const columns: TableColumn<DataRow>[] = [
  {
    name: "NAME",
    selector: (row) => `${row.firstName} ${row.lastName}`,
    maxWidth: "600px",
    grow: 1,
    cell: (row) => <PlayerName row={row} />,
  },
  {
    name: "Dev",
    selector: (row) => row.devTrait,
    maxWidth: "600px",
    grow: 1,
    cell: (row) => <DevTrait row={row} />,
    sortable: true,
    compact: true,
  },
  {
    name: "POS",
    selector: (row) => row.position,
    sortable: true,
  },
  {
    name: "Ovr",
    selector: (row) => row.playerBestOvr,
    sortable: true,
  },
  {
    name: "Salary",
    selector: (row) => row.contractSalary,
    sortable: true,
    cell: (row) => (
      <span>{convertToInternationalCurrencySystem(row.contractSalary)}</span>
    ),
  },
  {
    name: "AGE",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "HT",
    selector: (row) => row.height,
    sortable: true,
    compact: true,
    cell: (row) => <span>{InchesToFeet(row.height)}</span>,
  },
  {
    name: "WT",
    selector: (row) => row.weight,
    sortable: true,
    compact: true,
  },
  {
    name: "EXP",
    selector: (row) => row.yearsPro,
    sortable: true,
    compact: true,
  },
  {
    name: "COLLEGE",
    selector: (row) => row.college,
    sortable: true,
  },
];

const playerTable = ({ players }: Props) => {
  const [data, setData] = useState<DataRow[]>([]);
  const router = useRouter();

  const { teamName, seasonIndex } = router.query;

  useEffect(() => {
    const newArray: DataRow[] = [];

    players.forEach((player) => {
      newArray.push({
        ...player,
        teamName: String(teamName),
        seasonIndex: Number(seasonIndex),
      });
    });

    setData(newArray);
  }, [players]);

  return (
    <div className="bg-white p-1 rounded text-sm w-full">
      <DataTable dense columns={columns} data={data} />
    </div>
  );
};

export default playerTable;
