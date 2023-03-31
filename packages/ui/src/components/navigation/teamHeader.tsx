import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import TeamImage from "../common/image/teamImage";
import { Team } from "@/models/team";
import getTeam from "@/endpoints/team/getTeam";
import getStandings from "@/endpoints/standings/getStandings";
import { Standings } from "@/models/standings";
import Button from "../common/button";

const TeamHeader = () => {
  const [team, setTeam] = useState<Team>();
  const [teamStats, setTeamStats] = useState<Standings>();
  const router = useRouter();
  const { teamId, seasonIndex } = router.query;

  const baseUrl = useCallback(() => {
    if (!team) return `/team/-/${teamId}/${seasonIndex}`;

    return `/team/${team.displayName}/${teamId}/${seasonIndex}`;
  }, [team, teamId, seasonIndex]);

  const fetchTeam = useCallback(async () => {
    const leagueId = localStorage.getItem("leagueId");

    if (leagueId && typeof teamId === "string") {
      const data = await getTeam(leagueId, teamId);
      const teamStatsReq = await getStandings(leagueId, teamId, {
        seasonIndex: Number(seasonIndex),
      });

      if (data.success && teamStatsReq.success) {
        setTeam(data.body);
        setTeamStats(teamStatsReq.body[0]);
      }
    }
  }, [router.query]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  if (!team || !teamStats) return null;

  return (
    <div className="bg-white shadow px-6 flex flex-col justify-between w-full m-auto divide-y sticky top-0 z-50">
      <div className="flex items-center">
        <div className="h-20 w-20 relative mr-2">
          <TeamImage teamLogoId={team.logoId as any} />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl space-x-2">
            <span className="font-light">{team.cityName}</span>
            <span>{team.displayName}</span>
          </span>
          <div className="flex items-center space-x-2">
            <Button className="w-max" variant="chip">
              Follow
            </Button>
            <span>
              <span>{teamStats.totalWins}</span>
              <span>-</span>
              <span>{teamStats.totalLosses}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="py-3">
        <ul className="flex space-x-3">
          <li>
            <Link href={baseUrl()}>Home</Link>
          </li>
          <li
            className={clsx(
              router.pathname.includes("stats") && "border-b-2 border-slate-500"
            )}
          >
            <Link href={`${baseUrl()}/stats`}>Stats</Link>
          </li>
          <li>
            <Link href={`${baseUrl()}/roster`}>Roster</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamHeader;
