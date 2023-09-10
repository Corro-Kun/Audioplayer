import Made from "../Made/Made"
import "./BarBottonMain.css"

function BarBottonMain(){
    return(
        <div className="BarBottonMain-Render" >
            <div className="BarBottonMain-Bar" >
                <h2>V0.0.1</h2>
                <button>Entrar</button>
                <Made name="Corro-Kun" />
            </div>
        </div>
    );
}

export default BarBottonMain;