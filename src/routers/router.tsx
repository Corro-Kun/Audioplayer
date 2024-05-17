import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home";
import BodyWallpaper from "../components/BodyWallpapar/BodyWallpaper";

function Router(){
    return(
        <BrowserRouter>
            <BodyWallpaper>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BodyWallpaper>
        </BrowserRouter>
    );
}

export default Router;