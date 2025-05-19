# SCSS 样式控制实例说明

## 项目CSS样式控制方式

* 采用scss方式控制样式
```
    src
        components
            Table
                 index.scss // 组件样式
                 index.tsx  // 组件代码
        styles
            index.scss      // 全局样式
            variables.scss  // 全局变量
            mixins.scss     // 全局公共样式
    index.ts                // 入口文件
```
* 通过:root定义全局的样式参数
```css

:root {
    --primary-color: #81d11c;
    --body-background-color: #fdfdfd;

    --content-font-size-large: 24px;
    --content-font-size-middle: 16px;
    --content-font-size-small: 12px;
}

body {
  margin: 0;
  padding: 0;
  /** 通过var的方式访问:root下的参数定义  **/
  background-color: var(--body-background-color);
}

```
* 全局的样式通过`ThemeProvider`的方式进行引入
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadRootTheme, ThemeProvider} from "./components/ThemeProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const themeConfig = loadRootTheme();

root.render(
    <React.StrictMode>
        <ThemeProvider theme={themeConfig}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();


```
* 各自组件通过`React.useContext(ThemeProviderContext)`的方式获取全局的样式
```javascript
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
```
* 在组件中通过&变量名与@include的方式传递参数与公共的样式属性
```css
@use "../../styles/variable" as *;
@use "../../styles/mixins" as *;

.MyTable {


    .header-title{
        &--large {
            font-size: $content-font-size-large;
        }

        &--medium {
            font-size: $content-font-size-middle;
        }

        &--small {
            font-size: $content-font-size-small;
        }
    }

    .header-action {
        @include flex-right;
        margin-bottom: 10px;

        .item{
            margin: 0 10px;
        }
    }

    .footer {
        @include flex-center;
    }


}
```
