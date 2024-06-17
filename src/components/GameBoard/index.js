import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import Tile from "../Tile";


const emojis = ["😊", "🎉", "🌟", "🚀", "🔥", "🍀", "🌈", "💎", "✨", "🎂", "🐱", "🐶", "🦄", "🐼", "🐧", "🐸", "🎇"];

const generateTiles = () => {
    const tiles = [];
    for (let i = 1; i <= 16; i++) {
        tiles.push(emojis[i], emojis[i]);
    }
    return shuffle(tiles);
}

const shuffle = (tiles) => {
    return tiles.sort(() => Math.random() - 0.5);
}

const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
};

const GameBoard = () => {
    const [tiles, setTiles] = useState(generateTiles());
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [matchedTiles, setMatchedTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [timer, setTimer] = useState(null);
    const [name,setName]=useState('');
    const navigate=useNavigate();

    useEffect(() => {

        const storedName = localStorage.getItem('username');
        if(storedName){
            setName(storedName)
        }

        if (flippedTiles.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }, [flippedTiles]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        setTimer(interval);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (matchedTiles.length === tiles.length) {
            clearInterval(timer);
            navigate('/game_result', { state: { score, time: formatTime(time) } });
        }
    }, [matchedTiles, tiles.length, timer, navigate, score, time]);

    const handleTileClick = (index) => {
        if (flippedTiles.length < 2 && !flippedTiles.includes(index)) {
            setFlippedTiles((prev) => [...prev, index]);
        }
    };

    const checkMatch = () => {
        const [first, second] = flippedTiles;
        if (tiles[first] === tiles[second]) {
            setMatchedTiles((prev) => [...prev, first, second]);
            setScore((prev) => prev + 1);
        } else {
            setScore((prev) => prev - 1);
        }
        setFlippedTiles([]);
    }

    return (
        <div className="gaming_board">
            <h1 className="gaming_board_head">Mahajong Game</h1>
            <div className="score_time_container">
                <h1 className="score_time">Score: {score}</h1>
                <h1 className="score_time">Time: {formatTime(time)}</h1>
            </div>
            <div className="board">
                <h1 className="welcome_name">Welcome {name} 👋👋 </h1>
                <ul className="tiles_list">
                    {tiles.map((tile, index) => (
                        <Tile 
                            key={index}
                            index={index}
                            value={tile}
                            isFlipped={flippedTiles.includes(index) || matchedTiles.includes(index)}
                            onClick={handleTileClick}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default GameBoard;
