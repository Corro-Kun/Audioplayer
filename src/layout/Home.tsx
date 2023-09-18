import BodyWallpaper from "../components/BodyWallpapar/BodyWallpaper";
import Control from "../components/Control/Control";
import Filter from "../components/Filter/Filter";
import List from "../components/List/List";
import BodyRender from "../components/BodyRender/BodyRender.tsx"
import { MusicProvider } from "../context/Music.tsx";

function Home(){
    return(
        <BodyWallpaper>
            <BodyRender>
                <Filter />
                <MusicProvider>
                    <List />
                </MusicProvider>
                <Control />
            </BodyRender>
        </BodyWallpaper>
    );
}

export default Home;