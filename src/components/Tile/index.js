import './index.css'
const Tile=({ index, value, isFlipped, onClick })=>{

    const handleClcik=()=>{
        if(!isFlipped){
            onClick(index)
        }
    }
    return(
        <li className={`tile ${isFlipped ? 'flipped':''}`} onClick={handleClcik}>
            {isFlipped ? value : ''}
        </li>
    )
}

export default Tile;