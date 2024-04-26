import {useContext, createContext, useState} from 'react';
import {invoke} from "@tauri-apps/api/tauri";
import { Color } from '../interface/main';

export const ConfigContext = createContext({});

export function useConfig() {
    return useContext(ConfigContext);
}

export function ConfigProvider({children}: any) {
    const [save, setSave] = useState(false);
    const [color, setColor] = useState<Color[]>([]);

    async function getColor(){
        let data: Color[] = await invoke("get_color_db");
        data.forEach((element: Color) => {
            document.documentElement.style.setProperty(element.name, element.color);
        });
        setColor(data);
    }

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

    async function Save(){
        await invoke("save_color_db", {colors: color});
        setSave(false);
    }

    return (
        <ConfigContext.Provider value={{ChangerColorLabel, ChangerColorBorder, ChangerColorShadow, getColor, save, Save}}>
            {children}
        </ConfigContext.Provider>
    );
}