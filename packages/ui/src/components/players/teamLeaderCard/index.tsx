import React from "react";
import Link from "next/link";
import { IGetTeamLeaders } from "@/models/team";
import PlayerPortrait from "@/components/common/image/playerPortrait";

type KeyStats = {
  key: string;
  title: string;
};

interface Props {
  highlightedStat: {
    title: string;
    value: number;
  };
  keyStats: KeyStats[];
  player: IGetTeamLeaders;
  seasonIndex: number;
}

const TeamLeaderCard = ({
  player,
  highlightedStat,
  keyStats,
  seasonIndex,
}: Props) => {
  return (
    <div className=" h-max p-4 rounded">
      <h2 className="text-sm pb-1 text-gray-500">{highlightedStat.title}</h2>
      <div className="flex items-end w-full">
        <div className="flex items-center space-x-2 flex-grow w-full">
          <div className="border rounded-full relative h-14 w-14">
            <PlayerPortrait
              playerName={player.fullName}
              portraitId={player.playerInfo.portraitId}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href={`/player/${player._id.rosterId}/${player._id.teamId}/${seasonIndex}`}
              className="flex items-center"
            >
              <p className="text-sm">{player.fullName}</p>
              <span className="ml-1 text-gray-500 text-sm">
                {player.playerInfo.position} #{player.playerInfo.jerseyNum}
              </span>
            </Link>
            <p className="text-2xl">
              {new Intl.NumberFormat("en-US").format(highlightedStat.value)}
            </p>
          </div>
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          {keyStats.map((stat) => (
            <span className="flex" key={stat.key}>
              {stat.title}{" "}
              <span className="text-black ml-1">
                {(player as any)[stat.key].toString().includes(".")
                  ? (Math.round((player as any)[stat.key] * 10) / 10).toFixed(1)
                  : (player as any)[stat.key]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderCard;
