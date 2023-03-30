import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "../..";
import { IGetTeamLeadersQuery, IGetTeamLeadersResponse } from "@/models/team";
import { DataType } from "@/models/stats";

const getTeamPerGameStats = async (
  leagueId: number,
  teamId: number,
  dataType: DataType,
  query?: IGetTeamLeadersQuery
): Promise<IGetTeamLeadersResponse> => {
  const url = `${API_ENDPOINT}/team/per-game-stats/${leagueId}/${teamId}/${dataType}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getTeamPerGameStats;
