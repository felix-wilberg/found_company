import {MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import React, {useState} from 'react';
import {useStore} from "./App";
import {Loader, SuccessLeave, SuccessDissolved} from "./index";


const LeaveOrDissolveCompany = () => {

    //import all needed states
    const contractSigner = useStore((state)  => state.contractSigner);

    //all states for use in this component only
    const [isLoadingDissolve, setIsLoadingDissolve] = useState(false);
    const [isDissolved, setIsDissolved] = useState(null);
    const [isLoadingLeave, setIsLoadingLeave] = useState(false);
    const [isLeft, setIsLeft] = useState(null);

    //dissolve a specific company based on companyId
    const dissolveCompany = async (e) => {
        e.preventDefault();
        console.log("Firma auflösen Button wurde geklickt.")
        //get all data of the form
        const dissolveCompanyInput = new FormData(e.target);
        //check if all needed fields are filled
        if (!dissolveCompanyInput.get("companyIdDissolve")) {alert("Bitte fülle das Formular aus."); return;}
        //execute leaveCompany  function, if company already exists, throw error alert
        try {
            setIsLoadingDissolve(true); //turn on loading spinner
            await contractSigner.dissolveCompany(dissolveCompanyInput.get("companyIdDissolve"));
            contractSigner.on("Dissolved", (companyId,companyName, addressSender, event) => {
                setIsLoadingDissolve(false); //turn off loading spinner
                //set state to be displayed in SuccessDissolved.js Component
                setIsDissolved({
                    companyId: companyId.toNumber(),
                    companyName: companyName.toString(),
                    addressSender: addressSender.toString(),
                    txHash: event.transactionHash
                })
                return () => {
                    contractSigner.removeAllListeners("Dissolved");
                }
            })
        }
        //if transaction did not go through, catch the error and turn off loading spinner
        catch (error) {
            setIsLoadingDissolve(false);
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
        try {
            setIsLoadingLeave(true); //turn on loading spinner
            await contractSigner.leaveCompany(leaveCompanyInput.get("companyIdLeave"));
            contractSigner.on("Left", (companyId,companyName, addressSender, event) => {
                setIsLoadingLeave(false); //turn off loading spinner
                //set state to be displayed in SuccessLeave.js Component
                setIsLeft({
                    companyId: companyId.toString(),
                    companyName: companyName.toString(),
                    addressSender: addressSender.toString(),
                    txHash: event.transactionHash
                })
                return () => {
                    contractSigner.removeAllListeners("Left");
                }
            })
        }
        //if transaction did not go through, catch the error and turn off loading spinner
        catch (error) {
            setIsLoadingLeave(false);
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
                                {/*turn on loading spinner based on state isLoadingDissolve, else show button*/}
                                {isLoadingDissolve
                                    ? <Loader />
                                    : (
                                        <div>
                                            <MDBBtn type='submit'>Firma auflösen</MDBBtn>
                                        </div>
                                    )
                                }
                            </form>
                            {/*if isDissolved is true, show Component SuccessLeave.js*/}
                            {isDissolved !== null
                                && <SuccessDissolved isDissolved={isDissolved}/>
                            }
                        </div>
                    </MDBCol>
                    <MDBCol size='6'>
                        <div className='text-center'>
                            Firma verlassen<br />
                            <form onSubmit={leaveCompany}>
                                <MDBInput className='mb-3' label='Company ID' placeholder="Company ID" name="companyIdLeave" type='number'  />
                                {/*turn on loading spinner based on state isLoadingLeave, else shown button*/}
                                {isLoadingLeave
                                    ? <Loader />
                                    : (
                                        <div>
                                            <MDBBtn type='submit'>Firma verlassen</MDBBtn>
                                        </div>
                                    )
                                }
                            </form>
                            {/*if isLeft is true, show Component SuccessLeave.js*/}
                            {isLeft !== null
                                && <SuccessLeave isLeft={isLeft}/>
                            }

                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}
export default LeaveOrDissolveCompany;

