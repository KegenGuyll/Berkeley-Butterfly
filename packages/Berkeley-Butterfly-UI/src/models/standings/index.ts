import { TeamStats } from "../stats";
import { Team } from "../team";

export type Standings = {
  _id: string;
  awayLosses: number;
  awayTies: number;
  awayWins: number;
  calendarYear: number;
  capAvailable: number;
  capRoom: number;
  capSpent: number;
  confLosses: number;
  confTies: number;
  confWins: number;
  conferenceId: number;
  conferenceName: string;
  defPassYds: number;
  defPassYdsRank: number;
  defRushYds: number;
  defRushYdsRank: number;
  defTotalYds: number;
  defTotalYdsRank: number;
  divLosses: number;
  divTies: number;
  divWins: number;
  divisionId: number;
  divisionName: string;
  homeLosses: number;
  homeTies: number;
  homeWins: number;
  netPts: number;
  offPassYds: number;
  offPassYdsRank: number;
  offRushYds: number;
  offRushYdsRank: number;
  offTotalYds: number;
  offTotalYdsRank: number;
  playoffStatus: number;
  prevRank: number;
  ptsAgainst: number;
  ptsAgainstRank: number;
  ptsFor: number;
  ptsForRank: number;
  rank: number;
  seasonIndex: number;
  seed: number;
  stageIndex: number;
  stats: TeamStats[];
  tODiff: number;
  team?: Team;
  teamId: number;
  teamName: string;
  teamOvr: number;
  totalLosses: number;
  totalTies: number;
  totalWins: number;
  weekIndex: number;
  winLossStreak: number;
  winPct: number;
};

export interface RankedStandings {
  _id: string;
  defPassYdsRank: number;
  defRushYdsRank: number;
  defTotalYdsRank: number;
  losses: number;
  offPassYdsRank: number;
  offRushYdsRank: number;
  offTotalYdsRank: number;
  prevRank: number;
  ptsAgainstRank: number;
  rank: number;
  seed: number;
  tODiff: number;
  team?: Team;
  teamId: number;
  teamOvr: number;
  week: number;
  winPct: number;
  wins: number;
}

export interface IRankedStandingsResponse {
  body: RankedStandings[];
  success: boolean;
}

export interface IStandingsResponse {
  body: Standings[];
  success: boolean;
}

export interface IGetStandingsQuery {
  include_stats?: boolean;
  include_team?: boolean;
  seasonIndex: number | string;
}

export type RankedSorting =
  | "defTotalYdsRank.asc"
  | "defTotalYdsRank.desc"
  | "offTotalYdsRank.asc"
  | "offTotalYdsRank.desc"
  | "defPassYdsRank.asc"
  | "defPassYdsRank.desc"
  | "defRushYdsRank.asc"
  | "defRushYdsRank.desc"
  | "offPassYdsRank.asc"
  | "offPassYdsRank.desc"
  | "offRushYdsRank.asc"
  | "offRushYdsRank.desc"
  | "prevRank.asc"
  | "prevRank.desc"
  | "ptsAgainstRank.asc"
  | "ptsAgainstRank.desc"
  | "seed.asc"
  | "seed.desc"
  | "tODiff.asc"
  | "tODiff.desc"
  | "teamOvr.asc"
  | "teamOvr.desc"
  | "winPct.asc"
  | "winPct.desc"
  | "rank.asc"
  | "rank.desc"
  | "totalLosses.asc"
  | "totalLosses.desc"
  | "totalWins.asc"
  | "totalWins.desc";

export interface IGetRankedStandingsQuery {
  include_team?: boolean;
  sort_by?: RankedSorting;
}
