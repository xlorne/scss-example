import React, {useMemo} from "react";
import {Button, ConfigProvider, Table, ThemeConfig} from "antd";
import type {TableProps} from "antd/es/table/InternalTable";
import "./index.scss";
import classNames from "classnames";
import {ThemeProviderContext} from "../ThemeProvider";

export interface MyTableProps<RecordType> {
    tableProps?: TableProps<RecordType>;
    action?: () => React.ReactNode[];
    footer?: React.ReactNode;
    title?: string;
    size?: 'small' | 'middle' | 'large';
}

export const MyTable = <RecordType, >(props: MyTableProps<RecordType>) => {

    const [version, setVersion] = React.useState(0);

    const themeContext = React.useContext(ThemeProviderContext);

    const theme = useMemo(() => {
        const colorPrimary = themeContext?.getTheme().token.colorPrimary;
        return {
            token: {
                colorPrimary: colorPrimary,
                Table: {
                    bodySortBg: themeContext?.getTheme().token.MyTable?.bodySortBg,
                    borderColor: themeContext?.getTheme().token.MyTable?.borderColor,
                    headerBg: themeContext?.getTheme().token.MyTable?.headerBg,
                    cellFontSize: themeContext?.getTheme().token.contentFontSize,
                }
            },
        } as ThemeConfig;
    }, [version]);

    console.log('MyTable theme:', theme);

    const size = props.size || 'middle';

    const headerClassName = useMemo(() => {
        return classNames('header-title', {
            'header-title--small': size === 'small',
            'header-title--middle': size === 'middle',
            'header-title--large': size === 'large',
        });
    }, [size])

    return (
        <ConfigProvider theme={theme}>
            <div className={"MyTable"}>
                <div className={"header-action"}>
                    <div className={headerClassName}>
                        {props.title}
                    </div>
                    {props.action && props.action().map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className={"item"}
                            >
                                {item}
                            </div>
                        )
                    })}

                    <Button
                        type={"primary"}
                        onClick={() => {
                            setVersion(version + 1);
                        }}
                    >Reload</Button>
                </div>
                <Table
                    {...props.tableProps}
                />
                <div className={"footer"}>
                    {props.footer}
                </div>
            </div>
        </ConfigProvider>
    )
}