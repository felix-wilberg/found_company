import React from 'react';
import { MDBCol, MDBContainer, MDBInput, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import {useStore} from "./App";
import { TxList, Loader, Success} from "./index";




const Form = () => {
    //load all needed states
    const contract = useStore((state) => state.contractSigner)
    const txs = useStore((state) => state.txs)
    const companyId = useStore((state)  => state.companyId)
    const isLoading = useStore((state)  => state.isLoading)
    const isFounded = useStore((state)  => state.isFounded)
    const companyInfo = useStore((state)  => state.companyInfo)
    const addCompanyInfo = useStore((state) => state.addCompanyInfo)



    const handleTransfer = async (e) => {
        e.preventDefault();
        //get all data of the form
        const data = new FormData(e.target);
        //check if all needed fields are filled
        if (!data.get("companyName") || !data.get("foundingCapital") || !data.get("amountShareholders")) {alert("Bitte fülle das Formular aus."); return;}
        //execute found company function, if company already exists, throw error alert
        try { await contract.found(data.get("companyName"), data.get("foundingCapital"), data.get("amountShareholders"));}
        catch (error) {
            alert(error);
        }
        //if successful, wait for network to process the transaction
        useStore.setState({isLoading: true});
        //listen to event "founded" and get data of event
        contract.on("Founded", (companyId,name,foundingCapitalGoal,memberAmount) => {
            console.log({companyId: companyId.toString(),name: name.toString(),foundingCapitalGoal: foundingCapitalGoal.toString(),memberAmount: memberAmount.toNumber()});
            useStore.setState({isLoading: false});
            useStore.setState({isFounded: true});
            //save data of event in companyarray
            useStore.setState((currentTxs) => [ {txs: {
                    companyId,
                    name: name.toString(),
                    foundingCapitalGoal: foundingCapitalGoal.toNumber(),
                    memberAmount: memberAmount.toNumber()},
                ...currentTxs
            }])
            addCompanyInfo({companyId: companyId.toString(),name: name.toString(),foundingCapitalGoal: foundingCapitalGoal.toString(),memberAmount: memberAmount.toNumber()})
            useStore.setState((companyInfo) => [...companyInfo,
                {companyInfo: {
                        companyId: companyId.toString(),
                        name: name.toString(),
                        foundingCapitalGoal: foundingCapitalGoal.toNumber(),
                        memberAmount: memberAmount.toNumber()}}
                ]);
            console.log(companyInfo[companyInfo.length-1]);
            return () => {
                contract.removeAllListeners("Founded");
            }
        })

    };


    const handleFounded = (companyId,name,foundingCapitalGoal,memberAmount) => {
        console.log ("HandleFoundedEvent: ",{companyId, name, foundingCapitalGoal, memberAmount});
        useStore.setState((currentTxs) => [ {txs: {
                companyId,
                name: name.toString(),
                foundingCapitalGoal: foundingCapitalGoal.toNumber(),
                memberAmount: memberAmount.toNumber()},
            ...currentTxs
        }])
    }


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
                        {/*{isFounded*/}
                        {/*    ? <Success companyInfo={companyInfo}/>*/}
                        {/*    : (*/}
                        {/*        <div></div>*/}
                        {/*    )*/}
                        {/*}*/}
                    </MDBCol>
                </MDBRow>
            </form>
            <MDBRow>
                {/*<TxList txs={txs} />*/}
            </MDBRow>
        </MDBContainer>
        </div>

    );
}

export default Form;
