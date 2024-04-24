import { useMusic } from "../../context/Music";
import { useVideo } from "../../context/Video";
import {GoPencil} from "react-icons/go";
import "./Config.css"

function Config(){
    const {ChangerStateListMusic, InputMusic, CloseAnimation} = useMusic();
    const {ChangerStateListFondos, configState, ChangerConfigState, InputVideo, InputColorLabel, ChangerColorLabel, InputColorBorder, ChangerColorBorder, InputColorShadow, ChangerColorShadow, CloseAnimationV}:any = useVideo();

    return(
        <div className="List-Div-Config-Render">
            <div className="List-Div-Config" style={configState? {display: "none"} : {}} >
                <div className="List-Title" onClick={ChangerConfigState}  >
                    <h2>Configuraciones</h2>
                </div>
                <div className="Checkbox-div" >
                    <label>{CloseAnimationV? "Activar": "Desactivar"} fondos</label>
                    <input type="checkbox" ref={InputVideo} onChange={ChangerStateListFondos} />
                </div>
                <div className="Checkbox-div" >
                    <label>{CloseAnimation? "Activar": "Desactivar"} lista</label>
                    <input type="checkbox" ref={InputMusic} onChange={ChangerStateListMusic} />
                </div>
                <div className="Checkbox-div" >
                    <label>Color de letras</label>
                    <input onChange={(e)=> ChangerColorLabel(e)} ref={InputColorLabel} style={{display:"none"}} type="color" value={document.documentElement.style.getPropertyValue("--Text_Color")} />
                    <button onClick={()=> InputColorLabel.current.click()} style={{backgroundColor:"var(--Text_Color)"}} className="Checkbox-div-Color" ></button>
                </div>
                <div className="Checkbox-div" >
                    <label>Color de bordes</label>
                    <input onChange={(e)=> ChangerColorBorder(e)} ref={InputColorBorder} style={{display:"none"}} type="color" />
                    <button onClick={()=> InputColorBorder.current.click()} style={{backgroundColor:"var(--Border_Color)"}} className="Checkbox-div-Color" ></button>
                </div>
                <div className="Checkbox-div" >
                    <label>Color de sombras</label>
                    <input onChange={(e)=> ChangerColorShadow(e)} ref={InputColorShadow} style={{display:"none"}} type="color" />
                    <button onClick={()=> InputColorShadow.current.click()} style={{backgroundColor:"var(--Shadow_Color)"}} className="Checkbox-div-Color" ></button>
                </div>
 
            </div>
            <div className="List-Div-Config-Button" style={configState? {} : {display: "none"}} >
                <h2 onClick={ChangerConfigState} ><GoPencil/></h2>
            </div>
        </div>
    );
}

export default Config;