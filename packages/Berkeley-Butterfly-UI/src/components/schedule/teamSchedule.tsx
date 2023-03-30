import React from "react";
import Link from "next/link";
import { IGetTeamSchedule } from "@/models/team";
import TeamImage from "../common/image/teamImage";

interface Props {
  schedule: IGetTeamSchedule[];
  teamId: number;
}

const TeamSchedule = ({ schedule, teamId }: Props) => {
  const isHome = (homeTeamId: number) => {
    if (homeTeamId === Number(teamId)) return true;

    return false;
  };

  const isWin = (data: IGetTeamSchedule) => {
    if (isHome(data.homeTeam!.teamId)) {
      if (data.homeScore > data.awayScore) {
        return true;
      }
    } else if (data.homeScore < data.awayScore) {
      return true;
    }

    return false;
  };

  const createTeamUrl = (data: IGetTeamSchedule) => {
    if (!isHome(data.homeTeam!.teamId)) {
      return `/team/${data.homeTeam!.displayName}/${data.homeTeam!.teamId}`;
    }

    return `/team/${data.awayTeam!.displayName}/${data.awayTeam!.teamId}`;
  };

  return (
    <div>
      <div className="text-xs p-2 bg-gray-100">
        <h2>Regular Season</h2>
      </div>
      {schedule.map((g) => (
        <Link
          href={createTeamUrl(g)}
          className="flex items-center text-xs p-2 bg-white hover:bg-gray-100"
        >
          <div className="flex items-center w-full">
            <div className="flex items-center flex-grow">
              <span className="text-xs mr-1 text-left text-gray-500">
                {isHome(g.homeTeam!.teamId) ? "VS" : "@"}
              </span>
              <div className="h-5 w-5 relative mr-1">
                <TeamImage
                  teamLogoId={
                    isHome(g.homeTeam!.teamId)
                      ? ((g.awayTeam?.logoId || 0) as any)
                      : ((g.homeTeam?.logoId || 0) as any)
                  }
                />
              </div>
              <span className="text-xs">
                {isHome(g.homeTeam!.teamId)
                  ? g.awayTeam?.displayName
                  : g.homeTeam?.displayName}
              </span>
            </div>
            {g.status !== 1 && (
              <div className="text-xs items-end">
                {isWin(g) ? (
                  <span className=" text-green-500 mr-1">W</span>
                ) : (
                  <span className="text-red-500 mr-1 ">L</span>
                )}

                {g.homeScore > g.awayScore ? (
                  <span>{`${g.homeScore}-${g.awayScore}`}</span>
                ) : (
                  <span>{`${g.awayScore}-${g.homeScore}`}</span>
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TeamSchedule;
