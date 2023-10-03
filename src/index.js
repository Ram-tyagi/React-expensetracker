import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap";

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './Components/Store/ContextProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

