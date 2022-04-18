import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Board } from '../components/Board';
import { MoveBoard } from '../components/MoveBoard';
import { WinrateBar } from '../components/WinrateBar';
import { setAnalysis } from '../features/gameSlice';

const App = () => {
  const dispatch = useDispatch()
  const openingData = useSelector(state => state.game.opening)
  useEffect(() => {
    dispatch(setAnalysis())
  }, [dispatch])
  return (
    <main>
      <section className='gamespace'>
        <Board />
        <MoveBoard />
      </section>
      <article className='game-info'>
        {
        openingData
          ? <WinrateBar white={openingData.white} black={openingData.black} draws={openingData.draws} />
          : ''
        }
      </article>
      
    </main>
)
}

export default App;
