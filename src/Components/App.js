import React, { useEffect} from "react";
import create from "zustand";
import "./App.css";
import Main from "./Main";
// import SimpleStorage from "../abis/SimpleStorage.json";
//import { MDBBtn} from "mdb-react-ui-kit";
import Navbar from "./Navbar";


//All states are saved within this store
export const useStore = create(set => ({
    currentAccount: '',
    isLoggedIn: false,
}))


function App(){

    useEffect( () => {
            checkWalletIsConnected()
                .then(r => {console.log(r)});
        },[],
    )

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
        }
        else {
            console.log("Wallet exists. Let's go.")
        }

        const accounts = await ethereum.request({method: 'eth_accounts'})
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            useStore.setState({currentAccount: accounts[0]})
            useStore.setState({isLoggedIn: true})
        } else {
            console.log("No authorized account found.")
        }
    }





    return (
        <>
            <Navbar />
            <Main />
        </>
    );
}

export default App;

