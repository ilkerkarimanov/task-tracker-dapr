import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { store } from './store'
import {Provider} from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Bootstrapper from "./bootstrapper";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

Bootstrapper.initApp().then(() => {
    setTimeout(() => {
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }, 1000);
});

root.render(<div>Please wait, still loading...</div>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
