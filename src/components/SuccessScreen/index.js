import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './index.css';

const SuccessScreen = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const { score, time } = location.state || { score: 0, time: '00:00' };
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('username');
    navigate('/');
  }

  const handlePlayAgain=()=>{
        navigate('/game_start');
  }

  return (
    <div className="successs_screen_container">
      <h1 className="gaming_board_head">React Tiles</h1> 
      <div className="score_time_container">
        <h1 className="score_time">Score: {score}</h1>
        <h1 className="score_time">Time: {time}</h1>
      </div>  
      <div className="board_success">
        <h1 className="welcome_name">Welcome {name} 👋👋 </h1>
        <div>
          <h1 className="gaming_board_head">Game Finished!</h1> 
          <div className="score_time_success">
            <h1 className='scores_success'>Score: {score}</h1>
            <h1 className='scores_success'>Time Taken: {time}</h1>
            <div className='buttons_container'>
                <button className="play_button" onClick={handlePlayAgain}>Play Again</button>
                <button className="play_button" onClick={handleLogout}>Logout</button>
          </div>
          </div>
          
        </div>
      </div>         
    </div>
  );
};

export default SuccessScreen;
