import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "../..";
import { IGetTeamRosterResponse } from "@/models/team";

const getTeamRoster = async (
  leagueId: number,
  teamId: number
): Promise<IGetTeamRosterResponse> => {
  const url = `${API_ENDPOINT}/team/roster/${leagueId}/${teamId}/`;

  const res = await fetch(createUrl(url), { next: { revalidate: 60 } });
  const result = await res.json();

  return result;
};

export default getTeamRoster;
