import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { IGetPlayerQuery, IPlayerResponse } from "@/models/players";

const getPlayer = async (
  leagueId: number,
  rosterId: number,
  query?: IGetPlayerQuery
): Promise<IPlayerResponse> => {
  const url = `${API_ENDPOINT}/player/${leagueId}/${rosterId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getPlayer;
