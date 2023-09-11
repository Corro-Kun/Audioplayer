import BodyWallpaper from "../components/BodyWallpapar/BodyWallpaper";
import Control from "../components/Control/Control";
import Filter from "../components/Filter/Filter";
import List from "../components/List/List";

function Home(){
    return(
        <BodyWallpaper>
            <Filter />
            <List />
            <Control />
        </BodyWallpaper>
    );
}

export default Home;