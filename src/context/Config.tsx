import {useContext, createContext, useState} from 'react';
import {invoke} from "@tauri-apps/api/tauri";
import { Color, Config } from '../interface/main';

export const ConfigContext = createContext({});

export function useConfig() {
    return useContext(ConfigContext);
}

export function ConfigProvider({children}: any) {
    const [save, setSave] = useState(false);
    const [color, setColor] = useState<Color[]>([]);
    const [config, setConfig] = useState<Config[]>([]);

    async function getColor(){
        let data: Color[] = await invoke("get_color_db");
        data.forEach((element: Color) => {
            document.documentElement.style.setProperty(element.name, element.color);
        });
        setColor(data);
    }

    async function getConfig() {
        let data: Config[] = await invoke("get_config_db");
        data.forEach((element: Config) => {
            document.documentElement.style.setProperty(element.name, element.value);
            if (element.id.toString() === "1") {
                setOpacity(Number(element.value.replace("px", "")));
 
            }else if (element.id.toString() === "2") {
                setShadow(Number(element.value.replace("px", "")));
            }else if (element.id.toString() === "3") {
                setSmoothPrimary(Number(element.value.replace("px", "")));
            }
        });
        setConfig(data);
        const Opacity = document.getElementById("Opacity") as HTMLInputElement;
        const Density = document.getElementById("Density") as HTMLInputElement;
        const Smooth = document.getElementById("smooth") as HTMLInputElement;

        Opacity.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Opacity.value) / Number(Opacity.max) * 100}%, var(--Background_Color) ${Number(Opacity.value) / Number(Opacity.max) * 100}%, var(--Background_Color) 100%)`;
        Density.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Density.value) / Number(Density.max) * 100}%, var(--Background_Color) ${Number(Density.value) / Number(Density.max) * 100}%, var(--Background_Color) 100%)`;
        Smooth.style.background = `linear-gradient(to right, var(--Text_Color) 0%, var(--Text_Color) ${Number(Smooth.value) / Number(Smooth.max) * 100}%, var(--Background_Color) ${Number(Smooth.value) / Number(Smooth.max) * 100}%, var(--Background_Color) 100%)`;
 
    }

    function ChangerColor({target: {value, name}}: {target: {value: string, name: string}}){
        setColor(color.map((data: Color)=>{
            if(data.id.toString() === name){
                confirm("funciona el if");
                document.documentElement.style.setProperty(data.name, value);
                setSave(true);
                data.color = value;
            }
            return data;
        }));
    }

    /*
     // funcion para cambiar el color de las letras
    function ChangerColorLabel({target: {value}}: any){
        document.documentElement.style.setProperty("--Text_Color", value);
        setSave(true);
        setColor(color.map((element: Color) => {
            if(element.name === "--Text_Color"){
                element.color = value;
            }
            return element;
        }));
    }

    // funcion para cambiar el color de los bordes
    function ChangerColorBorder({target: {value}}: any){
        document.documentElement.style.setProperty("--Border_Color", value);
        setSave(true);
        setColor(color.map((element: Color) => {
            if(element.name === "--Border_Color"){
                element.color = value;
            }
            return element;
        }));
    }

    // funcion para cambiar el color de los bordes
    function ChangerColorShadow({target: {value}}: any){
        document.documentElement.style.setProperty("--Shadow_Color", value);
        setSave(true);
        setColor(color.map((element: Color) => {
            if(element.name === "--Shadow_Color"){
                element.color = value;
            }
            return element;
        }));
    }

    */
    async function Save(){
        await invoke("save_color_db", {colors: color});
        await invoke("save_config_db", {configs: config});
        setSave(false);
    }

    const [opacity, setOpacity] = useState(0);

    function changerOpacity({target: {value, name}}: any){
        document.documentElement.style.setProperty("--Blur_Px", value+"px");
        setOpacity(value);
        setConfig(config.map((element: Config) => {
            if(element.id.toString() === name){
                element.value = value+"px";
            }
            return element;
        }));
        setSave(true);
    }

    const [shadow, setShadow] = useState(0);

    function changerShadow({target: {value, name}}: any){
        document.documentElement.style.setProperty("--Shadow_Px", value+"px");
        setShadow(value);
        setConfig(config.map((element: Config) => {
            if(element.id.toString() === name){
                element.value = value+"px";
            }
            return element;
        }));
        setSave(true);
    }

    const [smoothPrimary, setSmoothPrimary] = useState(0);

    function changerSmoothPrimary({target: {value, name}}: any){
        document.documentElement.style.setProperty("--Border_Radio_Px_Primary", value+"px");
        setSmoothPrimary(value);
        setConfig(config.map((element: Config) => {
            if(element.id.toString() === name){
                element.value = value+"px";
            }
            return element;
        }));

        setSave(true);
    }

    return (
        <ConfigContext.Provider value={{/*ChangerColorLabel, ChangerColorBorder, ChangerColorShadow,*/ getColor, save, Save,  ChangerColor, changerOpacity, opacity, changerShadow, shadow, smoothPrimary, changerSmoothPrimary, getConfig}}>
            {children}
        </ConfigContext.Provider>
    );
}