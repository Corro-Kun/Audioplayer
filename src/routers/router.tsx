import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;