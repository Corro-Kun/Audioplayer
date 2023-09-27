import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import {createContext, useContext, useState} from "react";
import { toast } from "sonner";
import { list_video } from "../interface/main";

export const VideoContext = createContext({});

export function useVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({children}: any) {

    const [Video, setVideo] = useState([{
        name: "",
        path: "",
    }]);

    async function getVideo(){
        let data: list_video[] = await invoke("get_path_video");
        data = data.filter((file: any)=>{
            return file.name?.toLowerCase().includes("fondos");
        })
        data = data[0].children;
        setVideo(data);
    }

    async function changerVideo(i: number){
        try {
            const video = document.getElementById("video") as HTMLVideoElement;
            const source = document.getElementById("sourceV") as HTMLSourceElement;
            const url = convertFileSrc(Video[i].path);
            source.src = url;
            video.load();
            await video.play();
        } catch (error) {
            console.log(error);
            toast.error("Error: " + error);
        }
    }

    // variables para el estado de las listas y fondos
    const [listFondos, setListFondos] = useState(false);

    function ChangerStateListFondos(){
        setListFondos(!listFondos);
    }

    return(
        <VideoContext.Provider value={{getVideo, Video, changerVideo, ChangerStateListFondos, listFondos}}>
            {children}
        </VideoContext.Provider>
    );
}