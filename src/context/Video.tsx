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
        let paht: string = await invoke("get_video_db");
        if(paht !== "no") {
            const video = document.getElementById("video") as HTMLVideoElement;
            const source = document.getElementById("sourceV") as HTMLSourceElement;
            source.src = paht;
            video.load();
        }
    }

    async function changerVideo(i: number){
        try {
            // const VideoContainer = document.getElementsByClassName("BodyWallpaper");

            // const newVideo = document.createElement("video") as HTMLVideoElement;
            // newVideo.id = "video";
            // newVideo.className = "video-Background";
            // newVideo.muted = true;
            // newVideo.autoplay = true;
            // newVideo.loop = true;

            // const newSource = document.createElement("source") as HTMLSourceElement;
            // newSource.id = "sourceV";
            // newSource.src = convertFileSrc(Video[i]?.path);
            // newSource.type = "video/mp4";

            // newVideo.appendChild(newSource);

            // const oldVideo = document.getElementById("video") as HTMLVideoElement;
            // const oldSource = document.getElementById("sourceV") as HTMLSourceElement;
            // if(oldVideo && oldSource){
            //     oldVideo.remove();
            //     oldSource.remove();
            // }

            // VideoContainer[0].appendChild(newVideo);

            // await newVideo.play();

            const video = document.getElementById("video") as HTMLVideoElement;
            const source = document.getElementById("sourceV") as HTMLSourceElement;
            const url = convertFileSrc(Video[i]?.path);
            source.src = url;

            await invoke("put_path_video", {path: url});

            video.load();
            toast.promise(video.play(), {
                loading: "Cargando video",
                success: "Video cargado",
                error(error) {
                    return `Error: ${error}`;
                },
            })
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

    const [configState, setConfigState] = useState(false);

    function ChangerConfigState(){
        setConfigState(!configState);
    }

    return(
        <VideoContext.Provider value={{getVideo, Video, changerVideo, ChangerStateListFondos, listFondos,configState, ChangerConfigState}}>
            {children}
        </VideoContext.Provider>
    );
}