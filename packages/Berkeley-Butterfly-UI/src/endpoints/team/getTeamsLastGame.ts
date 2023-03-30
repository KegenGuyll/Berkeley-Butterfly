import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { IGetLastGameQuery } from "@/models/team";
import { IScheduleResponse } from "@/models/schedule";

const getTeamsLastGame = async (
  leagueId: number,
  teamId: number,
  query?: IGetLastGameQuery
): Promise<IScheduleResponse> => {
  const url = `${API_ENDPOINT}/player/${leagueId}/${teamId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getTeamsLastGame;
