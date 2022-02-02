import React from 'react';
import {ethers} from "ethers";
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import { contractABI, contractAddress } from "../utils/constants";
import {useStore} from "./App";
import { TxList } from "./index";



const Form = () => {
    // const currentAccount = useStore(state => state.currentAccount)
    // const companyName = useStore(state => state.companyName)
    // const amountShareHolders = useStore(state => state.amountShareHolders)
    // const foundingCapital = useStore(state => state.foundingCapital)
    // const contractInfo = useStore(state => state.contractInfo)
    const txs = useStore(state => state.txs)

    const handleTransfer = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const companyContract = new ethers.Contract(contractAddress, contractABI, signer);
        await companyContract.found(data.get("companyName"), data.get("foundingCapital"), data.get("amountShareholders"));
    };

    return (
        <div>
        <MDBContainer>
            <form onSubmit={handleTransfer}>
                <MDBRow>
                    <MDBCol>
                        <MDBInput className='mb-3' label='Firmenname' placeholder="Firmenname" name="companyName" type='text'  />
                        <MDBInput className='mb-3' label='Firmensitz' placeholder="Firmensitz" name="city" type='text'  />
                        <MDBInput className='mb-3' label='Geschäftsführer' placeholder="Geschäftsführer" name="managingDirector" type='text'  />
                        <MDBInput className='mb-3' label='Anteile' placeholder="Anteile" name="amountShareholders" type='number'  />

                    </MDBCol>
                    <MDBCol>
                        <MDBInput className='mb-3' label='Stammkapital' placeholder="Stammkapital" id='text' name="foundingCapital" type='number'  />
                        <MDBInput className='mb-3' label='Gegenstand der Firma' placeholder="Gegenstand der Firma" name="companyWhy" id='textarea' textarea rows={3}  />

                        <MDBBtn type='submit' >Bestätigen</MDBBtn>

                    </MDBCol>
                </MDBRow>
            </form>
            <MDBRow>
                <TxList txs={txs} />
            </MDBRow>
        </MDBContainer>
        </div>

    );
}

export default Form;
