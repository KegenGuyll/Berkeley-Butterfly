import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import React from "react";
import getGameLog from "@/endpoints/stats/getGameLog";
import { IGameLog } from "@/models/stats";
import GameLogComponent from "@/components/players/gameLog";

interface Props {
  gameLog: IGameLog[];
}

const PlayerProfile: NextPage<Props> = ({ gameLog }: Props) => {
  return (
    <div className="w-full h-full grid grid-cols-6 gap-3">
      <div className=" bg-gray-500">
        <p>quick links</p>
      </div>
      <div className="col-span-6 lg:col-span-4">
        <GameLogComponent gameLog={gameLog} />
      </div>
      <div className="bg-gray-700">
        <p>random stuff</p>
      </div>
    </div>
  );
};

export default PlayerProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { leagueId } = nookies.get(context);
    const { rosterId, seasonIndex, teamId } = context.query;

    const numberLeagueId = Number(leagueId);
    const numberSeasonIndex = Number(seasonIndex);
    const numberRosterId = Number(rosterId);
    const numberTeamId = Number(teamId);

    const gameLogData = await getGameLog(numberLeagueId, {
      seasonIndex: numberSeasonIndex,
      rosterId: numberRosterId,
      teamId: numberTeamId,
    });

    return {
      props: {
        gameLog: gameLogData.body,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};
