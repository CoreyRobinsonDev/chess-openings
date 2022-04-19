import { useSelector } from "react-redux"

export const TopGames = ({gamesNum}) => {
  const topGames = useSelector(state => state.game.opening.topGames)
  const uci = topGames ? topGames[gamesNum].uci : ''
  const winner = topGames ? topGames[gamesNum].winner : ''
  const whiteName = topGames ? topGames[gamesNum].white.name : ''
  const blackName = topGames ? topGames[gamesNum].black.name : ''
  const whiteRating = topGames ? topGames[gamesNum].white.rating : ''
  const blackRating = topGames ? topGames[gamesNum].black.rating : ''
  const date = topGames ? topGames[gamesNum].month : ''
  let resultsMessage = ''
  let result = ''

  if (winner === 'white') {
    resultsMessage = `From this position ${whiteName} went on to win after the move ${uci}.`
    result = '1-0'
  } else if (winner === 'black') {
    resultsMessage = `From this position ${blackName} went on to win after the move ${uci}.`
    result = '0-1'
  } else {
    resultsMessage = `This position was drawn after the move ${uci}.`
    result = '1⁄2-1⁄2'
  }
  if (topGames) return typeof topGames[gamesNum] !== 'undefined'
    ? <div className='top-game'>
      
      <p className='game-results'>{resultsMessage}</p>
      <div className='top-game-info'>
        <span className='top-game-name-rating'><span className='white-name'>{whiteName}</span><span className='white-rating'> {whiteRating}</span></span>
        <span>vs.</span>
        <span className='top-game-name-rating'><span className='black-name'>{blackName}</span><span className='black-rating'> {blackRating}</span></span>
        <span className='top-game-winner-year'>{result} | {date}</span>
      </div>
    </div>
    : ''
}