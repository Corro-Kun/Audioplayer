import { useMusic } from "../../context/Music";
import play from "../../../public/Play.png";
import stop from "../../../public/stop.png";
import "./Control.css"

function Control(){
    const {ControlMusic, NextMusic, BackMusic, Play} = useMusic();
    return(
        <div className="Control-Render-Div" >
            <div className="Control-Div" >
                <div onClick={()=> BackMusic()} >
                    <img src={"../../../public/back.png"} alt="" />
                </div>
                <div id="Play" onClick={()=>ControlMusic()} >
                    <img src={Play? stop : play} alt="" />
                </div>
                <div onClick={()=>NextMusic()} >
                    <img src={"../../../public/next.png"} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Control;