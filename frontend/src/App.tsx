import './App.css'
import { Routes, Route } from 'react-router-dom';
import GameView from './Components/MainGame'
import ChatDialog1 from './Components/Chat1'
import ChatDialog2 from './Components/Chat2'
import ChatDialog3 from './Components/Chat3';
import TreasureCodePage from './Components/TreasureCodePage';

function App() {
  return (
    
    <div>
      <h1>Game of Minds</h1>
      <Routes>
          <Route path="/" element={<GameView />} />
          <Route path="/cd0" element={<ChatDialog1 />} />
          <Route path="/cd1" element={<ChatDialog2 />} />
          <Route path="/cd2" element={<ChatDialog3 />} />
          <Route path="/treasure" element={<TreasureCodePage />} />
      </Routes>
      
    </div>
  )
}

export default App
