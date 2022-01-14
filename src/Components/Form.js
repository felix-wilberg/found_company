import React from 'react';
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from 'mdb-react-ui-kit';

export default function Form() {
    return (
        <MDBContainer>
            <form>
                <MDBRow className='mb-5'>
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
    );
}
