import { useAppDispatch } from "../../app/hooks"
import { addTeamPlayer, editTeamPlayer } from "../../store/games/slice"
import { Player } from "../../utils/interface"
import PlayerDetails from "./playerDetails"

interface Props {
  gameName: string
  teamData: {
    [key: string]: Player[]
  }
}

const GamesAccordion = ({ gameName, teamData }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className="w-full flex flex-col text-left rounded-md overflow-clip border-gray-200 border">
      <h2 className="w-full text-left p-4 bg-gray-200 text-gray-800 text-base font-bold capitalize">
        {gameName}
      </h2>
      {Object.entries(teamData).map(([teamName, players]) => (
        <div key={teamName} className="w-full flex flex-col p-4">
          <h3 className="w-full text-gray-800 text-base font-medium capitalize">
            {teamName} ({players.length})
          </h3>
          <div className="w-full flex flex-col p-2 gap-y-2">
            <PlayerDetails
              onSubmit={(player) =>
                dispatch(
                  addTeamPlayer({
                    ...player,
                    game: gameName,
                    team_name: teamName,
                  }),
                )
              }
            />
            {players.map((player: Player, index: number) => (
              <PlayerDetails
                key={JSON.stringify(player)}
                details={player}
                index={index}
                onSubmit={(player, index) =>
                  dispatch(
                    editTeamPlayer({
                      ...player,
                      game: gameName,
                      team_name: teamName,
                      teamIndex: index,
                    }),
                  )
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GamesAccordion
