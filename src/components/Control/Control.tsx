import "./Control.css"

function Control(){
    return(
        <div className="Control-Render-Div" >
            <div className="Control-Div" >
                <div>
                    <img src={"../../../public/back.png"} alt="" />
                </div>
                <div id="Play" >
                    <img src={"../../../public/Play.png"} alt="" />
                </div>
                <div>
                    <img src={"../../../public/next.png"} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Control;