import { useMusic } from "../../context/Music";
import play from "../../../public/Play.png";
import stop from "../../../public/stop.png";
import "./Control.css"
import { useEffect, useState } from "react";

function Control(){
    const {ControlMusic, NextMusic, BackMusic, Play, audioRef} = useMusic();
    const [duration, setDuration] = useState();
    const [durationMax, setDurationMax] = useState();
 
    const [volume, setVolume] = useState(1);
    useEffect(()=>{
        audioRef.current.addEventListener("timeupdate", updateTime);
        return () =>{
            audioRef.current.removeEventListener("timeupdate", updateTime);
        }
    },[]);
    const updateTime = () => {
        const currentTimeInSeconds = audioRef.current.currentTime;

        const duration = audioRef.current.duration;

        const minutesM = Math.floor(duration / 60);
        const secondsM = Math.floor(duration % 60);

        const Max = `${minutesM}:${secondsM < 10 ? '0' : ''}${secondsM}`;
        
        setDurationMax(Max);

        const minutes = Math.floor(currentTimeInSeconds / 60);
        const seconds = Math.floor(currentTimeInSeconds % 60);

        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        setDuration(formattedTime);
    };
    function changeVolume(e: any){
        setVolume(e.target.value);
        audioRef.current.volume = volume;
    }
    return(
        <div className="Control-Render-Div" >
            <div className="Control-Div" >
                <div className="duration" >
                    <p>{duration} | {durationMax}</p>
                </div>
                <div className="Control-Button-Main" >
                    <div onClick={()=> BackMusic()} className="Control-Button" >
                        <img src={"../../../public/back.png"} alt="" />
                    </div>
                    <div id="Play" onClick={()=>ControlMusic()} className="Control-Button" >
                        <img src={Play? stop : play} alt="" />
                    </div>
                    <div onClick={()=>NextMusic()} className="Control-Button" >
                        <img src={"../../../public/next.png"} alt="" />
                    </div>
                </div>
                <div className="volumn" >
                    <input type="range" value={volume} max={1} min={0} step={0.01} onChange={(e)=>changeVolume(e)} />
                </div>
           </div>
        </div>
    );
}

export default Control;