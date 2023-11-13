import React, { useMemo } from "react";
import TabCard, { Category } from "@/components/common/card/tabCard";
import DetermineTable from "@/components/table/recentGame/determineTable";
import { DataType, IGameLog } from "@/models/stats";
import BaseCard from "@/components/common/card/baseCard";

interface Props {
  gameLog: IGameLog[];
}

const GameLogComponent = ({ gameLog }: Props) => {
  const data = useMemo(() => {
    const availableStats: Record<DataType, boolean> = {
      [DataType.PASSING]: false,
      [DataType.RUSHING]: false,
      [DataType.RECEIVING]: false,
      [DataType.DEFENSE]: false,
      [DataType.KICKING]: false,
      [DataType.PUNTING]: false,
      [DataType.NONE]: false,
    };
    const result: Category[] = [];
    const newActiveGames: Record<
      number,
      Record<DataType, { index: number }>
    > = {};

    gameLog.forEach((g, index) => {
      if (g.kickingStats.length) {
        availableStats[DataType.KICKING] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.KICKING]: {
            index,
          },
        };
      }
      if (g.puntingStats.length) {
        availableStats[DataType.PUNTING] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.PUNTING]: {
            index,
          },
        };
      }
      if (g.defenseStats.length) {
        availableStats[DataType.DEFENSE] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.DEFENSE]: {
            index,
          },
        };
      }
      if (g.passingStats.length) {
        availableStats[DataType.PASSING] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.PASSING]: {
            index,
          },
        };
      }
      if (g.rushingStats.length) {
        availableStats[DataType.RUSHING] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.RUSHING]: {
            index,
          },
        };
      }
      if (g.receivingStats.length) {
        availableStats[DataType.RECEIVING] = true;
        newActiveGames[g.weekIndex] = {
          ...newActiveGames[g.weekIndex],
          [DataType.RECEIVING]: {
            index,
          },
        };
      }
    });

    const content: any = {};

    Object.keys(availableStats).forEach((value, index) => {
      if ((availableStats as any)[value] === true) {
        result.push({
          id: value,
          active: index === 0,
          name: value.toUpperCase(),
        });
        content[value] = (
          <DetermineTable
            activeDataType={value as DataType}
            gameLog={gameLog}
            activeGames={newActiveGames}
          />
        );
      }
    });

    if (result.length) {
      result[0].active = true;
    }

    return {
      categories: result,
      content,
    };
  }, [gameLog]);

  if (!data.categories.length) {
    return (
      <BaseCard header={`${2022 + gameLog[0].seasonIndex} Games`}>
        <span className="pb-5">No Game Data</span>
      </BaseCard>
    );
  }

  return (
    <TabCard
      baseCardProps={{
        header: `${2022 + gameLog[0].seasonIndex} Games`
      }}
      categories={data.categories}
      content={data.content}
    />
  );
};

export default GameLogComponent;
