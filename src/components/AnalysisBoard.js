import { useSelector } from "react-redux"

export const AnalysisBoard = () => {
  const analysis = useSelector(state => state.game.analysis);
  
  return (
    <ul className='analysis-container'>
      <li className='lines'><span className='caps' style={analysis[0]?.cp/100 > 0 ? {background: 'white', color: 'black'} :{background: 'black'}}>{analysis[0] && analysis[0].cp/100}</span><span className='analysis-moves'>{analysis[0] && analysis[0].moves}</span></li> 
      <li className='lines'><span className='caps' style={analysis[0]?.cp/100 > 0 ? {background: 'white', color: 'black'} :{background: 'black'}}>{analysis[1] && analysis[1].cp/100}</span><span className='analysis-moves'>{analysis[1] && analysis[1].moves}</span></li>  
      <li className='lines'><span className='caps' style={analysis[0]?.cp/100 > 0 ? {background: 'white', color: 'black'} :{background: 'black'}}>{analysis[2] && analysis[2].cp/100}</span><span className='analysis-moves'>{analysis[2] && analysis[2].moves}</span></li>   
  </ul>
  )
  
}