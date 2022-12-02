import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { makeServer } from "./api/fakeAPI/server"

// Mock Server Connect
if (Boolean(process.env.REACT_APP_FAKEAPI_ENABLED)) {
    const processEnv = process.env.NODE_ENV;
    if (processEnv === "development" || processEnv === "test") {
        makeServer({ environment: processEnv });
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();
