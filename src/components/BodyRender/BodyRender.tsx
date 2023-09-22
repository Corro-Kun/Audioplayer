import "./BodyRender.css";

function BodyRender({ children }: { children: React.ReactNode}) {
    return(
        <div className="BodyRender-Main" >
            {children}
        </div>
    );
}

export default BodyRender;