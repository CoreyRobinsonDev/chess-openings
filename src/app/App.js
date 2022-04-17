import './App.css';
import { Board } from '../components/Board';
import { MoveBoard } from '../components/MoveBoard';
import { AnalysisBoard } from '../components/AnalysisBoard';

const App = () => (
  <main>
    <article className='gamespace'>
      <Board />
      <MoveBoard />
      <AnalysisBoard/>
    </article>
    
  </main>
)

export default App;
