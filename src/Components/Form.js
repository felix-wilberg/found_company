import React from 'react';
import {ethers} from "ethers";
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
//contract importieren

export default function Form() {

/*    const contracthandler = async () => {
        try {
            const {ethereum} = window;

            //contract deployen und adresse speichern

            //contract abi aus import erhalten

            if (ethereum) {
                // A Web3Provider wraps a standard Web3 provider, which is
                // what MetaMask injects as window.ethereum into each page
                const provider = new ethers.providers.Web3Provider(ethereum);

                // The MetaMask plugin also allows signing transactions to
                // send ether and pay to change state within the blockchain.
                // For this, you need the account signer...
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                console.log("Initializing contract");
                let nftTxn = contract.mintNFTs(1, {value: ethers.utils.parseEther("0.01") });

                console.log("Parsing Contract");
                await nftTxn.wait();

                console.log('Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}');
            } else {
                console.log("Ethereum object does not exist");
            }
        }
        catch (err) {
            console.log(err);
        }
    }*/

    return (
        <div>
        <MDBContainer>
            <form>
                <MDBRow>
                    <MDBCol>
                        <MDBInput label="Firmenname" id='form1' type='text' />
                        <MDBInput label="Firmensitz" id='text' type='text' />
                        <MDBInput label="Geschäftsführer" id='text' type='text' />
                        <MDBInput label="Anteile" id='text' type='text' />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput label="Stammkapital" id='text' type='number' />
                        <MDBInput label="Gegenstand der Firma" id='textarea' textarea rows={4} />

                        <MDBBtn type='submit'>Bestätigen</MDBBtn>

                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
        </div>

    );
}
