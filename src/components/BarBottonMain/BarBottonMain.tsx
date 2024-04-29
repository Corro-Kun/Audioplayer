import Made from "../Made/Made"
import {useNavigate} from "react-router-dom";
import "./BarBottonMain.css"
import {getVersion} from "@tauri-apps/api/app";
import {invoke} from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

function BarBottonMain(){
    const navigate = useNavigate();
    const [version, setVersion] = useState("");
    const [color, setColor] = useState("");
    useEffect(()=>{
        getVersion().then((data)=>setVersion(data));
        invoke("get_color_text").then((data: any)=>setColor(data));
    },[]);
    return(
        <div className="BarBottonMain-Render" >
            <div className="BarBottonMain-Bar" >
                <div className="BarBottonMain-Bar-Vercion" >
                    <h2 style={{color: color}} >V{version}</h2>
                </div>
                <div className="BarBottonMain-Bar-button" >
                    <button style={{backgroundColor: color}} onClick={()=> navigate("/home")} >¡Escuchar!</button>
                </div>
                <div className="BarBottonMain-Bar-Logo" >
                    <Made name="Corro-Kun"/>
                </div>
            </div>
        </div>
    );
}

export default BarBottonMain;