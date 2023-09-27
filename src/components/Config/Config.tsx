import { useMusic } from "../../context/Music";
import { useVideo } from "../../context/Video";
import "./Config.css"

function Config(){
    const {ChangerStateListMusic, listMusic} = useMusic();
    const {ChangerStateListFondos, listFondos}:any = useVideo();
    return(
        <div className="List-Div-Config-Render">
            <div className="List-Div-Config" >
                <div className="List-Title">
                    <h2>Configuraciones</h2>
                </div>
                <div className="Checkbox-div" >
                    <label>{listFondos? "Activar": "Desactivar"} fondos</label>
                    <input type="checkbox" onChange={ChangerStateListFondos} />
                </div>
                <div className="Checkbox-div" >
                    <label>{listMusic? "Activar": "Desactivar"} lista</label>
                    <input type="checkbox" onChange={ChangerStateListMusic} />
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default Config;