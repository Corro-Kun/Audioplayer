import imagen from '../../assets/GitHub.png';
import './Made.css';
import { shell } from "@tauri-apps/api";

function Made({name}: {name: string}){
    return(
        <div className='Made-Bar' onClick={()=> shell.open("https://github.com/Corro-Kun")} >
            <div className='Made-Bar-Img' >
                <img src={imagen} alt="GitHub" loading='lazy' />
            </div>
            <div className='Made-Bar-P' >
                <p>@{name}</p>
            </div>
        </div>
    )
}

export default Made;