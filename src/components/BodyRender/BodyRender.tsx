import "./BodyRender.css";

function BodyRender({ children }) {
    return(
        <div className="BodyRender-Main" >
            {children}
        </div>
    );
}

export default BodyRender;