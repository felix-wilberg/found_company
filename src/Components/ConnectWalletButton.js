import React from 'react';
import {useStore} from "./App";


//walletButton in navBar
const ConnectWalletButton = () => {
    //get states from globally used zustand store
    const currentAccount = useStore(state => state.currentAccount)
    const isLoggedIn = useStore(state => state.isLoggedIn)

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
        }
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            useStore.setState({currentAccount: accounts[0]})
            //set state to true to display the own address
            useStore.setState({isLoggedIn: true})

            console.log("Found account! Address: ", accounts[0]);
        }
        catch (err) {
            console.log(err);
        }
    }

    // change state of button as soon as wallet is connected, only show last 5 characters of address
    return (
        <button onClick={connectWalletHandler} className='btn connect-wallet-button btn-primary'>
            {isLoggedIn ?  'Your Account: ...' + currentAccount.substring(currentAccount.length-5, currentAccount.length) : 'Connect Wallet'}
        </button>
    )
}

export default ConnectWalletButton;

