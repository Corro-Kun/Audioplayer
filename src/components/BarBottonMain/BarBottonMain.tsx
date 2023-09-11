import Made from "../Made/Made"
import {useNavigate} from "react-router-dom";
import "./BarBottonMain.css"

function BarBottonMain(){
    const navigate = useNavigate();
    return(
        <div className="BarBottonMain-Render" >
            <div className="BarBottonMain-Bar" >
                <h2>V0.0.1</h2>
                <button onClick={()=> navigate("/home")} >Entrar</button>
                <Made name="Corro-Kun" />
            </div>
        </div>
    );
}

export default BarBottonMain;