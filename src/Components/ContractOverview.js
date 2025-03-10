import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBIcon, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { contractAddress } from "../utils/constants";
import { useStore } from "./App";
import { Loader, SuccessPayed } from "./index";



const ContractOverview = () => {

    //set local states used within this component
    const [isLoading, setIsLoading] = useState(false);
    const [isReceived, setIsReceived] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [companyBalance, setCompanyBalance] = useState('');
    const [companyMembers, setCompanyMembers] = useState([]);



    //all needed states from zustand useStore are imported
    const contractSigner = useStore((state)  => state.contractSigner);
    const contractProvider = useStore((state)  => state.contractProvider);


    //get company info based on the companyId
    const getCompanyInfo = async (e) => {
        e.preventDefault();
        console.log("Company Info Button wurde geklickt.")
        //get all data of the form
        const getCompany = new FormData(e.target);
        //try to get all information based on the companyId, in case no company exists throw the error
        try{
            const companyName = await contractProvider.getCompanyById(getCompany.get("companyId-2"));
            setCompanyName(companyName);
            const companyBalance = await contractProvider.getCompanyBalanceById(getCompany.get("companyId-2"));
            setCompanyBalance(companyBalance.toString());
            const companyMembers = [] = await contractProvider.getMembersById(getCompany.get("companyId-2"));
            setCompanyMembers(companyMembers);
        } catch (error) {
            alert(error);
        }

    };

    //pay share based on companyId
    const payShare = async (e) => {
        e.preventDefault();
        console.log("PayShare Button wurde geklickt.");

        //get all data of the form
        const share = new FormData(e.target);
        //check if all needed fields are filled
        if (!share.get("amountToPay") || !share.get("companyId")) {alert("Bitte fülle das Formular aus."); return;}
        //execute found company function, if company already exists, throw error alert
        try {
            setIsLoading(true); //turn on loading spinner
            await contractSigner.payShare(share.get("companyId"), {value: share.get("amountToPay")});
            contractSigner.on("Received", (value,addressSender,companyId, event) => {
                setIsLoading(false); //turn off loading spinner
                //set state to be displayed in SuccessPayed.js Component
                setIsReceived({value: value.toNumber(), addressSender: addressSender.toString(), companyId: companyId.toNumber(), txHash: event.transactionHash})
                return () => {
                    contractProvider.removeAllListeners("Received");
                }
            })
        }
        catch (error) {
            alert(error);
            setIsLoading(false)
        }

    }



    return (
        <MDBContainer>
            <div className='p-5' >
                <MDBRow size>
                    <MDBCol size='12'>
                        <div className='text-center'>
                            <h2 className='mb-5'>Gesellschaftervertrag</h2>
                        </div>
                    </MDBCol>
                    <MDBCol size='6'>
                        <label>Contract Address</label>
                        <MDBInput className='mb-3'
                            label={contractAddress}
                            placeholder= {contractAddress}
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <label>Company Name</label>
                        <MDBInput className='mb-3'
                                  label={companyName}
                                  placeholder= {companyName}
                                  id='formControlReadOnly'
                                  type='text'
                                  disabled
                        />
                        <label>
                            Kontostand
                        </label>
                        <MDBInput className='mb-3'
                            label= {companyBalance}
                            placeholder= {companyBalance}
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <label>Gesellschafter</label>
                        <MDBInput
                            className='mb-3'
                            placeholder='address'
                            label={companyMembers[0]}
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <MDBInput
                            className='mb-3'
                            placeholder='address'
                            label={companyMembers[1]}
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <MDBInput
                            className='mb-3'
                            placeholder='address'
                            label={companyMembers[2]}
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                    </MDBCol>
                    <MDBCol size='1'>
                    </MDBCol>

                    <MDBCol size='5'>
                        <div>Einzahlung</div>
                        <form onSubmit={payShare}>
                            <MDBInput className='mb-3' label='Wei einzahlen' placeholder="Wei" name="amountToPay" type='number'  />
                            <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyId" type='number'  />

                            {/*turn on loading spinner based on state isLoading, else show button*/}
                            {isLoading
                                ? <Loader />
                                : (
                                    <div >
                                        <MDBIcon fab icon="ethereum" className='mr-3'/>
                                        <MDBBtn type='submit'>Einzahlen</MDBBtn><br/><br/>
                                    </div>
                                )
                            }

                        </form>

                        <form onSubmit={getCompanyInfo}>
                            <br/>
                            <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyId-2" type='number'  />
                            <MDBIcon icon="address-card" className='mr-3'/>
                            <MDBBtn type='submit' >Company Info laden </MDBBtn>
                        </form>
                        {/*if isReceived is true, show Component SuccessPayed.js*/}
                        {isReceived !== null
                            && <SuccessPayed isReceived={isReceived}/>
                        }
                    </MDBCol>
                </MDBRow>

            </div>
        </MDBContainer>
    );
}
export default ContractOverview;