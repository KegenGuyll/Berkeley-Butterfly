/* eslint-disable no-use-before-define */
import { Schedule } from "../schedule";

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

export type DataType =
  | "rushing"
  | "passing"
  | "defense"
  | "kicking"
  | "punting"
  | "receiving";

export type PassingStats = {
  dataType: "passing";
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
  dataType: "rushing";
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
  dataType: "defense";
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
  dataType: "kicking";
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
  dataType: "punting";
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
  dataType: "receiving";
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
