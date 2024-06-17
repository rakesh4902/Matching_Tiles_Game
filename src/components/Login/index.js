import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css'

const Login=()=>{
    const [name,setName]=useState('');
    const navigate = useNavigate();
    const onChangeName=e=>{
        setName(e.target.value);
    }

    const onSubmitName=e=>{
        e.preventDefault();
        localStorage.setItem('username',name);
        navigate('/game_start');
    }

    return(
        <div className="login_page">
            <h1 class="login_head">React Tiles</h1>
            <form onSubmit={onSubmitName} className="form_container">
                <label className="login_head">Enter Your Name</label>
                <input type="text" className="input_name" value={name} onChange={onChangeName}/>
                <button className="play_button">Play</button>
            </form>
        </div>
    )
}

export default Login;