import {useEffect} from "react";
import "./BodyWallpaper.css";
import BackGrund from "../../assets/luffy.mp4";
import { ChangerVideoMain } from "../../function/bodyWalpaper";

function BodyWallpaper({children}: {children: React.ReactNode}) {
    useEffect(()=>{
        ChangerVideoMain();
    },[]);
    return(
        <div className="BodyWallpaper" >
            <video id="video" className="video-Background" muted autoPlay loop >
                <source id="sourceV" src={BackGrund} type="video/mp4" />
                no se puede reproducir el video
            </video>
            <div className="BodyWallpaper-Div" >
                {children}
            </div>
        </div>
    );
}

export default BodyWallpaper;