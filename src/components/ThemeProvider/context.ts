import {Dispatch, ThemeConfig} from "./types";
import {CSSUtils} from "../../utils/css";

export class ThemeContext {

    private theme: ThemeConfig;
    private readonly dispatch: Dispatch<ThemeConfig>;

    constructor(theme: ThemeConfig,dispatch: Dispatch<ThemeConfig>) {
        this.theme = theme;
        this.dispatch = dispatch;
    }

    public getTheme = () => {
        return this.theme;
    }

    // 更新状态数据
    public syncTheme = (newState: ThemeConfig) => {
        this.theme = newState;
    }

    public setLargeFontSize = () => {
        const fontSize = CSSUtils.getRootVariable('--content-font-size-large');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    public setMiddleFontSize = ()=>{
        const fontSize = CSSUtils.getRootVariable('--content-font-size-middle');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    public setSmallFontSize = ()=>{
        const fontSize = CSSUtils.getRootVariable('--content-font-size-small');
        CSSUtils.setRootVariable('--content-font-size', fontSize);
        this.setFontSize(fontSize);
    }

    public setFontSize = (fontSize: string) => {
        console.log('fontSize',fontSize);
        this.dispatch((prevState) => {
            return {
                ...prevState,
                token: {
                    ...prevState.token,
                    contentFontSize: fontSize
                }
            }
        });
    }

}