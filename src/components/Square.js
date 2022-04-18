import { useSelector, useDispatch } from 'react-redux'
import { movePiece, selectPiece, setAnalysis, getOpening} from "../features/gameSlice"
import { pieceData } from '../utility/Chess'

//squareData contains both its position (ex: a1) and the piece within
export const Square = ({ squareData }) => {
  const dispatch = useDispatch()
  const position = useSelector(state => state.game.board)
  
  const squareSelect = () => {
    dispatch(movePiece(squareData))
    dispatch(selectPiece(squareData))
    dispatch(setAnalysis())
    dispatch(getOpening())
  }
  //grabs the unicode of the piece on that given square and displays and image in its place
  const generatePiece = () => {
    if (position[squareData[1] - 1]) {
      const piece = pieceData(position[squareData[1] - 1])
      switch (piece.name) {
        case 'pawn':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name} src='pieces/whpawn.png' alt=''></img>
          }
          return <img className={piece.color + piece.name}src='pieces/blpawn.png' alt=''></img>
        case 'knight':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name}src='pieces/whknight.png' alt=''></img>
          }
          return <img className={piece.color + piece.name}src='pieces/blknight.png' alt=''></img>
        case 'rook':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name}src='pieces/whrook.png' alt=''></img>
          }
          return <img className={piece.color + piece.name}src='pieces/blrook.png' alt=''></img>
        case 'bishop':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name}src='pieces/whbishop.png' alt=''></img>
          }
          return <img className={piece.color + piece.name}src='pieces/blbishop.png' alt=''></img>
        case 'king':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name}src='pieces/whking.png' alt=''></img>
          }
          return <img className={piece.color + piece.name}src='pieces/blking.png' alt=''></img>
        case 'queen':
          if (piece.color === 'white') {
            return <img className={piece.color + piece.name}src='pieces/whqueen.png' alt=''></img>
          }
            return <img className={piece.color + piece.name}src='pieces/blqueen.png' alt=''></img>
        default: 
          break
      }
    } else {
      return '' 
    }
  }
  
  return (
    <div onClick={squareSelect} className={`square ${squareData[0]}`} id={squareData[0]}>
      <p className='piece'>{generatePiece()}</p>
      <p className='files' id={`label${squareData[0]}`}>
        {squareData[0] === 'a1' ? 'a' : ''}
        {squareData[0] === 'b1' ? 'b' : ''}
        {squareData[0] === 'c1' ? 'c' : ''}
        {squareData[0] === 'd1' ? 'd' : ''}
        {squareData[0] === 'e1' ? 'e' : ''}
        {squareData[0] === 'f1' ? 'f' : ''}
        {squareData[0] === 'g1' ? 'g' : ''}
        {squareData[0] === 'h1' ? 'h' : ''}
      </p>
      <p className='ranks' id={`label${squareData[0]}`}>
        {squareData[0] === 'a1' ? '1' : ''}
        {squareData[0] === 'a2' ? '2' : ''}
        {squareData[0] === 'a3' ? '3' : ''}
        {squareData[0] === 'a4' ? '4' : ''}
        {squareData[0] === 'a5' ? '5' : ''}
        {squareData[0] === 'a6' ? '6' : ''}
        {squareData[0] === 'a7' ? '7' : ''}
        {squareData[0] === 'a8' ? '8' : ''}
      </p>
    </div>
  )
}