import { invoke } from "@tauri-apps/api";
import { toast } from "sonner";

export async function ChangerVideoMain(){
    let paht: string = await invoke("get_video_db");
    if(paht !== "no") {
        const video = document.getElementById("video") as HTMLVideoElement;
        const source = document.getElementById("sourceV") as HTMLSourceElement;
        source.src = paht;
        video.load();
    }
}

export async function ChangerVideo(url: string){
    const video = document.getElementById("video") as HTMLVideoElement;
    const source = document.getElementById("sourceV") as HTMLSourceElement;
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
 
}