import Made from "../Made/Made"
import {useNavigate} from "react-router-dom";
import "./BarBottonMain.css"

function BarBottonMain(){
    const navigate = useNavigate();
    return(
        <div className="BarBottonMain-Render" >
            <div className="BarBottonMain-Bar" >
                <div className="BarBottonMain-Bar-Vercion" >
                    <h2>V0.3.0</h2>
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