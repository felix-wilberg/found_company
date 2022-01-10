import Company from './contracts/Company.sol'


const drizzleOptions = {
/*    web3: {
        block: false,
        fallback: {
            type: 'ws',
            url: 'ws://127.0.0.1:7545'
        }
    },*/
    contracts: [
        Company
    ],
    events: {
        Company: ["CompanySet"],
    },
    polls: {
        accounts: 1500
    }
}

export default drizzleOptions