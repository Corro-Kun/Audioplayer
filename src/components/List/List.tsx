import {useEffect} from "react";
import { useMusic } from "../../context/Music";
import "./List.css"
import { useVideo } from "../../context/Video";
import ListVideo from "../ListVideo/ListVideo";
import Config from "../Config/Config";

function List(){
    const {getMusic, Music, PlayMusic, listMusic}:any = useMusic();
    const {getVideo}:any = useVideo();
    useEffect(()=>{
        getMusic()
        getVideo()
    },[]);
    return(
        <div className="List-Div-Render" >
            <Config />
                <div className="List-Div-Render-Main" >
                    <div className="List-Div" style={listMusic? {display: "none"} : {}} >
                        <div className="List-Title">
                            <h2>Tu Música</h2>
                        </div>
                        <div className="List-Music">
                            {
                                Music.map((item: any, index: number)=>(
                                    <div id={item.statue ? "select" : undefined} className="List-Music-Item" key={index} onClick={()=> PlayMusic(index)}>
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            }
                        <audio style={{display: "none"}} id="audio" controls>
                            <source id="source" src="" type="audio/mpeg" />
                        </audio>
                        </div>
                    </div>
                </div>
            <ListVideo />
       </div>
    );
}

export default List;