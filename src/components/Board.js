import { Square } from "./Square"
import { createBoard } from "../utility/createBoard"

export const Board = () => {
  let squares = createBoard()
    
  return (
    <div className='board'>
      {
        squares.map((squareData, key) => {
          return (
            <li className='square-li' key={'square_' + key}><Square squareData={squareData} /></li>
          )
        })
      }
    </div>
  )
}