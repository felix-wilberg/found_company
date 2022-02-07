import React, {useState} from 'react';
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import {useStore} from "./App";
import { Loader, SuccessFounded} from "./index";




const Form = () => {
    //load all needed states
    const contractSigner = useStore((state) => state.contractSigner)
    const companyId = useStore((state)  => state.companyId)
    const companyInfo = useStore((state)  => state.companyInfo)
    const addCompanyInfo = useStore((state) => state.addCompanyInfo)

    const [companyFounded, setCompanyFounded] = useState(null);
    const [isLoading, setIsLoading] = useState(null);


    const handleTransfer = async (e) => {
        e.preventDefault();
        //get all data of the form
        const data = new FormData(e.target);
        //check if all needed fields are filled
        if (!data.get("companyName") || !data.get("foundingCapital") || !data.get("amountShareholders")) {alert("Bitte fülle das Formular aus."); return;}
        //execute found company function, if company already exists, throw error alert
        try {
            setIsLoading(true);
            await contractSigner.found(data.get("companyName"), data.get("foundingCapital"), data.get("amountShareholders"));
            contractSigner.on("Founded", (companyId,name,foundingCapitalGoal,memberAmount) => {
                setIsLoading(false);
                console.log({companyId: companyId.toString(),name: name.toString(),foundingCapitalGoal: foundingCapitalGoal.toString(),memberAmount: memberAmount.toNumber()});
                setCompanyFounded({companyId: companyId.toString(),name: name.toString(),foundingCapitalGoal: foundingCapitalGoal.toString(),memberAmount: memberAmount.toNumber()});
                return () => {
                    contractSigner.removeAllListeners("Founded");
                }})
            }
        catch (error) {
            console.log(error, typeof error, error.data);
            alert(error.message);
            setIsLoading(false);
        }
    };



    return (
        <div>
        <MDBContainer>
            <form onSubmit={handleTransfer}>
                <MDBRow>
                    <MDBCol>
                        <MDBInput className='mb-3' label='Firmenname' placeholder="Firmenname" name="companyName" type='text'  />
                        <MDBInput className='mb-3' label='Firmensitz' placeholder="Firmensitz" name="city" type='text'  />
                        <MDBInput className='mb-3' label='Geschäftsführer' placeholder="Geschäftsführer" name="managingDirector" type='text'  />
                        <MDBInput className='mb-3' label='Anteile' placeholder="Anteile" name="amountShareholders" type='number'  />

                    </MDBCol>
                    <MDBCol>
                        <MDBInput className='mb-3' label='Stammkapital' placeholder="Stammkapital" id='text' name="foundingCapital" type='number'  />
                        <MDBInput className='mb-3' label='Gegenstand der Firma' placeholder="Gegenstand der Firma" name="companyWhy" id='textarea' textarea rows={3}  />

                        {isLoading
                            ? <Loader />
                            : (
                                <div className='text-center'>
                                    <MDBBtn type='submit' >Bestätigen</MDBBtn>
                                </div>
                            )
                        }
                        {companyFounded !== null
                            && <SuccessFounded companyFounded={companyFounded}/>
                        }
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
        </div>

    );
}

export default Form;
