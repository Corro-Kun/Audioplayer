import { useEffect, useState } from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./BarTopMain.css"

function BarTopMain(){
    const [color, setColor] = useState<string>("");
    useEffect(()=>{
        invoke("get_color_text").then((data: any)=>{
            setColor(data);
        });
    },[]);
    return(
        <div className="BarTopMain-Reder" >
            <h2 style={{color: color}} >AudioPlayer</h2>
        </div>
    );
}

export default BarTopMain;