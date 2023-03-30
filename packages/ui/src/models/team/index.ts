import { LeadersSortList, Player } from "../players";
import { Schedule } from "../schedule";
import { Standings } from "../standings";
import { PlayerStats, TeamStats } from "../stats";

export interface Team {
  _id: string;
  abbrName: string;
  cityName: string;
  confStandings?: Standings[];
  defScheme: number;
  displayName: string;
  divName: string;
  injuryCount: number;
  logoId: number;
  nickName: string;
  offScheme: number;
  ovrRating: number;
  primaryColor: number;
  secondaryColor: number;
  teamId: number;
  userName: string;
}

export interface ITeamResponse {
  body: Team;
  success: boolean;
}

export interface ITeamsResponse {
  body: Team[];
  success: boolean;
}

export interface IGetTeamQuery {
  include_players?: boolean;
  include_standings?: boolean;
  include_stats?: boolean;
  seasonIndex: number;
}

export interface IGetLastGameQuery {
  include_player_stats?: boolean;
  include_teams?: boolean;
}

type SeasonType = "reg" | "pre";

export interface IGetTeamScheduleQuery {
  include_team_stats?: boolean;
  include_teams?: boolean;
  seasonIndex: number | string;
  season_type?: SeasonType;
}

export interface IGetTeamSchedule extends Schedule {
  awayTeam?: Team;
  homeTeam?: Team;
  teamstats?: TeamStats;
}

export interface IGetTeamScheduleResponse {
  body: IGetTeamSchedule[];
  success: boolean;
}

export type IGetTeamLeaders = PlayerStats & {
  _id: {
    rosterId: number;
    seasonIndex: number;
    teamId: number;
  };
  playerInfo: Player;
};

export interface IGetTeamLeadersResponse {
  body: IGetTeamLeaders[];
  success: boolean;
}

export interface IGetTeamRosterResponse {
  body: Player[];
  success: boolean;
}

export interface IGetTeamLeadersQuery {
  seasonIndex: number;
  sort_by?: LeadersSortList;
}

export interface IGetTeamStatsResponse {
  body: TeamStats[];
  success: boolean;
}

export interface IGetTeamStatsQuery {
  seasonIndex: number;
  season_type: "reg" | "pre";
}
