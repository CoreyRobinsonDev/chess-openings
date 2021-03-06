import { useSelector } from "react-redux"
import { AnalysisBoard } from '../components/AnalysisBoard';
// import moveListCreator from "../utility/moveListCreator";

export const MoveBoard = () => {
  // const moves = useSelector(state => state.game.fullMoveList);
  const openingName = useSelector(state => state.game.openingName)
  const moveString = useSelector(state => state.game.moveString)

  return (
    <div className='move-board'>
      <div className='opening-name-container'>
        <h2 className='opening-name' title={openingName}>{openingName}</h2>
      </div>
      <AnalysisBoard/>
      <div className='moves-container'>
        {moveString}
      </div>
    </div>
  )
}