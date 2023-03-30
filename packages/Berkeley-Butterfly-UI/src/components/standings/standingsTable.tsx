import { useEffect, useState } from "react";
import clsx from "clsx";
import { Standings } from "@/models/standings";

type DataRow = {
  id: number;
  losses: number;
  pointsAgainst: number;
  pointsFor: number;
  team: string;
  tie: number;
  winPct: number;
  wins: number;
};

const columns = [
  {
    name: "TEAM",
    key: "team",
  },
  {
    name: "W",
    key: "wins",
  },
  {
    name: "L",
    key: "losses",
  },
  {
    name: "T",
    key: "tie",
  },
  {
    name: "PCT",
    key: "winPct",
  },
  {
    name: "PF",
    key: "pointsFor",
  },
  {
    name: "PA",
    key: "pointsAgainst",
  },
];

interface Props {
  currTeam: number;
  standings?: Standings[];
}

const sortFunc = (a: Standings, b: Standings) => {
  if (a.rank > b.rank) return 1;

  if (a.rank < b.rank) return -1;

  return 0;
};

const StandingsTable = ({ standings, currTeam }: Props) => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    if (!standings) return;

    const sortedData = [...standings];

    const newData: DataRow[] = sortedData.sort(sortFunc).map((s) => ({
      winPct: s.winPct,
      team: s.teamName,
      wins: s.totalWins,
      losses: s.totalLosses,
      tie: s.totalTies,
      pointsFor: s.ptsFor,
      pointsAgainst: s.ptsAgainst,
      id: s.teamId,
    }));

    setData(newData);
  }, [standings]);

  if (!standings) return null;

  return (
    <table className="table-auto w-full text-sm">
      <thead className=" border-y">
        <tr>
          {columns.map((v) => (
            <th className="first:text-start text-center font-semibold text-gray-700">
              {v.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr className="even:bg-gray-100">
            {columns.map((c) => (
              <td className={clsx(d.id === currTeam && "font-semibold", "p-1")}>
                {(d as any)[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StandingsTable;
