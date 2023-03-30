import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import {
  DataType,
  IRankedSeasonStatsQuery,
  IRankedSeasonStatsResponse,
} from "@/models/stats";

const getRankedSeasonStats = async (
  leagueId: number | string,
  dataType: DataType,
  query?: IRankedSeasonStatsQuery
): Promise<IRankedSeasonStatsResponse> => {
  const url = `${API_ENDPOINT}/ranked-stats/${leagueId}/${dataType}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getRankedSeasonStats;
