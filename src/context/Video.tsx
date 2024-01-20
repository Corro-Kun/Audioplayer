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
            const url = convertFileSrc(Video[i]?.path);
            ChangerVideo(url);
        } catch (error) {
            console.log(error);
            //toast.error("Error: " + error);
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

    // funcion para cambiar el color de las letras
    function ChangerColorLabel({target: {value}}: any){
        document.documentElement.style.setProperty("--Text_Color", value);
    }

    // funcion para cambiar el color de los bordes
    function ChangerColorBorder({target: {value}}: any){
        document.documentElement.style.setProperty("--Border_Color", value);
    }

    // funcion para cambiar el color de los bordes
    function ChangerColorShadow({target: {value}}: any){
        document.documentElement.style.setProperty("--Shadow_Color", value);
    }

    return(
        <VideoContext.Provider value={{getVideo, Video, changerVideo, ChangerStateListFondos, listFondos,configState, ChangerConfigState, InputVideo, InputColorLabel, ChangerColorLabel, InputColorBorder, ChangerColorBorder, InputColorShadow, ChangerColorShadow}}>
            {children}
        </VideoContext.Provider>
    );
}