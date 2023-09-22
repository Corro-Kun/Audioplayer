import { useMusic } from "../../context/Music";
import play from "../../../public/Play.png";
import stop from "../../../public/stop.png";
import "./Control.css"
import { useEffect} from "react";

function Control(){
    const {ControlMusic, NextMusic, BackMusic, Play, changeVolume, updateTime, duration, volume} = useMusic();

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
                <div className="duration" >
                    <p>{duration}</p>
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