export interface Schedule {
  awayScore: number;
  awayTeamId: number;
  homeScore: number;
  homeTeamId: number;
  isGameOfTheWeek: boolean;
  scheduleId: number;
  seasonIndex: number;
  stageIndex: number;
  status: number;
  weekIndex: number;
}

export interface AvailableSeason {
  _id: {
    seasonIndex: number;
  };
  seasonIndex: number;
  year: number;
}

export interface IScheduleResponse {
  body: Schedule;
  success: boolean;
}

export interface IAvailableSeasonsResponse {
  body: AvailableSeason[];
  success: boolean;
}

export interface IAvailableSeasonsQuery {
  baseYear?: number;
}
