import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "..";
import { ITeamsResponse } from "@/models/team";

const getTeams = async (leagueId: number | string): Promise<ITeamsResponse> => {
  const url = `${API_ENDPOINT}/team/${leagueId}`;

  const res = await fetch(createUrl(url));
  const result = await res.json();

  return result;
};

export default getTeams;
