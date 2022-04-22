import { useSelector } from "react-redux"

export const AnalysisBoard = () => {
  const analysis = useSelector(state => state.game.analysis);
  
  return (
    <ul className='analysis-container'>
      <li className='lines'><span className='caps' style={ analysis[0]?.cp / 100 > 0 ? { background: 'white', color: 'black' } : analysis[0]?.cp / 100 === 0 ? {background: 'rgb(65,64,64)', color: 'white'} : { background: 'black' }}>
        {analysis !== '...'
          ? typeof analysis[0]?.cp !== 'undefined' ? analysis[0].cp/ 100 : 'M' + analysis[0]?.mate
          : ''
        }
      </span><span className='analysis-moves'>{analysis[0] && analysis[0].moves}</span></li> 
      <li className='lines'><span className='caps' style={ analysis[1]?.cp / 100 > 0 ? { background: 'white', color: 'black' } : analysis[1]?.cp / 100 === 0 ? {background: 'rgb(65,64,64)', color: 'white'} : { background: 'black' }}>
        {analysis !== '...'
          ? typeof analysis[1]?.cp !== 'undefined' ? analysis[1].cp/ 100 : 'M' + analysis[1]?.mate
          : ''
        }
      </span><span className='analysis-moves'>{analysis[1] && analysis[1].moves}</span></li>  
      <li className='lines'><span className='caps' style={ analysis[2]?.cp / 100 > 0 ? { background: 'white', color: 'black' } : analysis[2]?.cp / 100 === 0 ? {background: 'rgb(65,64,64)', color: 'white'} : { background: 'black' }}>
        {analysis !== '...'
          ? typeof analysis[2]?.cp !== 'undefined' ? analysis[2].cp/ 100 : 'M' + analysis[2]?.mate
          : ''
        }
      </span><span className='analysis-moves'>{analysis[2] && analysis[2].moves}</span></li>   
  </ul>
  )
  
}