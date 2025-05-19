import React from "react";
import {ConfigProvider} from "antd";
import {CSSUtils} from "../../utils/css";


export interface ThemeConfig{
    token: {

        colorPrimary?: string;

        contentFontLargeSize?: string;
        contentFontMiddleSize?: string;
        contentFontSmallSize?: string;

        Table?: {
            bodySortBg?: string;
            borderColor?: string;
            headerBg?: string;
        }
    }
}

interface StyleProviderProps{
    children: React.ReactNode;
    theme: ThemeConfig
}

export const StyleProviderContext = React.createContext<ThemeConfig>({} as ThemeConfig);


export const loadRootTheme = ()=> {
    return {
        token: {
            colorPrimary: CSSUtils.getRootVariable('--primary-color'),
            contentFontLargeSize: CSSUtils.getRootVariable('--content-font-size-large'),
            contentFontMiddleSize: CSSUtils.getRootVariable('--content-font-size-middle'),
            contentFontSmallSize: CSSUtils.getRootVariable('--content-font-size-small'),
        }
    };
}

export const StyleProvider:React.FC<StyleProviderProps>=(props)=>{
    return (
        <StyleProviderContext.Provider value={props.theme}>
            <ConfigProvider theme={props.theme}>
                {props.children}
            </ConfigProvider>
        </StyleProviderContext.Provider>
    )
}