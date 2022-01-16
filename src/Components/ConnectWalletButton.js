import React from 'react';
import {useStore} from "./App";


const ConnectWalletButton = () => {

    const currentAccount = useStore(state => state.currentAccount)
    console.log(currentAccount);
    const isLoggedIn = useStore(state => state.isLoggedIn)

    const connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Please install MetaMask!");
        }
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            useStore.setState({currentAccount: accounts[0]})
            useStore.setState({isLoggedIn: true})
            console.log("Found account! Address: ", accounts[0]);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <button onClick={connectWalletHandler} className='btn connect-wallet-button btn-primary'>
            {isLoggedIn ?  'Your Account: ...' + currentAccount.substring(currentAccount.length-5, currentAccount.length) : 'Connect Wallet'}
        </button>
    )
}

export default ConnectWalletButton;

