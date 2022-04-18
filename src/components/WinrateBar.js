
export const WinrateBar = ({ white, black, draws }) => {
  const whitePercent = (white / (white + black + draws) * 100)
  const drawsPercent = (draws / (white + black + draws) * 100)
  const blackPercent = (black / (white + black + draws) * 100)

  return white === 0 && black === 0 && draws === 0
    ? <span className='winrate-bar-err'>There are no recorded master games in this position.</span>
    : <div className='winrate-container' style={{gridTemplate: `1fr/${whitePercent}% ${drawsPercent}% ${blackPercent}%`}}>
    <span className='white' >{whitePercent.toString().slice(0,4)+'%'}</span>
    <span className='draws' >{drawsPercent.toString().slice(0,4)+'%'}</span>
    <span className='black' >{blackPercent.toString().slice(0,4)+'%'}</span>
  </div>
}