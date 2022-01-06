import React from "react";
import { Drizzle } from "@drizzle/store";
import ReactDOM from "react-dom";
import App from "./App.js";
import drizzleOptions from './drizzleOptions'


const drizzle = new Drizzle(drizzleOptions);
ReactDOM.render(<App drizzle={drizzle}/>, document.getElementById("root"));

