/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { Team } from "@/models/team";
import { AvailableSeason, Schedule } from "@/models/schedule";
import { Player } from "@/models/players";
import {
  DefenseStats,
  KickingStats,
  PassingStats,
  PuntingStats,
  ReceivingStats,
  RushingStats,
} from "@/models/stats";

interface Stats {
  defense: Record<number, DefenseStats>;
  kicking: Record<number, KickingStats>;
  passing: Record<number, PassingStats>;
  punting: Record<number, PuntingStats>;
  receiving: Record<number, ReceivingStats>;
  rushing: Record<number, RushingStats>;
}

interface IActiveLeagueState {
  availableSeasons: AvailableSeason[];
  currentSeasonIndex: number;
  leagueId: number;
  players: Record<number, Player>;
  schedule: Record<number, Schedule>;
  stats: Stats;
  teams: Record<number, Team>;
}

const initialState: IActiveLeagueState = {
  currentSeasonIndex: 0,
  leagueId: 0,
  teams: {},
  players: {},
  stats: {
    passing: {},
    rushing: {},
    receiving: {},
    defense: {},
    kicking: {},
    punting: {},
  },
  schedule: {},
  availableSeasons: [],
};

export const activeLeagueSlice = createSlice({
  name: "activeLeague",
  initialState,
  reducers: {
    setLeagueId: (state, action: PayloadAction<number>) => {
      state.leagueId = action.payload;
    },
    setCurrentSeasonIndex: (state, action: PayloadAction<number>) => {
      state.currentSeasonIndex = action.payload;
    },
    setPlayers: (state, action: PayloadAction<Player[]>) => {
      const playerRecord: Record<number, Player> = { ...state.players };

      action.payload.forEach((player) => {
        playerRecord[player.rosterId] = { ...player };
      });

      state.players = playerRecord;
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      const teamRecord: Record<number, Team> = {};

      action.payload.forEach((team) => {
        teamRecord[team.teamId] = { ...team };
      });

      state.teams = teamRecord;
    },
    setAvailableSeasons: (state, action: PayloadAction<AvailableSeason[]>) => {
      state.availableSeasons = action.payload;
    },
  },
});

export const {
  setLeagueId,
  setTeams,
  setAvailableSeasons,
  setCurrentSeasonIndex,
  setPlayers,
} = activeLeagueSlice.actions;

export const leagueId = (state: RootState) => state.activeLeague.leagueId;

export default activeLeagueSlice.reducer;
