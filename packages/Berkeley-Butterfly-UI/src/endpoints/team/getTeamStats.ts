import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { IGetTeamStatsResponse, IGetTeamStatsQuery } from "@/models/team";

const getTeamStats = async (
  leagueId: number | string,
  teamId: number | string,
  query: IGetTeamStatsQuery
): Promise<IGetTeamStatsResponse> => {
  const url = `${API_ENDPOINT}/stats/team/${leagueId}/${teamId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getTeamStats;
