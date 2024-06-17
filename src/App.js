import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/game_start" element={<GameBoard />}/>
        <Route path="/game_result" element={<SuccessScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
