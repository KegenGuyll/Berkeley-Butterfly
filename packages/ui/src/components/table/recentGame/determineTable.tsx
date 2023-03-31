import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DataType, IGameLog } from "@/models/stats";
import roundNumber from "@/utils/roundNumber";
import tableColumns from "../columns";

interface Props {
  activeDataType: DataType;
  activeGames:
    | Record<
        number,
        Record<
          DataType,
          {
            index: number;
          }
        >
      >
    | undefined;
  gameLog: IGameLog[];
}

const DetermineTable = ({ gameLog, activeGames, activeDataType }: Props) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!activeGames) return;

    const newArray: any[] = [];

    Object.values(activeGames).forEach((dataType) => {
      if (dataType.passing && activeDataType === DataType.PASSING) {
        const { passYdsPerAtt, passCompPct, passerRating, ...passsing } =
          gameLog[dataType.passing.index].passingStats[0];

        newArray.push({
          ...gameLog[dataType.passing.index],
          ...passsing,
          passYdsPerAtt: roundNumber(passYdsPerAtt, 1),
          passCompPct: roundNumber(passCompPct, 1),
          passerRating: roundNumber(passerRating, 1),
        });

        setData(newArray);
      } else if (dataType.rushing && activeDataType === DataType.RUSHING) {
        const { rushYdsPerAtt, ...rushing } =
          gameLog[dataType.rushing.index].rushingStats[0];

        newArray.push({
          ...gameLog[dataType.rushing.index],
          ...rushing,
          rushYdsPerAtt: roundNumber(rushYdsPerAtt, 1),
        });

        setData(newArray);
      } else if (dataType.receiving && activeDataType === DataType.RECEIVING) {
        const {
          recYdsAfterCatch,
          recYdsPerCatch,
          recYacPerCatch,
          ...receiving
        } = gameLog[dataType.receiving.index].receivingStats[0];

        newArray.push({
          ...gameLog[dataType.receiving.index],
          ...receiving,
          recYdsAfterCatch: roundNumber(recYdsAfterCatch, 1),
          recYdsPerCatch: roundNumber(recYdsPerCatch, 1),
          recYacPerCatch: roundNumber(recYacPerCatch, 1),
        });

        setData(newArray);
      } else if (dataType.defense && activeDataType === DataType.DEFENSE) {
        const { ...defense } = gameLog[dataType.defense.index].defenseStats[0];

        newArray.push({
          ...gameLog[dataType.defense.index],
          ...defense,
        });

        setData(newArray);
      }
    });
  }, [gameLog, activeGames]);

  return (
    <div className="bg-white p-1 rounded text-sm">
      <DataTable dense columns={tableColumns(activeDataType)} data={data} />
    </div>
  );
};

export default DetermineTable;
