import {useContext, createContext, useState} from "react";
import {invoke} from "@tauri-apps/api/tauri"
import {convertFileSrc} from "@tauri-apps/api/tauri"
import {toast} from "sonner";

const MusicContext = createContext({} as any);

export const useMusic = ()=>{
    return useContext(MusicContext);
}

interface list_music{
    name: string,
    path: string,
    statue: boolean
}

interface list_video{
    name: string,
    path: string,
    children: list_video[]
}

export const MusicProvider = ({children} : {children: React.ReactNode})=>{
    const [Music, setMusic] =  useState([{name: "", path: "", statue: false}]);
    const [Play, setPlay] = useState(false);
    const [Index, setIndex] = useState(0);

    async function getMusic(){
        let data: list_music[] = await invoke("get_path_music");
        data = data.filter((file)=>{
            return file.name?.toLowerCase().endsWith(".mp3");
        })
        data = data.map((file, i)=>{
            file.name = file.name?.replace(".mp3", "");
            let a = i + 1;
            file.name = a + ". " + file.name;
            file.statue = false;
            return file;
        });
        setMusic(data);
    }

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
        console.log(data);
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
            toast.error("No se puede reproducir el video");
        }
    }

    async function PlayMusic(i: number){
        try {
            const url = convertFileSrc(Music[i].path);
            const audio = document.getElementById("audio") as HTMLAudioElement;
            const source = document.getElementById("source") as HTMLSourceElement;
            source.src = url;
            audio.load();
            await audio.play();
            setPlay(true);
            setIndex(i);
            let cache = Music;
            cache.map((item)=>(item.statue = false));
            cache[i].statue = true;
            setMusic(cache);
            document.title = Music[i].name;
        } catch (error) {
            console.log(error);
            toast.error("No se puede reproducir la música");
        }
    }

    async function ControlMusic(){
        const audio = document.getElementById("audio") as HTMLAudioElement;
        if(Play){
            audio.pause();
            setPlay(false);
        }else{
            await audio.play();
            setPlay(true);
        }
    }

    async function NextMusic(){
        if(Index < Music.length - 1){
            await PlayMusic(Index + 1);
        }else{
            await PlayMusic(0);
        }
    }

    async function BackMusic(){
        if(Index > 0){
            await PlayMusic(Index - 1);
        }else{
            await PlayMusic(Music.length - 1);
        }
    }

    function FilterMusic({target:{value}}: {target: {value: string}}){
        if(value === ""){
            getMusic();
        }else{
            const data = Music.filter((item)=>{
                return item.name?.toLowerCase().includes(value.toLowerCase());
            });
            setMusic(data);
        }
    }

    const [duration, setDuration] = useState("");
 
    const [volume, setVolume] = useState(1);
 
    const updateTime = () => {
        const audio = document.getElementById("audio") as HTMLAudioElement;
 
        const currentTimeInSeconds = audio.currentTime;

        const duration = audio.duration;

        const minutesM = Math.floor(duration / 60);
        const secondsM = Math.floor(duration % 60);

        const Max = `${minutesM}:${secondsM < 10 ? '0' : ''}${secondsM}`;

        const minutes = Math.floor(currentTimeInSeconds / 60);
        const seconds = Math.floor(currentTimeInSeconds % 60);

        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        setDuration(formattedTime + " | " + Max);
    };

    function changeVolume({target:{value}}: {target: {value: number}}){
        const audio = document.getElementById("audio") as HTMLAudioElement;
        setVolume(value);
        audio.volume = volume;
    }

    return(
        <MusicContext.Provider value={{getMusic, Music, PlayMusic, ControlMusic, NextMusic, BackMusic, FilterMusic, Play, changeVolume, updateTime, duration, volume, getVideo, Video, changerVideo}}>
            {children}
        </MusicContext.Provider>
    );
}