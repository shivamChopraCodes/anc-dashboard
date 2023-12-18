import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  fetchGamesAsync,
  getGamesData,
  getGamesStatus,
} from "../../store/games/slice"
import GamesAccordion from "./gamesAccordion"
import spinnerUrl from "../../assets/spinner.svg"
import Loading from "../../assets/loading"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const gamesStatus = useAppSelector(getGamesStatus)
  const gamesData = useAppSelector(getGamesData)

  useEffect(() => {
    dispatch(fetchGamesAsync())
  }, [])

  if (gamesStatus === "loading")
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  else if (gamesStatus === "failed") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Unable to fetch data.
      </div>
    )
  }

  return (
    <div className="w-full mx-auto py-8 max-w-3xl flex flex-col gap-y-8 justify-center items-center">
      {Object.entries(gamesData).map(([gameName, teamData]) => (
        <GamesAccordion
          gameName={gameName}
          teamData={teamData}
          key={gameName}
        />
      ))}
    </div>
  )
}

export default Dashboard
