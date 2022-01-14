import Web3 from "web3";
//import Company from './contracts/Company.sol'
// import ComplexStorage from "./contracts/ComplexStorage.json";
import SimpleStorage from "./contracts/SimpleStorage.sol";
// import TutorialToken from "./contracts/TutorialToken.json";


const drizzleOptions = {
    web3: {
        block: false,
        customProvider: new Web3("ws://localhost:7545"),
    },
    contracts: SimpleStorage,
    events: {
        SimpleStorage: ["StorageSet"]
    },
};

export default drizzleOptions;
