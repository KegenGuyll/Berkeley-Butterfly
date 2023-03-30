import createUrl from "@/utils/createUrl";
import { API_ENDPOINT } from "../..";
import { IGetTeamScheduleQuery, IGetTeamScheduleResponse } from "@/models/team";

const getTeamSchedule = async (
  leagueId: number,
  teamId: number,
  query?: IGetTeamScheduleQuery
): Promise<IGetTeamScheduleResponse> => {
  const url = `${API_ENDPOINT}/team/schedule/${leagueId}/${teamId}`;

  const res = await fetch(createUrl(url, query));
  const result = await res.json();

  return result;
};

export default getTeamSchedule;
