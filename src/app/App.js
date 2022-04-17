import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Board } from '../components/Board';
import { MoveBoard } from '../components/MoveBoard';
import { setAnalysis } from '../features/gameSlice';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAnalysis())
  }, [])
  return (
  <main>
    <article className='gamespace'>
      <Board />
      <MoveBoard />
    </article>
  </main>
)
}

export default App;
