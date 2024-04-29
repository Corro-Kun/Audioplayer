import imagen from '../../assets/GitHub.png';
import './Made.css';
import { shell } from "@tauri-apps/api";

function Made({name, color}: {name: string, color: string}){
    return(
        <div className='Made-Bar' onClick={()=> shell.open("https://github.com/Corro-Kun")} >
            <div className='Made-Bar-Img' >
                <img src={imagen} alt="GitHub" loading='lazy' />
            </div>
            <div className='Made-Bar-P' >
                <p style={{color: color}} >@{name}</p>
            </div>
        </div>
    )
}

export default Made;