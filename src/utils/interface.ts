export interface Player {
  name: string
  age: number | undefined
}

export interface Team {
  team_name: string
  players: Player[]
}

export interface GameData {
  game: string
  teams: Team[]
}
