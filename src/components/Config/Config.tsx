import { useMusic } from "../../context/Music";
import { useVideo } from "../../context/Video";
import {GoPencil} from "react-icons/go";
import "./Config.css"

function Config(){
    const {ChangerStateListMusic, listMusic, InputMusic} = useMusic();
    const {ChangerStateListFondos, listFondos, configState, ChangerConfigState, InputVideo}:any = useVideo();
    return(
        <div className="List-Div-Config-Render">
            <div className="List-Div-Config" style={configState? {display: "none"} : {}} >
                <div className="List-Title" onClick={ChangerConfigState}  >
                    <h2>Configuraciones</h2>
                </div>
                <div className="Checkbox-div" >
                    <label>{listFondos? "Activar": "Desactivar"} fondos</label>
                    <input type="checkbox" ref={InputVideo} onChange={ChangerStateListFondos} />
                </div>
                <div className="Checkbox-div" >
                    <label>{listMusic? "Activar": "Desactivar"} lista</label>
                    <input type="checkbox" ref={InputMusic} onChange={ChangerStateListMusic} />
                </div>
                <div>
                </div>
            </div>
            <div className="List-Div-Config-Button" style={configState? {} : {display: "none"}} >
                <h2 onClick={ChangerConfigState} ><GoPencil/></h2>
            </div>
        </div>
    );
}

export default Config;