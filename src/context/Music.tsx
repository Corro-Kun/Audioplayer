import {useContext, createContext, useState, useRef} from "react";
import {invoke} from "@tauri-apps/api/tauri"
import {convertFileSrc} from "@tauri-apps/api/tauri"
//import {toast} from "sonner";
import { list_music } from "../interface/main";
import { OpeDurations } from "../lib/MusicOpe";

const MusicContext = createContext({} as any);

export const useMusic = ()=>{
    return useContext(MusicContext);
}

export const MusicProvider = ({children} : {children: React.ReactNode})=>{
    const [Music, setMusic] =  useState([{name: "", path: "", statue: false}]);
    const [Play, setPlay] = useState(false);
    const [Index, setIndex] = useState(0);
    const InputMusic = useRef(null);

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
    
    function handleKeyDown(e: any){
        /*
        if(e.key === " " || e.key === "MediaPlayPause"){
            ControlMusic();
        }else if(e.key === "MediaTrackNext"){
            NextMusic();
        }else if(e.key === "MediaTrackPrevious"){
            BackMusic();
        }
        */
       
    }

    function changerKey(){
       document.addEventListener("keydown", handleKeyDown);
    }

    function deleteChangerKey(){
        document.removeEventListener("keydown", handleKeyDown);
    }

    async function PlayMusic(i: number){
        try {
            const url = convertFileSrc(Music[i].path);
            const audio = document.getElementById("audio") as HTMLAudioElement;
            const source = document.getElementById("source") as HTMLSourceElement;
            source.src = url;
            audio.load();

            const handleEnded = () => {
                audio.removeEventListener('ended', handleEnded);
                const nextIndex = (i + 1) % Music.length;
                PlayMusic(nextIndex);
            }

            audio.addEventListener('ended', handleEnded);

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
            //toast.error("Error" + error);
        }
    }

    async function ControlMusic(){
        const audio = document.getElementById("audio") as HTMLAudioElement;
        if(Play){
            audio.pause();
            setPlay(false);
        }else{
            //audio.play();
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
        setListMusic(false);
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
 
    const [durtationInput, setDurationInput] = useState(0.0);
    const [durationInputMax, setDurationInputMax] = useState(0.0);

    const updateTime = () => {
        const audio = document.getElementById("audio") as HTMLAudioElement;

        const currentTimeInSeconds = audio.currentTime;

        const duration = audio.duration;
        setDurationInput(currentTimeInSeconds);
        setDurationInputMax(duration);

        setDuration(OpeDurations(currentTimeInSeconds) + " | " + OpeDurations(duration));
    };

    function changeVolume({target:{value}}: {target: {value: number}}){
        const audio = document.getElementById("audio") as HTMLAudioElement;
        setVolume(value);
        audio.volume = volume;
    }

    function changeDuration({target:{value}}: {target: {value: number}}){
        const audio = document.getElementById("audio") as HTMLAudioElement;
        audio.pause();
        setDurationInput(value);
        audio.currentTime = value;
        audio.play();
        setPlay(true);
    }

    // state para el estado de las listas

    const [listMusic, setListMusic] = useState(false);
    const [CloseAnimation, setCloseAnimation] = useState(false);

    function ChangerStateListMusic(){
        if(listMusic === true){
            setListMusic(!listMusic);
            setCloseAnimation(!CloseAnimation);
        }
        else if(listMusic === false){
            setCloseAnimation(!CloseAnimation);
            setTimeout(()=>{
                setListMusic(!listMusic);
            },400);
        }
    }



    return(
        <MusicContext.Provider value={{getMusic, Music, PlayMusic, ControlMusic, NextMusic, BackMusic, FilterMusic, Play, changeVolume, updateTime, duration, volume, listMusic, ChangerStateListMusic, durtationInput, durationInputMax, changeDuration, InputMusic, CloseAnimation, changerKey, deleteChangerKey}}>
            {children}
        </MusicContext.Provider>
    );
}