import React from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBIcon, MDBCol, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { contractABI, contractAddress } from "../utils/constants";
import {useStore} from "./App";
import {ethers} from "ethers";
import {overrides} from "tailwindcss/prettier.config";


const ContractOverview = () => {

    const companyName = useStore((state)  => state.companyName);
    const companyBalance = useStore((state)  => state.companyBalance);
    const companyMembers = useStore((state)  => state.companyMembers);
    const contractSigner = useStore((state)  => state.contractSigner);
    const contractProvider = useStore((state)  => state.contractProvider);

    const getCompanyInfo = async (e) => {
        e.preventDefault();
        console.log("Company Info Button wurde geklickt.")
        const getCompany = new FormData(e.target);
        try{
            const companyName = await contractProvider.getMyCompanyById(getCompany.get("companyId-2"));
            useStore.setState({companyName: companyName});
            const companyBalance = await contractProvider.getCompanyBalanceById(getCompany.get("companyId-2"));
            useStore.setState({companyBalance: companyBalance.toString()});
            const companyMembers = [] = await contractProvider.getMembers(getCompany.get("companyId-2"));
            useStore.setState({companyMembers: companyMembers});
        } catch (error) {
            alert(error);
        }

    };

    const payShare = async (e) => {
        e.preventDefault();
        console.log("PayShare Button wurde geklickt.");

        //get all data of the form
        const share = new FormData(e.target);
        //check if all needed fields are filled
        if (!share.get("amountToPay") || !share.get("amountToPay")) {alert("Bitte fülle das Formular aus."); return;}
        //execute found company function, if company already exists, throw error alert
        try { await contractSigner.payShare(share.get("amountToPay"), {value: share.get("amountToPay")});}
        catch (error) {
            alert(error);
        }
    }



    return (
        <MDBContainer>
            <div className='p-5' >
                <MDBRow size>
                    <MDBCol size='12'>
                        <div className='text-center'>
                            <h2 className='mb-5'>Gesellschaftervertrag XY</h2>
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
                        <MDBInput className='mb-3'
                                  placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                                  label={companyMembers[0]}
                                  id='formControlReadOnly'
                                  type='text'
                                  disabled
                        />
                        <MDBInput className='mb-3'
                                  placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                                  label={companyMembers[1]}
                                  id='formControlReadOnly'
                                  type='text'
                                  disabled
                        />
                        <MDBInput
                                label={companyMembers[2]}
                                id='formControlReadOnly'
                                type='text'
                                disabled
                        />
                    </MDBCol>
                    <MDBCol size='1'>
                    </MDBCol>
                    <MDBCol size='5'>
                        <div>Status</div>
                        <MDBCheckbox name='disabledCheck' value='' id='flexCheckDisabled' disabled label='unterzeichnet' />
                        <MDBCheckbox name='disabledCheck' value='' id='flexCheckCheckedDisabled' defaultChecked disabled label='in Bearbeitung' />
                        <MDBIcon className='mt-5 mr-3' fas icon="download" />
                        <MDBBtn>Vertrag herunterladen</MDBBtn><br/><br/>
                        <form onSubmit={payShare}>
                            <MDBInput className='mb-3' label='Wei einzahlen' placeholder="Wei" name="amountToPay" type='number'  />
                            <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyId" type='number'  />
                            <MDBIcon fab icon="ethereum" className='mr-3'/>
                            <MDBBtn type='submit'>Einzahlen</MDBBtn><br/><br/>
                        </form>
                        <MDBIcon icon="address-card" className='mr-3'/>
                        <form onSubmit={getCompanyInfo}>
                            <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyId-2" type='number'  />
                            <MDBBtn type='submit' >Company Info laden </MDBBtn>
                        </form>


                    </MDBCol>

                </MDBRow>
            </div>

        </MDBContainer>

    );
}
export default ContractOverview;