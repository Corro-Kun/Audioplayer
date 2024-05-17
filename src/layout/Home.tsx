import Control from "../components/Control/Control";
import Filter from "../components/Filter/Filter";
import List from "../components/List/List";
import BodyRender from "../components/BodyRender/BodyRender.tsx"
import { MusicProvider } from "../context/Music.tsx";
import { VideoProvider } from "../context/Video.tsx";

function Home(){
    return(
        <BodyRender>
            <MusicProvider>
                <Filter /> 
                <VideoProvider>
                    <List />
                </VideoProvider>
                <Control />
            </MusicProvider>
        </BodyRender>
    );
}

export default Home;