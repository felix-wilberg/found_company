import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import App from "./Components/App.js";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
        <App />,
    document.getElementById("root"));

serviceWorker.unregister();