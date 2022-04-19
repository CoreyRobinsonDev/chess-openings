import { useSelector } from "react-redux"
import { TopGames } from "./TopGames"

export const TopGamesContainer = () => {
  const opening = useSelector(state => state.game.openingName)
  return <>
    <h3 className='opening'>{opening}</h3>
    <div className='top-games-container'>
      <TopGames gamesNum={0} />
      <TopGames gamesNum={1} />
      <TopGames gamesNum={2} />
      <TopGames gamesNum={3} />
      <TopGames gamesNum={4} />
      <TopGames gamesNum={5} />
      <TopGames gamesNum={6} />
      <TopGames gamesNum={7} />
    </div>
  </>
}