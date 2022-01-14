import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./Main";
import SimpleStorage from "../abis/SimpleStorage.json";
import { MDBBtn} from "mdb-react-ui-kit";
import Navbar from "./Navbar";





function App(){


    const connectWalletHandler = () => { }


    const checkWalletIsConnected = () => { }



    const mintNftHandler = () => { }



    useEffect( () => {
            checkWalletIsConnected();
        },[],
    )


    return (
        <>
            <Navbar

                onConnectWalletHandler={connectWalletHandler}
            />
            <Main />
        </>
    );
}

export default App;
