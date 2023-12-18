import { useEffect, useState } from "react"
import { Player } from "../../utils/interface"

interface Props {
  details?: Player
  index?: number
  onSubmit: (player: Player, index?: number) => void
}

const PlayerDetails = ({ details, index, onSubmit }: Props) => {
  const [player, setPlayer] = useState<Player>({
    age: details?.age,
    name: details?.name || "",
  })

  useEffect(() => {
    details && setPlayer({ ...details })
  }, [details])

  const handleChange = (key: string, value: string | number) => {
    setPlayer((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="w-full flex justify-between">
      <input
        type="text"
        value={player.name}
        onChange={(e) => handleChange("name", e.target.value)}
        className="w-5/12 peer h-8 rounded bg-gray-200 px-2 focus:bg-gray-100 focus:outline-none"
      />
      <input
        type="text"
        value={player.age || ""}
        onChange={(e) =>
          handleChange("age", +e.target.value.replace(/\D/g, ""))
        }
        className="w-3/12 peer h-8 rounded bg-gray-200 px-2 focus:bg-gray-100 focus:outline-none"
      />
      <button
        className="w-3/12 h-8 peer-focus:bg-purple-600 hover:bg-purple-600 bg-purple-400 rounded text-white font-medium"
        onClick={() => {
          if (!player.age || !player.name) return
          onSubmit(player, index)
          !details &&
            setPlayer({
              age: undefined,
              name: "",
            })
        }}
      >
        {details ? "Save" : "Add"}
      </button>
    </div>
  )
}

export default PlayerDetails
