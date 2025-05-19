import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadRootTheme, StyleProvider} from "./components/ConfigProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const themeConfig = loadRootTheme();

root.render(
    <React.StrictMode>
        <StyleProvider theme={themeConfig}>
            <App/>
        </StyleProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
