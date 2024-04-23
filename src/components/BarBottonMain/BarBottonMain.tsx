import Made from "../Made/Made"
import {useNavigate} from "react-router-dom";
import "./BarBottonMain.css"
import {getVersion} from "@tauri-apps/api/app";
import { useEffect, useState } from "react";

function BarBottonMain(){
    const navigate = useNavigate();
    const [version, setVersion] = useState("");
    useEffect(()=>{
        getVersion().then((data)=>setVersion(data));
    },[]);
    return(
        <div className="BarBottonMain-Render" >
            <div className="BarBottonMain-Bar" >
                <div className="BarBottonMain-Bar-Vercion" >
                    <h2>V{version}</h2>
                </div>
                <div className="BarBottonMain-Bar-button" >
                    <button onClick={()=> navigate("/home")} >Entrar</button>
                </div>
                <div className="BarBottonMain-Bar-Logo" >
                    <Made name="Corro-Kun"/>
                </div>
            </div>
        </div>
    );
}

export default BarBottonMain;