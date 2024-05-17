import { checkUpdate, installUpdate, onUpdaterEvent } from "@tauri-apps/api/updater";
import BarBottonMain from "../components/BarBottonMain/BarBottonMain";
import BarTopMain from "../components/BarTopMain/BarTopMain";
import {useEffect} from "react";
import { toast } from "sonner";
import { relaunch } from "@tauri-apps/api/process";

function Main(){

    async function update(){
        await onUpdaterEvent(({error, status})=>{
            console.log("no mames",error,status);
        });
        try{
            const {shouldUpdate , manifest} = await checkUpdate();
            if(!shouldUpdate) return;
            toast.loading(`Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`)
            await installUpdate();
            await relaunch();
        }catch(e){
            //toast.error("Error al actualizar "+e);
            console.log(e);
        }
    }

    useEffect(()=>{
        update();
    },[]);

    return(
        <>
            <BarTopMain />
            <BarBottonMain />
        </>
    );
}

export default Main;