/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import { Schedule } from "../schedule";
import { Team } from "../team";

export type TeamStats = {
  _id: string;
  defForcedFum: number;
  defFumRec: number;
  defIntsRec: number;
  defPassYds: number;
  defPtsPerGame: number;
  defRedZoneFGs: number;
  defRedZonePct: number;
  defRedZoneTDs: number;
  defRedZones: number;
  defRushYds: number;
  defSacks: number;
  defTotalYds: number;
  off1stDowns: number;
  off2PtAtt: number;
  off2PtConv: number;
  off2PtConvPct: number;
  off3rdDownAtt: number;
  off3rdDownConv: number;
  off3rdDownConvPct: number;
  off4thDownAtt: number;
  off4thDownConv: number;
  off4thDownConvPct: number;
  offFumLost: number;
  offIntsLost: number;
  offPassTDs: number;
  offPassYds: number;
  offPtsPerGame: number;
  offRedZoneFGs: number;
  offRedZonePct: number;
  offRedZoneTDs: number;
  offRedZones: number;
  offRushTDs: number;
  offRushYds: number;
  offSacks: number;
  offTotalYds: number;
  offTotalYdsGained: number;
  penalties: number;
  penaltyYds: number;
  scheduleId: number;
  seasonIndex: number;
  seed: number;
  stageIndex: number;
  statId: number;
  tODiff: number;
  tOGiveaways: number;
  tOTakeaways: number;
  teamId: number;
  totalLosses: number;
  totalTies: number;
  totalWins: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export enum DataType {
  DEFENSE = "defense",
  KICKING = "kicking",
  NONE = "none",
  PASSING = "passing",
  PUNTING = "punting",
  RECEIVING = "receiving",
  RUSHING = "rushing",
}

export type PassingStats = {
  dataType: DataType.PASSING;
  fullName: string;
  passAtt: number;
  passComp: number;
  passCompPct: number;
  passInts: number;
  passLongest: number;
  passPts: number;
  passSacks: number;
  passTDs: number;
  passYds: number;
  passYdsPerAtt: number;
  passYdsPerGame: number;
  passerRating: number;
  playerInfo: PlayerStats;
  rosterId: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export type RushingStats = {
  dataType: DataType.RUSHING;
  fullName: string;
  playerInfo: PlayerStats;
  rosterId: number;
  rush20PlusYds: number;
  rushAtt: number;
  rushBrokenTackles: number;
  rushFum: number;
  rushLongest: number;
  rushPts: number;
  rushTDs: number;
  rushToPct: number;
  rushYds: number;
  rushYdsAfterContact: number;
  rushYdsPerAtt: number;
  rushYdsPerGame: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export type DefenseStats = {
  dataType: DataType.DEFENSE;
  defCatchAllowed: number;
  defDeflections: number;
  defForcedFum: number;
  defFumRec: number;
  defIntReturnYds: number;
  defInts: number;
  defPts: number;
  defSacks: number;
  defSafeties: number;
  defTDs: number;
  defTotalTackles: number;
  fullName: string;
  playerInfo: PlayerStats;
  rosterId: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export type KickingStats = {
  dataType: DataType.KICKING;
  fG50PlusAtt: number;
  fG50PlusMade: number;
  fGAtt: number;
  fGCompPct: number;
  fGLongest: number;
  fGMade: number;
  fullName: string;
  kickPts: number;
  kickoffAtt: number;
  kickoffTBs: number;
  playerInfo: PlayerStats;
  rosterId: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
  xPAtt: number;
  xPCompPct: number;
  xPMade: number;
};

export type PuntingStats = {
  dataType: DataType.PUNTING;
  fullName: string;
  playerInfo: PlayerStats;
  puntAtt: number;
  puntLongest: number;
  puntNetYds: number;
  puntNetYdsPerAtt: number;
  puntTBs: number;
  puntYds: number;
  puntYdsPerAtt: number;
  puntsBlocked: number;
  puntsIn20: number;
  rosterId: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export type ReceivingStats = {
  dataType: DataType.RECEIVING;
  fullName: string;
  playerInfo: PlayerStats;
  recCatchPct: number;
  recCatches: number;
  recDrops: number;
  recLongest: number;
  recPts: number;
  recTDs: number;
  recToPct: number;
  recYacPerCatch: number;
  recYds: number;
  recYdsAfterCatch: number;
  recYdsPerCatch: number;
  recYdsPerGame: number;
  rosterId: number;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  statId: number;
  teamId: number;
  weekIndex: number;
  weekNumber: string;
  weekType: string;
};

export type PlayerStats =
  | PassingStats
  | RushingStats
  | DefenseStats
  | KickingStats
  | PuntingStats
  | ReceivingStats;

export type preGameStats = PlayerStats & {
  _id: {
    dataType: DataType;
    seasonIndex: number;
    teamId: number;
    weekIndex: number;
  };
  didHomeWin: boolean;
  game: Schedule;
  isHomTeam: boolean;
};

export interface preGameStatsResponse {
  body: preGameStats;
  success: boolean;
}

type RankedPassing = {
  passAttPos: number;
  passCompPos: number;
  passIntsPos: number;
  passLongestPos: number;
  passSacksPos: number;
  passTDsPos: number;
  passYdsPerAttPos: number;
  passYdsPerGamePos: number;
  passYdsPos: number;
  passerRatingPos: number;
};
type RankedRushing = {
  rush20PlusYdsPos: number;
  rushAttPos: number;
  rushBrokenTacklesPos: number;
  rushFumPos: number;
  rushLongestPos: number;
  rushTDsPos: number;
  rushYdsAfterContactPos: number;
  rushYdsPerAttPos: number;
  rushYdsPerGamePos: number;
  rushYdsPos: number;
};
type RankedReceiving = {
  recCatchPctPos: number;
  recCatchesPos: number;
  recDropsPos: number;
  recLongestPos: number;
  recTDsPos: number;
  recYacPerCatchPos: number;
  recYdsAfterCatchPos: number;
  recYdsPerCatchPos: number;
  recYdsPerGamePos: number;
  recYdsPos: number;
};
type RankedDefense = {
  defCatchAllowedPos: number;
  defDeflectionsPos: number;
  defForcedFumPos: number;
  defFumRecPos: number;
  defIntReturnYdsPos: number;
  defIntsPos: number;
  defSacksPos: number;
  defSafetiesPos: number;
  defTDsPos: number;
  defTotalTacklesPos: number;
};
type RankedKicking = {
  fG50PlusAttPos: number;
  fG50PlusMadePos: number;
  fGLongestPos: number;
  fGMadePos: number;
  kickPtsPos: number;
};
type RankedPunting = {
  puntAttPos: number;
  puntLongestPos: number;
  puntNetYdsPerAttPos: number;
  puntNetYdsPos: number;
  puntTBsPos: number;
  puntYdsPerAttPos: number;
  puntYdsPos: number;
  puntsBlockedPos: number;
  puntsIn20Pos: number;
};

export interface RankedPassingStats extends PassingStats {
  ranking: RankedPassing;
}

export interface RankedRushingStats extends RushingStats {
  ranking: RankedRushing;
}

export interface RankedReceivingStats extends ReceivingStats {
  ranking: RankedReceiving;
}

export interface RankedDefenseStats extends DefenseStats {
  ranking: RankedDefense;
}

export interface RankedKickingStats extends KickingStats {
  ranking: RankedKicking;
}

export interface RankedPuntingStats extends PuntingStats {
  ranking: RankedPunting;
}

export type RankedPlayerStats =
  | RankedDefenseStats
  | RankedKickingStats
  | RankedPassingStats
  | RankedPuntingStats
  | RankedReceivingStats
  | RankedRushingStats;

export interface IRankedSeasonStatsResponse {
  body: RankedPlayerStats;
  success: boolean;
}

export interface IRankedSeasonStatsQuery {
  rosterId: number;
  seasonIndex: number;
}

export interface IGameLogQuery {
  rosterId: number;
  seasonIndex: number;
  teamId: number;
}

export interface IGameLog extends Schedule {
  awayTeam: Team;
  defenseStats: DefenseStats[];
  homeTeam: Team;
  kickingStats: KickingStats[];
  passingStats: PassingStats[];
  puntingStats: PuntingStats[];
  receivingStats: ReceivingStats[];
  rushingStats: RushingStats[];
}

export interface IGameLogResponse {
  body: IGameLog[];
  success: boolean;
}

export type PositionOffense =
  | "QB"
  | "RB"
  | "FB"
  | "WR"
  | "TE"
  | "LT"
  | "LG"
  | "C"
  | "RG"
  | "RT";
export type PositionDefense =
  | "LE"
  | "DT"
  | "RE"
  | "CB"
  | "ROLB"
  | "MLB"
  | "LOLB"
  | "SS"
  | "FS";
export type PositionSpecial = "K" | "P";

export type Position =
  | "QB"
  | "RB"
  | "HB"
  | "FB"
  | "WR"
  | "TE"
  | "LT"
  | "LG"
  | "C"
  | "RG"
  | "RT"
  | "LE"
  | "DT"
  | "RE"
  | "CB"
  | "ROLB"
  | "MLB"
  | "LOLB"
  | "SS"
  | "FS"
  | "K"
  | "P"
  | "OL"
  | "DL"
  | "DB"
  | "LB";
