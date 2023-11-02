import { useVideo } from "../../context/Video";
import {FaPhotoVideo} from "react-icons/fa"
import "./ListVideo.css"

function ListVideo(){
    const {Video, changerVideo, listFondos, InputVideo}:any = useVideo();
    return (
        <div className="List-Div-video-Render" >
            <div className="List-Div-video" style={listFondos? {display:"none"} : {}} >
                <div className="List-Title" >
                    <h2 onClick={()=> InputVideo.current.click()} >Fondos</h2>
                </div>
                {
                    Video.map((item: any, index: number)=>(
                        <div className="List-Music-Item" key={index} onClick={()=>changerVideo(index)} >
                            <p><span><FaPhotoVideo /></span> {item.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListVideo;