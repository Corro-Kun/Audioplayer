import { useMusic } from "../../context/Music";
import "./Filter.css"

function Filter(){
    const {FilterMusic} = useMusic();
    return(
        <div className="Filter-Div-Render" >
            <div>
                <input type="text" id="shear" autoComplete="off" placeholder="Buscar..." onChange={(e)=> FilterMusic(e)} />
            </div>
        </div>
    );
}

export default Filter;