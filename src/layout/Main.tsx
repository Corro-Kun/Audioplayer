import BarBottonMain from "../components/BarBottonMain/BarBottonMain";
import BarTopMain from "../components/BarTopMain/BarTopMain";
import BodyWallpaper from "../components/BodyWallpapar/BodyWallpaper";

function Main(){
    return(
        <BodyWallpaper>
            <BarTopMain />
            <BarBottonMain />
        </BodyWallpaper>
    );
}

export default Main;