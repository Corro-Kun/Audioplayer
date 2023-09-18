import {useContext, createContext, useState} from "react";
import {readDir} from "@tauri-apps/api/fs"
import {audioDir} from "@tauri-apps/api/path";

const MusicContext = createContext({} as any);

export const useMusic = ()=>{
    return useContext(MusicContext);
}

export const MusicProvider = ({children} : {children: React.ReactNode})=>{
    const [Music, setMusic] =  useState([]);
    async function getMusic(){
        const router = await audioDir();
        const data = await readDir(router);
        setMusic(data);
    }
    return(
        <MusicContext.Provider value={{getMusic, Music}}>
            {children}
        </MusicContext.Provider>
    );
}