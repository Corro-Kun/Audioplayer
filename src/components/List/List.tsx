import {useEffect} from "react";
import { useMusic } from "../../context/Music";
import "./List.css"
import { useVideo } from "../../context/Video";
import ListVideo from "../ListVideo/ListVideo";
import Config from "../Config/Config";
import {ConfigProvider} from "../../context/Config";

function List(){
    const {getMusic, Music, PlayMusic, listMusic, InputMusic, CloseAnimation}:any = useMusic();
    const {getVideo}:any = useVideo();
    useEffect(()=>{
        getMusic()
        getVideo()
    },[]);
    return(
        <div className="List-Div-Render" >
            <ConfigProvider>
                <Config />
            </ConfigProvider>
                <div className="List-Div-Render-Main" >
                    <div className={CloseAnimation? "List-Div Active": "List-Div"} style={listMusic? {display: "none"} : {}} >
                        <div className="List-Title">
                            <h2 onClick={()=>InputMusic.current.click()} >Tu Música</h2>
                        </div>
                        <div className="List-Music">
                            {
                                Music.length > 0 ?
                                Music.map((item: any, index: number)=>(
                                    <div id={item.statue ? "select" : undefined} className="List-Music-Item" key={index} onClick={()=> PlayMusic(index)}>
                                        <p>{item.name}</p>
                                    </div>
                                ))
                                :
                                <div className="List-Music-Message" >
                                    <p>No se encontró la música, pon tu música en formato .mp3 en tu carpeta música por defecto</p>
                                </div>
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