import { convertFileSrc, invoke } from "@tauri-apps/api/tauri";
import {createContext, useContext, useRef, useState} from "react";
//import { toast } from "sonner";
import { list_video } from "../interface/main";
import { ChangerVideo } from "../lib/bodyWalpaper";

export const VideoContext = createContext({});

export function useVideo() {
    return useContext(VideoContext);
}

export function VideoProvider({children}: any) {

    const InputVideo = useRef(null);

    // ref para alterar el color de las letras
    const InputColorLabel = useRef(null);

    // ref para alterar el color de los bordes
    const InputColorBorder = useRef(null);

    // ref para alterar el color de las sombras
    const InputColorShadow = useRef(null);

    const InputColorBackground = useRef(null);

    const [Video, setVideo] = useState([{
        name: "",
        path: "",
    }]);

    async function getVideo(){
        let data: list_video[] = await invoke("get_path_video");
        data = data.filter((file: any)=>{
            return file.name?.toLowerCase().includes("fondos");
        })
        data = data[0]?.children || null;
        if(data === null){
            setVideo([]);
            return;
        }
        data.forEach((e) =>{
            e.name = e.name.replace(".mp4", "");
        });
        setVideo(data);
    }

    async function changerVideo(i: number){
        try {
            const url = convertFileSrc(Video[i]?.path);
            ChangerVideo(url);
        } catch (error) {
            console.log(error);
            //toast.error("Error: " + error);
        }
    }

    // variables para el estado de las listas y fondos
    const [listFondos, setListFondos] = useState(false);
    const [CloseAnimationV, setCloseAnimation] = useState(false);

    function ChangerStateListFondos(){
        if(listFondos){
            setListFondos(!listFondos);
            setCloseAnimation(!CloseAnimationV);
        }else if(!listFondos){
            setCloseAnimation(!CloseAnimationV);
            setTimeout(()=>{
                setListFondos(!listFondos);
            }, 400);
        }
    }

    const [configState, setConfigState] = useState(false);


    function ChangerConfigState(){
        setConfigState(!configState);
    }

    return(
        <VideoContext.Provider value={{getVideo, Video, changerVideo, ChangerStateListFondos, listFondos,configState, ChangerConfigState, InputVideo, InputColorLabel, InputColorBorder, InputColorShadow, CloseAnimationV, InputColorBackground}}>
            {children}
        </VideoContext.Provider>
    );
}