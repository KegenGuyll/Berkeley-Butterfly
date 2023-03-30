import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { IGetStandingsQuery, IStandingsResponse } from "@/models/standings";

const getStandings = async (
  leagueId: number | string,
  teamId: number | string,
  query?: IGetStandingsQuery
): Promise<IStandingsResponse> => {
  const url = `${API_ENDPOINT}/standings/${leagueId}/${teamId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getStandings;
