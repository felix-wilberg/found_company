import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import App from "./Components/App.js";
import * as serviceWorker from './serviceWorker';
//import { CompanyProvider} from "./context/CompanyContext";


ReactDOM.render(
    //<CompanyProvider>
        <App />
    //</CompanyProvider>
    ,document.getElementById("root"));

serviceWorker.unregister();

