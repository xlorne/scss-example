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
* 全局的样式通过`StyleProvider`的方式进行引入
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadRootTheme, StyleProvider} from "./components/ConfigProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
// 通过loadRootTheme的方式加载全局的样式
const themeConfig = loadRootTheme();

root.render(
    <React.StrictMode>
        <StyleProvider theme={themeConfig}>
            <App/>
        </StyleProvider>
    </React.StrictMode>
);

reportWebVitals();

```
* 各自组件通过`React.useContext(StyleProviderContext)`的方式获取全局的样式
```javascript
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

    // 通过React.useContext(StyleProviderContext)的方式获取全局的样式定义
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
```
* 在组件中通过&变量名与@include的方式传递参数与公共的样式属性
```css
@use "../../styles/variable" as *;
@use "../../styles/mixins" as *;

.MyTable {

  .header-action {
    @include flex-right;
    margin-bottom: 10px;

    .item{
      margin: 0 10px;
    }

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

  .footer {
    @include flex-center;
  }

}
```
