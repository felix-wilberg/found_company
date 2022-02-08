import React, { useEffect } from "react";
import { HeroSection, Navbar, Main } from "./index";
import { ethers } from "ethers";
import create from "zustand";
import { contractABI, contractAddress } from "../utils/constants";
import "./App.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


//All states are saved within this store
export const useStore = create((set) => ({
    currentAccount: '', //needed for navBar
    isLoggedIn: false, //needed for navBar
    contractSigner: null, //for read only
    contractProvider: null, //for writing to blockchain
}))


const App = () => {
    const {ethereum} = window;

    //run those functions with startup
    useEffect(() => {
            checkWalletIsConnected()
                .then(r => {
                    console.log(r)
                });
            createEthereumContract();
        }, [],
    )


    const checkWalletIsConnected = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
        } else {
            console.log("Wallet exists. Let's go.")
        }

        //save account from metamask in const
        const accounts = await ethereum.request({method: 'eth_accounts'})
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            //set current account in state and set it ture, so button can show address
            useStore.setState({currentAccount: accounts[0]})
            useStore.setState({isLoggedIn: true})
        } else {
            console.log("No authorized account found.")
        }
    }

    //takes the contractaddress and creates a contract instance to interact with
    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        //signer is for writing access on contract
        const companyContractSigner = new ethers.Contract(contractAddress, contractABI, signer);
        useStore.setState({contractSigner: companyContractSigner})
        //provider is for reading access on contract
        const companyContractProvider = new ethers.Contract(contractAddress, contractABI, provider);
        useStore.setState({contractProvider: companyContractProvider})
    };


    return (
        <>
            <Navbar/>
            <HeroSection/>
            <Main/>
        </>
    );

}

export default App;