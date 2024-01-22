import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import App from "./App";

const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  background: #050816;
  color: white;
  all: unset;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
