import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "../..";
import {
  IGetPlayerByPositionQuery,
  IGetPlayerByPositionResponse,
} from "@/models/team";

const getPlayerByPosition = async (
  leagueId: number,
  teamId: number,
  position: string,
  query?: IGetPlayerByPositionQuery
): Promise<IGetPlayerByPositionResponse> => {
  const url = `${API_ENDPOINT}/team/players/${leagueId}/${teamId}/${position}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getPlayerByPosition;
