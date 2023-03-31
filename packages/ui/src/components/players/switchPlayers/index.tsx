import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/router";
import Link from "next/link";
import BaseCard from "@/components/common/card/baseCard";
import { useAppSelector } from "@/hooks/redux";
import { IGetPlayerByPosition, Team } from "@/models/team";
import getTeams from "@/endpoints/team/getTeams";
import getPlayerByPosition from "@/endpoints/team/players/getPlayerByPosition";
import PlayerPortrait from "@/components/common/image/playerPortrait";

const allPositions = [
  {
    value: "QB",
    label: "Quarterback",
  },
  {
    value: "HB",
    label: "Running Back",
  },
  {
    value: "FB",
    label: "Full Back",
  },
  {
    value: "WR",
    label: "Wide Receiver",
  },
  {
    value: "TE",
    label: "Tight End",
  },
  {
    value: "OL",
    label: "Offensive Line",
  },
  {
    value: "DL",
    label: "Defensive Line",
  },
  {
    value: "LB",
    label: "Linebacker",
  },
  {
    value: "DB",
    label: "Defensive Back",
  },
];

interface TeamOption {
  label: string;
  value: number;
}

interface PosOption {
  label: string;
  value: string;
}

const SwitchPlayers = () => {
  const { player } = useAppSelector((state) => state.playerSlice);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<IGetPlayerByPosition[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(-1);

  const [selectedTeam, setSelectedTeam] = useState<SingleValue<TeamOption>>();
  const [selectedPos, setSelectedPos] = useState<SingleValue<PosOption>>();

  const router = useRouter();
  const { teamId, seasonIndex } = router.query;

  const fetchTeams = async () => {
    const code = localStorage.getItem("leagueId");
    const data = await getTeams(Number(code));
    if (data.success) {
      setTeams(data.body);
    }
  };

  const fetchPlayers = async () => {
    if (!player) return;
    const code = localStorage.getItem("leagueId");

    const data = await getPlayerByPosition(
      Number(code),
      selectedTeam?.value || player?.teamId,
      selectedPos?.value || player?.position
    );

    if (data.success) {
      const newArray = [...data.body];

      const findCurrPlayer = newArray.findIndex(
        (v) => v.rosterId === player.rosterId
      );

      newArray.splice(findCurrPlayer, 1);

      setPlayers(data.body);
    }
  };

  // find default team value
  useEffect(() => {
    if (!teamId || !teamId.length) return;

    const index = teams.findIndex((t) => t.teamId === Number(teamId));

    setCurrentTeamIndex(index);
  }, [teams]);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [selectedPos, selectedTeam]);

  return (
    <BaseCard header="Switch Player">
      <div className="my-3">
        <div className="space-y-3">
          <Select
            defaultValue={{
              value: teams[currentTeamIndex]?.teamId,
              label: teams[currentTeamIndex]?.displayName,
            }}
            options={teams.map((team) => ({
              value: team.teamId,
              label: team.displayName,
            }))}
            onChange={(value) => setSelectedTeam(value)}
          />
          <Select
            options={allPositions}
            onChange={(value) => setSelectedPos(value)}
          />
        </div>

        <div className="space-y-3  my-3">
          {players.map((p) => (
            <Link
              href={`/player/${p.rosterId}/${p.teamId}/${Number(seasonIndex)}`}
              className="flex items-center text-sm space-x-3"
            >
              <div className="h-12 w-12 relative">
                <PlayerPortrait
                  playerName={`${p.firstName} ${p.lastName}`}
                  portraitId={p.portraitId}
                />
              </div>
              <span className="flex flex-col">
                <div key={p._id}>{`${p.firstName} ${p.lastName}`}</div>
                <span className=" text-gray-400 text-xs">#{p.jerseyNum}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </BaseCard>
  );
};

export default SwitchPlayers;
