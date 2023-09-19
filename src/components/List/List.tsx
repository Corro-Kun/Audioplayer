import {useEffect} from "react";
import { useMusic } from "../../context/Music";
import "./List.css"

function List(){
    const {getMusic, Music, PlayMusic} = useMusic();
    useEffect(()=>{
        getMusic()
    },[]);
    return(
        <div className="List-Div-Render" >
            <div className="List-Div" >
                <div className="List-Title" >
                    <h2>Tu Música</h2>
                </div>
                <div className="List-Music">
                    {
                        Music.map((item: any, index: number)=>(
                            <div className="List-Music-Item" key={index} onClick={()=> PlayMusic(index)}>
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
    );
}

export default List;