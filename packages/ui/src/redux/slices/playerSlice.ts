/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player } from "@/models/players";
import { RankedPlayerStats } from "@/models/stats";

interface IPlayerState {
  player: Player | null;
  rankedSeasonStats: RankedPlayerStats | null;
}

const initialState: IPlayerState = {
  player: null,
  rankedSeasonStats: null,
};

export const playerSlice = createSlice({
  name: "playerSlice",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player | null>) => {
      state.player = action.payload;
    },
    setRankedSeasonStats: (state, action: PayloadAction<RankedPlayerStats>) => {
      state.rankedSeasonStats = action.payload;
    },
  },
});

export const { setPlayer, setRankedSeasonStats } = playerSlice.actions;

export default playerSlice.reducer;
