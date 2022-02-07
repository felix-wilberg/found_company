import React, { useEffect} from "react";
import { ethers } from "ethers";
import create from "zustand";
import { contractABI, contractAddress } from "../utils/constants";

import "./App.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { HeroSection, Navbar, Main} from "./index";



//All states are saved within this store
export const useStore = create((set) => ({
    currentAccount: '',
    isLoggedIn: false,
    isLoading: false,
    isFounded: false,
    address: null,
    txs: [
        { companyId: null, name: '', foundingCapitalGoal: 0, memberAmount: 0, txHash: null }
    ],
    contractSigner: null, //for read only
    contractProvider: null, //for writing to blockchain
    companyName: '',
    companyBalance: '',
    companyMembers: [],
    companyId: '',
    amountShareHolders: 0,
    foundingCapital: 0,
    contractInfo: [
        { governance: null, amountShareHolders: 0, foundingCapital: 0 }
    ],
    formData: [
        { companyName: '', name: "" }
    ],
    balanceInfo: [
        { companyId: null, address: '', balance: 0 }
    ],
    companyInfo:[
        { companyId: null, name: '', foundingCapitalGoal: 0, memberAmount: 0, txHash: null }
   ],
    addCompanyInfo: (company) =>
        set((state) => ({
            companyInfo: [
                { companyId: company.companyId, name: company.name, foundingCapitalGoal: company.foundingCapitalGoal, memberAmount: company.memberAmount },
                ...state.companyInfo,
            ]})),
}))


const App = () => {
    const {ethereum} = window;
    const contractProvider = useStore((state) => state.contractProvider);
    const contractSigner = useStore((state) => state.contractSigner);


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


    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const companyContractSigner = new ethers.Contract(contractAddress, contractABI, signer);
        useStore.setState({contractSigner: companyContractSigner})
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

