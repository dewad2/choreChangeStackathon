import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import Routes from "./routes";

ReactDOM.render(
  <Router history={history}>
    <Routes />
  </Router>,
  document.getElementById("app")
);
