import './App.css'
import { Routes, Route } from 'react-router-dom';
import GameView from './Components/MainGame'
import ChatDialog1 from './Components/Chat1'
import ChatDialog2 from './Components/Chat2'

function App() {
  return (
    
    <div>
      <h2>Game of Minds</h2>
      <Routes>
          <Route path="/" element={<GameView />} />
          <Route path="/cd1" element={<ChatDialog1 />} />
          <Route path="/cd2" element={<ChatDialog2 />} />

      </Routes>
      
    </div>
  )
}

export default App
