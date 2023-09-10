import "./BodyWallpaper.css";
import BackGrund from "../../assets/luffy.mp4";

function BodyWallpaper({children}: {children: React.ReactNode}) {
    return(
        <div className="BodyWallpaper" >
            <video className="video-Background" muted autoPlay loop >
                <source src={BackGrund} type="video/mp4" />
                no se puede reproducir el video
            </video>
            <div className="BodyWallpaper-Div" >
                {children}
            </div>
        </div>
    );
}

export default BodyWallpaper;