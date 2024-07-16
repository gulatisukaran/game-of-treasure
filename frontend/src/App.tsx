import './App.css'
import { Routes, Route } from 'react-router-dom';
import GameView from './Components/MainGame'
import ChatDialog1 from './Components/Chat1'
import ChatDialog2 from './Components/Chat2'
import ChatDialog3 from './Components/Chat3';

function App() {
  return (
    
    <div>
      <h2>Game of Minds</h2>
      <Routes>
          <Route path="/" element={<GameView />} />
          <Route path="/cd0" element={<ChatDialog1 />} />
          <Route path="/cd1" element={<ChatDialog2 />} />
          <Route path="/cd2" element={<ChatDialog3 />} />


      </Routes>
      
    </div>
  )
}

export default App
