import { useCallback } from "react";
import getTeamRoster from "@/endpoints/team/players/getTeamRoster";
import { setPlayers } from "@/redux/slices/activeLeague";
import { useAppDispatch, useAppSelector } from "./redux";

const usePlayers = () => {
  const dispatch = useAppDispatch();
  const { players, leagueId } = useAppSelector((state) => state.activeLeague);

  const findPlayerByTeam = useCallback(
    (teamId: number) => {
      if (!leagueId) return [];

      const result = Object.values(players).filter((p) => p.teamId === teamId);

      if (!result.length) {
        getTeamRoster(leagueId, teamId).then((response) => {
          if (response.success) {
            dispatch(setPlayers(response.body));
          }
        });

        return [];
      }

      return result;
    },
    [players, leagueId],
  );

  return {
    findPlayerByTeam,
  };
};

export default usePlayers;
