import React from "react";
import {ConfigProvider, Table, ThemeConfig} from "antd";
import type {TableProps} from "antd/es/table/InternalTable";
import "./index.scss";
import classNames from "classnames";
import {StyleProviderContext} from "../ConfigProvider";

export interface MyTableProps<RecordType> {
    tableProps?: TableProps<RecordType>;
    action?: () => React.ReactNode[];
    footer?: React.ReactNode;
    size?: 'small' | 'middle' | 'large';
}

export const MyTable = <RecordType, >(props: MyTableProps<RecordType>) => {

    const themeConfig = React.useContext(StyleProviderContext);

    const colorPrimary = themeConfig.token.colorPrimary;

    const theme = {
        token: {
            colorPrimary: colorPrimary,
            Table: {
                bodySortBg: colorPrimary,
                borderColor: colorPrimary,
                headerBg: colorPrimary,
            }
        },
    } as ThemeConfig;

    const size = props.size || 'middle';

    const headerClassName = classNames('header-action', {
        'header-action--small': size === 'small',
        'header-action--middle': size === 'middle',
        'header-action--large': size === 'large',
    });

    return (
        <ConfigProvider theme={theme}>
            <div className={"MyTable"}>
                <div className={headerClassName}>
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