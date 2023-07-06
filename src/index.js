import React from "react";
import "antd/dist/antd.css";
import "./index.scss";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { render } from "react-dom";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
