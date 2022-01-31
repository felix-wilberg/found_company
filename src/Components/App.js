import React, { useEffect} from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import create from "zustand";
import { contractABI, contractAddress } from "../utils/constants";

import "./App.css";
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { HeroSection, Navbar, Main} from "./index";

import * as net from "net";



//All states are saved within this store
export const useStore = create(set => ({
    currentAccount: '',
    isLoggedIn: false,
    address: null,
    contract: null,
}))


function App() {
    const address = useStore(state => state.address);
    const contract = useStore(state => state.contract);
    const {ethereum} = window;


    useEffect(() => {
            checkWalletIsConnected()
                .then(r => {
                    console.log(r)
                });
            loadBlockchainData()
                .then(r => {
                    console.log(r)
                });
        }, [],
    )


    const checkWalletIsConnected = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
        } else {
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

    const loadBlockchainData = async () => {
        // const web3 = window.web3;
        //const networkId = await window.web3.eth.getId();
        // const networkData = Company.networks[networkId];
        // if (networkData) {
        //     const address = networkData.address;
        //     useStore.setState({address: address})
        // }
    };


    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
        useStore.setState({contract: transactionsContract})

        return transactionsContract;
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

