import React, { useMemo } from "react";
import { DataType, RankedPlayerStats } from "@/models/stats";
import { dataTypeToRankedStats } from "@/utils/dataType";

interface Props {
  dataType: DataType;
  ranked: RankedPlayerStats | undefined;
  seasonIndex: number;
}

interface ListElementProps {
  place: number;
  statsTotal: number;
  title: string;
}

const ListElement = ({ title, statsTotal, place }: ListElementProps) => {
  return (
    <li className="flex flex-col">
      <span className="font-light">{title.toUpperCase()}</span>
      <span className="font-bold text-xl">{statsTotal}</span>
      <span className="font-light">{place}</span>
    </li>
  );
};

const ProfileSeasonStats = ({ seasonIndex, ranked }: Props) => {
  if (!ranked) return null;

  const formattedRanked = useMemo(() => {
    return dataTypeToRankedStats(ranked);
  }, [ranked]);

  return (
    <div className="w-full flex lg:justify-center lg:items-center lg:px-3">
      <div className="border rounded w-full lg:w-max h-max">
        <div className="bg-slate-700 text-white rounded-t w-full px-3 py-1 text-center">
          <h2>{2022 + Number(seasonIndex)} Season Stats</h2>
        </div>
        <ul className="p-3 flex items-center space-x-3 justify-evenly text-center text-sm">
          {Object.keys(formattedRanked).map((v, index) => (
            <ListElement
              key={index}
              title={v}
              statsTotal={(formattedRanked as any)[v]?.total}
              place={(formattedRanked as any)[v]?.rank}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSeasonStats;
