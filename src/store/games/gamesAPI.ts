import { GameData, Player } from "../../utils/interface"

export const fetchGames = async (): Promise<{
  [key: string]: {
    [key: string]: Player[]
  }
}> => {
  const response = await fetch(
    "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e",
    {
      method: "GET",
    },
  )
  const data: GameData[] = await response.json()
  const storeData = data.reduce(
    (result, currGame) => ({
      ...result,
      [currGame.game]: {
        ...currGame.teams.reduce(
          (result, currTeam) => ({
            ...result,
            [currTeam.team_name]: currTeam.players,
          }),
          {},
        ),
      },
    }),
    {},
  )
  return storeData
}
