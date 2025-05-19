import React, {useEffect, useMemo} from "react";
import {ConfigProvider} from "antd";
import {CSSUtils} from "../../utils/css";
import {ThemeContext} from "./context";
import {ThemeConfig} from "./types";


interface ThemeProviderProps {
    children: React.ReactNode;
    theme: ThemeConfig
}

export const loadRootTheme = () => {
    return {
        token: {
            colorPrimary: CSSUtils.getRootVariable('--primary-color'),
            contentFontSize: CSSUtils.getRootVariable('--content-font-size-middle'),
        }
    } as ThemeConfig;
}

export const ThemeProviderContext = React.createContext<ThemeContext | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {

    const currentTheme = useMemo(()=>{
        return loadRootTheme();
    },[])

    const [theme, dispatch] = React.useState<ThemeConfig>(currentTheme);

    const themeContextRef = React.useRef<ThemeContext>(null);
    if (!themeContextRef.current) {
        themeContextRef.current = new ThemeContext(theme, dispatch);
    }

    useEffect(() => {
        themeContextRef.current?.syncTheme(theme);
    }, [theme]);

    console.log('reload theme');

    return (
        <ThemeProviderContext.Provider value={themeContextRef.current}>
            <ConfigProvider theme={props.theme}>
                {props.children}
            </ConfigProvider>
        </ThemeProviderContext.Provider>
    )
}