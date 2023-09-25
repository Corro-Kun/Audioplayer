import {useEffect, useState} from "react";
import { useMusic } from "../../context/Music";
import "./List.css"

function List(){
    const {getMusic, Music, PlayMusic, getVideo, Video, changerVideo} = useMusic();
    useEffect(()=>{
        getMusic()
        getVideo()
    },[]);
    const [listMusic, setListMusic] = useState(false);
    return(
        <div className="List-Div-Render" >
            <div className="List-Div-Config-Render">
                <div className="List-Div-Config" >
                    <div className="List-Title">
                        <h2>Configuraciones</h2>
                    </div>

                </div>
            </div>
            <div className="List-Div" style={listMusic? {display: "none"} : {}} >
                <div className="List-Title">
                    <h2 onClick={()=> setListMusic(true)} >Tu Música</h2>
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
            <div className="List-Div-video-Render" >
                <div className="List-Div-video" >
                    <div className="List-Title" >
                        <h2>Fondos</h2>
                    </div>
                    {
                        Video.map((item: any, index: number)=>(
                            <div className="List-Music-Item" key={index} onClick={()=>changerVideo(index)} >
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default List;