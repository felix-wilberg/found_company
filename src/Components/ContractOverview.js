import React from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBIcon, MDBCol, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

export default function ContractOverview(){
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
                            label='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            placeholder='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <label>
                            Kontostand
                        </label>
                        <MDBInput className='mb-3'
                            label= '10.75 ETH'
                            placeholder='10.75 ETH'
                            id='formControlReadOnly'
                            type='text'
                            disabled
                        />
                        <label>Gesellschafter</label>
                        <MDBInput className='mb-3'
                                  label='0xaa0B090e43e7626D51b36CfcE7D5F3156efd1f44'
                                  id='formControlReadOnly'
                                  type='text'
                                  disabled
                        />
                        <MDBInput className='mb-3'
                                  label='0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'
                                  id='formControlReadOnly'
                                  type='text'
                                  disabled
                        />
                        <MDBInput
                                label='0xcaD621da75a66c7A8f4FF86D30A2bF981Bfc8FdD'
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
                        <MDBIcon fab icon="ethereum" className='mr-3'/>
                        <MDBBtn>Einzahlen</MDBBtn>


                    </MDBCol>

                </MDBRow>
            </div>

        </MDBContainer>

    );
}