import {useContext, createContext, useState, useRef} from "react";
import {readDir} from "@tauri-apps/api/fs"
import {audioDir, join} from "@tauri-apps/api/path";
import {convertFileSrc} from "@tauri-apps/api/tauri"

const MusicContext = createContext({} as any);

export const useMusic = ()=>{
    return useContext(MusicContext);
}

export const MusicProvider = ({children} : {children: React.ReactNode})=>{
    const [Music, setMusic] =  useState([{name: "", path: "", statue: false}]);
    const [Play, setPlay] = useState(false);
    const [Index, setIndex] = useState(0);
    const audioRef = useRef(null);
    async function getMusic(){
        const router = await audioDir();
        let data = await readDir(router);
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

    return(
        <MusicContext.Provider value={{getMusic, Music, PlayMusic, ControlMusic, NextMusic, BackMusic, FilterMusic, Play, audioRef}}>
            {children}
        </MusicContext.Provider>
    );
}