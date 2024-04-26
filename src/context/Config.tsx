import {useContext, createContext} from 'react';

export const ConfigContext = createContext({});

export function useConfig() {
    return useContext(ConfigContext);
}

export function ConfigProvider({children}: any) {

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

    return (
        <ConfigContext.Provider value={{ChangerColorLabel, ChangerColorBorder, ChangerColorShadow}}>
            {children}
        </ConfigContext.Provider>
    );
}