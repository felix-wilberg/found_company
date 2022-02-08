import React, {useEffect, useState} from "react";
import {useStore} from "./App";

import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardFooter, MDBRow
} from 'mdb-react-ui-kit';

const TxList = () => {

    const contractProvider = useStore((state) => state.contractProvider)
    const [eventList, setEventList] = useState([])

    const fetchOldEvents = async () => {
        const items = await contractProvider.queryFilter("*"); //* --> all events
        console.log(items);
        setEventList(items);
    }

    useEffect(() => {
        if (contractProvider === null) return
        //load all historic events of the contract

        fetchOldEvents().catch((error) => console.error("Fehler! ", error))

        contractProvider.on("Founded", fetchOldEvents);
        contractProvider.on("Received", fetchOldEvents);
        contractProvider.on("Dissolved", fetchOldEvents);
        contractProvider.on("Left", fetchOldEvents);
        return () => {
            contractProvider.removeAllListeners();
            setEventList([]);
        };
        //if contract changes, reload this function
    }, [contractProvider])



    return (
        <>
            <MDBContainer className='pt-5 pb-5'>
                <h2 className='pt-5 pb-5 text-center'>Alle Transaktionen</h2>
                <MDBRow>
                    {eventList.sort((eventOne, eventTwo) => eventTwo.blockNumber - eventOne.blockNumber).map(({args, event, transactionHash, blockNumber}, index) => (
                        <div key={index}>
                            <MDBCard className='mb-2 w-50'>
                                <MDBCardBody>
                                    <MDBCardTitle>{event.toString()}</MDBCardTitle>
                                    {event.toString() === "Founded" ? <>
                                        <MDBCardText>Company Name: {args.name}</MDBCardText>
                                        <MDBCardText>Company ID: {args.companyId.toNumber()}</MDBCardText>
                                        <MDBCardText>Member amount: {args.memberAmount.toNumber()}</MDBCardText>
                                        <MDBCardText>Member CapitalGoal: {args.foundingcapitalgoal.toNumber()} Wei</MDBCardText>
                                    </> : event.toString() === "Received" ? <>
                                        <MDBCardText>Company ID: {args.companyId.toNumber()}</MDBCardText>
                                        <MDBCardText>Amount: {args.value.toNumber()} Wei</MDBCardText>
                                        <MDBCardText>Sender: {args.sender}</MDBCardText>
                                    </> : event.toString() === "Dissolved" ?
                                        <>
                                            <MDBCardText>Company ID: {args.companyId.toNumber()}</MDBCardText>
                                            <MDBCardText>Name: {args.name}</MDBCardText>
                                            <MDBCardText>Adresse: {args.sender}</MDBCardText>
                                        </> : <>
                                            <MDBCardText>Company ID: {args.companyId.toNumber()}</MDBCardText>
                                            <MDBCardText>Name: {args.name}</MDBCardText>
                                            <MDBCardText>Adresse: {args.sender}</MDBCardText>
                                        </>
                                    }
                                    <MDBBtn href={`https://ropsten.etherscan.io/tx/${transactionHash}`} target="_blank">
                                        Check in block explorer
                                    </MDBBtn>
                                </MDBCardBody>
                                <MDBCardFooter>Blocknumber: {blockNumber}</MDBCardFooter>
                            </MDBCard>
                        </div>
                    ))}
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default TxList;

