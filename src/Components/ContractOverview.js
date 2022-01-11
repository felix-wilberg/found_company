import React from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBIcon, MDBCol, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

export class ContractOverview extends React.Component {
    render() {  
        return (
            <MDBContainer>
                <div className='m-5 p-5 bg-light'>
                    <MDBRow size>
                        <MDBCol size='12'>
                        <div className='text-center'>
                        <h2>Gesellschaftervertrag XY</h2> 
                        </div>
                        </MDBCol>
                        <MDBCol size='6'>
                        <MDBInput
                            label='Contract Adress'
                            placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            id='formControlReadOnly'
                            type='text'
                            readonly
                        />
                        <MDBInput
                            label= 'Kontostand'
                            placeholder='10.75 ETH'
                            id='formControlReadOnly'
                            type='text'
                            readonly
                        />
                        <MDBInput className='mb-1'
                            label= ''
                            placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            id='formControlReadOnly'
                            type='text'
                            readonly
                        />
                        <MDBInput className='mb-1'
                            label= ''
                            placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            id='formControlReadOnly'
                            type='text'
                            readonly
                        />
                        <MDBInput
                            label= 'Gesellschafter'
                            placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            id='formControlReadOnly'
                            type='text'
                            readonly
                        />
                        </MDBCol>
                        <MDBCol>
                            <div>Status</div>
                            <MDBCheckbox name='disabledCheck' value='' id='flexCheckDisabled' disabled label='unterzeichnet' />
                            <MDBCheckbox name='disabledCheck' value='' id='flexCheckCheckedDisabled' defaultChecked disabled label='in Bearbeitung' />
                            <MDBIcon className='mt-5' fas icon="download" />
                            <MDBBtn>Vertrag herunterladen</MDBBtn>
                            <MDBIcon fab icon="ethereum" />
                            <MDBBtn>Einzahlen</MDBBtn>
                        </MDBCol>
   
                    </MDBRow>
                </div>

            </MDBContainer>

        );
    }
}