import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { IGameLogQuery, IGameLogResponse } from "@/models/stats";

const getGameLog = async (
  leagueId: number | string,
  query: IGameLogQuery
): Promise<IGameLogResponse> => {
  const url = `${API_ENDPOINT}/stats/game-log/${leagueId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getGameLog;
