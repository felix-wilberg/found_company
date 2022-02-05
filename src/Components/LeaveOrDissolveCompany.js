import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import React from 'react';
import {useStore} from "./App";


const LeaveOrDissolveCompany = () => {

    //import all needed states
    const contractSigner = useStore((state)  => state.contractSigner);

    //dissolve a specific company based on companyId
    const dissolveCompany = async (e) => {
        e.preventDefault();
        console.log("Firma auflösen Button wurde geklickt.")
        //get all data of the form
        const dissolveCompanyInput = new FormData(e.target);
        //check if all needed fields are filled
        if (!dissolveCompanyInput.get("companyIdDissolve")) {alert("Bitte fülle das Formular aus."); return;}
        //execute leaveCompany  function, if company already exists, throw error alert
        try { await contractSigner.dissolveCompany(dissolveCompanyInput.get("companyIdDissolve"));}
        catch (error) {
            alert(error);
        }
    };

    //leave a specific company based on companyId
    const leaveCompany = async (e) => {
        e.preventDefault();
        console.log("Firma verlassen Button wurde geklickt")
        //get all data of the form
        const leaveCompanyInput = new FormData(e.target);
        //check if all needed fields are filled
        if (!leaveCompanyInput.get("companyIdLeave")) {alert("Bitte fülle das Formular aus."); return;}
        //execute leaveCompany  function, if company already exists, throw error alert
        try { await contractSigner.leaveCompany(leaveCompanyInput.get("companyIdLeave"));}
        catch (error) {
            alert(error);
        }
    };


    return (
        <div>
            <MDBContainer className='pt-5 pb-5'>
                <h2 className='pt-5 pb-5 text-center'>Firma auflösen oder Firma verlassen</h2>
                <MDBRow>
                    <MDBCol size='6'>
                        <div className='text-center'>
                            Firma auflösen<br />
                            <form onSubmit={dissolveCompany}>
                                <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyIdDissolve" type='number'  />
                                <MDBBtn type='submit'>Firma auflösen</MDBBtn>
                            </form>
                        </div>
                    </MDBCol>
                    <MDBCol size='6'>
                        <div className='text-center'>
                            Firma verlassen<br />
                            <form onSubmit={leaveCompany}>
                                <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyIdLeave" type='number'  />
                                <MDBBtn type='submit'>Firma verlassen</MDBBtn>
                            </form>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
export default LeaveOrDissolveCompany;

