import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import {
  IAvailableSeasonsQuery,
  IAvailableSeasonsResponse,
} from "@/models/schedule";

const getAvailableSeasons = async (
  leagueId: number,
  query?: IAvailableSeasonsQuery
): Promise<IAvailableSeasonsResponse> => {
  const url = `${API_ENDPOINT}/schedule/availableSeasons/${leagueId}/`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getAvailableSeasons;
