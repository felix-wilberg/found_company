import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';


const LeaveOrDissolveCompany = () => {
    const dissolveCompany = async () => {
        console.log("Firma auflösen Button wurde geklickt.")

    };
    const leaveCompany = async () => {
        console.log("Firma verlassen Button wurde geklickt")
    };

    return (
        <div>
            <MDBContainer className='pt-5 pb-5'>
                <h2 className='pt-5 pb-5 text-center'>Firma auflösen oder Firma verlassen</h2>
                <MDBRow>
                    <MDBCol size='6'>
                        <div className='text-center'>
                            Firma auflösen<br />
                            <MDBBtn onClick={dissolveCompany}>Firma auflösen</MDBBtn>
                        </div>
                    </MDBCol>
                    <MDBCol size='6'>
                        <div className='text-center'>
                            Firma verlassen<br />
                            <MDBBtn onClick={leaveCompany}>Firma verlassen</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
        
    )
}
export default LeaveOrDissolveCompany;