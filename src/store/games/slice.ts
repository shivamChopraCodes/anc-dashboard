import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../index"
import { GameData, Player } from "../../utils/interface"
import { fetchGames } from "./gamesAPI"

interface GameSlice {
  data: {
    [key: string]: {
      [key: string]: Player[]
    }
  }
  status: "idle" | "loading" | "failed"
}

interface PlayerData extends Player {
  team_name: string
  game: string
  teamIndex?: number
}

const initialState: GameSlice = {
  data: {},
  status: "idle",
}

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async () => {
    const response = await fetchGames()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const teamSlice = createSlice({
  name: "team",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTeamPlayer: (state, action: PayloadAction<PlayerData>) => {
      const { game, team_name, ...rest } = action.payload
      state.data[game][team_name] = [rest, ...state.data[game][team_name]]
    },
    editTeamPlayer: (state, action: PayloadAction<PlayerData>) => {
      const { game, team_name, teamIndex, ...rest } = action.payload
      state.data[game][team_name][teamIndex!] = { ...rest }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload
      })
      .addCase(fetchGamesAsync.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { addTeamPlayer, editTeamPlayer } = teamSlice.actions
export const getGamesData = (state: RootState) => state.games.data
export const getGamesStatus = (state: RootState) => state.games.status

export default teamSlice.reducer
