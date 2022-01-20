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