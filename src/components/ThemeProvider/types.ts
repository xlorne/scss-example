export interface ThemeConfig {
    token: {

        colorPrimary?: string;

        contentFontSize?: string;

        MyTable?: {
            bodySortBg?: string;
            borderColor?: string;
            headerBg?: string;
        }
    }
}

/**
 * Dispatch对象，对应React的useState的dispatch函数能力
 */
export type Dispatch<T> = (updater: ((prevState: T) => T) | T) => void;

