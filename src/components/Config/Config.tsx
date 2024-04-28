import { useMusic } from "../../context/Music";
import { useVideo } from "../../context/Video";
import {GoPencil} from "react-icons/go";
import "./Config.css"
import { useConfig } from "../../context/Config";
import {useEffect} from "react";

function Config(){
    const {ChangerStateListMusic, InputMusic, CloseAnimation} = useMusic();
    const {ChangerStateListFondos, configState, ChangerConfigState, InputVideo, InputColorLabel, InputColorBorder, InputColorShadow, CloseAnimationV}:any = useVideo();
    const {/*ChangerColorBorder, ChangerColorLabel, ChangerColorShadow,*/ getColor, save, Save, ChangerColor, changerOpacity, opacity, changerShadow, shadow,  smoothPrimary, changerSmoothPrimary}:any = useConfig();

    useEffect(()=>{
        getColor();

        const Opacity = document.getElementById("Opacity") as HTMLInputElement;
        const Density = document.getElementById("Density") as HTMLInputElement;
        const Smooth = document.getElementById("smooth") as HTMLInputElement;

        Opacity.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Opacity.value) / Number(Opacity.max) * 100}%, var(--Border_Color) ${Number(Opacity.value) / Number(Opacity.max) * 100}%, var(--Border_Color) 100%)`;
        Density.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Density.value) / Number(Density.max) * 100}%, var(--Border_Color) ${Number(Density.value) / Number(Density.max) * 100}%, var(--Border_Color) 100%)`;
        Smooth.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Smooth.value) / Number(Smooth.max) * 100}%, var(--Border_Color) ${Number(Smooth.value) / Number(Smooth.max) * 100}%, var(--Border_Color) 100%)`;
    },[]);

    return(
        <div className="List-Div-Config-Render">
            <div className="List-Div-Config" style={configState? {display: "none"} : {}} >
                <div className="List-Title" onClick={ChangerConfigState}  >
                    <h2>Configuraciones</h2>
                </div>
                <div className="List-Config-Render" >
                    <div className="Checkbox-div" >
                        <label>{CloseAnimationV? "Activar": "Desactivar"} fondos</label>
                        <input type="checkbox" ref={InputVideo} onChange={ChangerStateListFondos} />
                    </div>
                    <div className="Checkbox-div" >
                        <label>{CloseAnimation? "Activar": "Desactivar"} lista</label>
                        <input type="checkbox" ref={InputMusic} onChange={ChangerStateListMusic} />
                    </div>
                    <div className="Checkbox-div" >
                        <label>Color de letras</label>  {/*ChangerColorLabel*/}
                        <input name="1" onChange={(e)=> ChangerColor(e)} ref={InputColorLabel} style={{display:"none"}} type="color" value={document.documentElement.style.getPropertyValue("--Text_Color")} />
                        <button onClick={()=> InputColorLabel.current.click()} style={{backgroundColor:"var(--Text_Color)"}} className="Checkbox-div-Color" ></button>
                    </div>
                    <div className="Checkbox-div" >
                        <label>Color de bordes</label>  {/*ChangerColorBorder*/} 
                        <input name="2" onChange={(e)=> ChangerColor(e)} ref={InputColorBorder} style={{display:"none"}} type="color" />
                        <button onClick={()=> InputColorBorder.current.click()} style={{backgroundColor:"var(--Border_Color)"}} className="Checkbox-div-Color" ></button>
                    </div>
                    <div className="Checkbox-div" >
                        <label>Color de sombras</label>  {/*ChangerColorShadow*/}
                        <input name="3" onChange={(e)=> ChangerColor(e)} ref={InputColorShadow} style={{display:"none"}} type="color" />
                        <button onClick={()=> InputColorShadow.current.click()} style={{backgroundColor:"var(--Shadow_Color)"}} className="Checkbox-div-Color" ></button>
                    </div>
                    <div className="Config-Ranger" >
                        <div>
                            <label>Opacidad</label>
                            <label>{opacity}</label>
                        </div>
                        <input id="Opacity" type="range" min="0" max="30" onChange={(e)=>{
                            let progress = Number(e.target.value) / Number(e.target.max) * 100;
                            e.target.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${progress}%, var(--Border_Color) ${progress}%, var(--Border_Color) 100%)`;
                            changerOpacity(e);
                        }} />
                    </div>
                    <div className="Config-Ranger" >
                        <div>
                            <label>Densidad de sombras</label>
                            <label>{shadow}</label>
                        </div>
                        <input id="Density" type="range" min="0" max="30" onChange={(e)=>{
                            let progress = Number(e.target.value) / Number(e.target.max) * 100;
                            e.target.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${progress}%, var(--Border_Color) ${progress}%, var(--Border_Color) 100%)`;
                            changerShadow(e);
                        }} />
                    </div>
                    <div className="Config-Ranger" >
                        <div>
                            <label>Suavizar bordes</label>
                            <label>{smoothPrimary}</label>
                        </div>
                        <input id="smooth" type="range" min="0" max="30" onChange={(e)=>{
                            let progress = Number(e.target.value) / Number(e.target.max) * 100;
                            e.target.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${progress}%, var(--Border_Color) ${progress}%, var(--Border_Color) 100%)`;
                            changerSmoothPrimary(e);
                        }} />
                    </div>
                    <div style={save? {}: {display: "none"}} className="List-Config-Button" >
                        <button onClick={()=> Save()} >Guardar</button>
                    </div>
                </div>
            </div>
            <div className="List-Div-Config-Button" style={configState? {} : {display: "none"}} >
                <h2 onClick={ChangerConfigState} ><GoPencil/></h2>
            </div>
        </div>
    );
}

export default Config;