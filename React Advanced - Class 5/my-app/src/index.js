import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



// React.StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants. Strict mode checks are run in development mode only; they do not impact the production build.
const root = ReactDOM.createRoot(document.getElementById('parent'));
root.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
