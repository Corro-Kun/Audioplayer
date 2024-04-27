import { useMusic } from "../../context/Music";
import {IoPause, IoPlay, IoPlaySkipForward, IoPlaySkipBack, IoVolumeOff} from "react-icons/io5";
import "./Control.css"
import { useEffect} from "react";

function Control(){
    const {ControlMusic, NextMusic, BackMusic, Play, changeVolume, updateTime, duration, volume, durtationInput, durationInputMax, changeDuration} = useMusic();

   useEffect(()=>{
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.addEventListener("timeupdate", updateTime);
        return () =>{
            audio.removeEventListener("timeupdate", updateTime);
        }
    },[]);
    return(
        <div className="Control-Render-Div" >
            <div className="Control-Div" >
                <div className="Control-Duration" >
                    <input id="Control-Progress" type="range" value={durtationInput} max={durationInputMax} min={0.0} step={0.1} onChange={(e)=>changeDuration(e)} />
                </div>
                <div className="Control-Div-Manager" >
                    <div className="duration" >
                        <p>{duration}</p>
                    </div>
                    <div className="Control-Button-Main" >
                        <div onClick={()=> BackMusic()} className="Control-Button" >
                            <h1><IoPlaySkipBack /></h1>
                        </div>
                        <div id="Play" onClick={()=>ControlMusic()} className="Control-Button" >
                            {Play? <h1><IoPause /></h1> :  <h1 style={{transform: "translateX(2px) translateY(2.9px)"}} ><IoPlay /></h1>}
                        </div>
                        <div onClick={()=>NextMusic()} className="Control-Button" >
                            <h1><IoPlaySkipForward /></h1>
                        </div>
                    </div>
                    <div className="volumn" >
                        <h2><IoVolumeOff /></h2>
                        <input type="range" value={volume} max={1} min={0} step={0.01} onChange={(e)=>changeVolume(e)} />
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Control;