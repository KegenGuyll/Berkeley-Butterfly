import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import {
  IGetRankedStandingsQuery,
  IRankedStandingsResponse,
} from "@/models/standings";

const getRankedStandings = async (
  leagueId: number,
  query?: IGetRankedStandingsQuery
): Promise<IRankedStandingsResponse> => {
  const url = `${API_ENDPOINT}/standings/ranked/${leagueId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getRankedStandings;
