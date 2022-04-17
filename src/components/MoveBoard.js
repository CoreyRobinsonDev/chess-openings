import { useSelector } from "react-redux"

export const MoveBoard = () => {
  const whiteMoves = useSelector(state => state.game.whiteMoves)
  const blackMoves = useSelector(state => state.game.blackMoves)

  
  return (
    <div className='move-board'>
      <h2>___________</h2>
      <ul className='moves'>
        <li className='white-moves'>{whiteMoves}</li>
        <li className='black-moves'>{blackMoves}</li>
      </ul>
    </div>
  )
}