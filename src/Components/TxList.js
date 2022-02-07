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

    useEffect(() => {
        if (contractProvider === null) return
        //load all historic events of the contract
        const fetchOldEvents = async () => {
            const items = await contractProvider.queryFilter("*"); //* --> all events
            setEventList(items)
        }
        fetchOldEvents().catch((error) => console.error("Fehler! ", error))

        contractProvider.on("Founded", handleFounded);
        // contractProvider.on("Received", handleReceived);
        // contractProvider.on("Dissolved", handleDissolved);
        // contractProvider.on("Left", handleLeft);
        return () => {
            contractProvider.removeAllListeners();
            setEventList([]);
        };
        // if contract changes, reload this function
    }, [contractProvider])


    const handleFounded = (companyId,name,foundingCapitalGoal,memberAmount) => {
        setEventList((prev) => [
            {
                companyId,
                name: name.toString(),
                foundingCapitalGoal: foundingCapitalGoal.toNumber(),
                memberAmount: memberAmount.toNumber()
            },
            ...prev
        ]);
    };

    const handleReceived = (value,sender,companyId) => {
        setEventList((prev) => [
            {
                companyId,
                value: value.toNumber(),
                sender: sender.toString()
            },
            ...prev
        ]);
    };

    const handleDissolved = (companyId,name,sender) => {
        setEventList((prev) => [
            {
                companyId,
                name: name.toString(),
                sender: sender.toString(),

            },
            ...prev
        ]);
    };

    const handleLeft = (companyId,name,sender) => {
        setEventList((prev) => [
            {
                companyId: companyId,
                name: name.toString(),
                sender: sender.toString(),
            },
            ...prev
        ]);
    };



    return (
        <>
            <MDBContainer className='pt-5 pb-5'>
                <h2 className='pt-5 pb-5 text-center'>Alle Transaktionen</h2>
                <MDBRow>
                    {eventList.map(({args, event, transactionHash, blockNumber}, index) => (

                            <div key={index}>
                                <MDBCard className='mb-2 w-50'>
                                    <MDBCardBody>
                                        <MDBCardTitle>{event.toString()}</MDBCardTitle>
                                        {event.toString() === "Founded" ? <>
                                            <MDBCardText>Company Name: {args.name}</MDBCardText>
                                            <MDBCardText>Company ID: {args.companyId.toNumber()}</MDBCardText>
                                            <MDBCardText>Member amount: {args.memberAmount.toNumber()}</MDBCardText>
                                        </> : <>
                                            <MDBCardText>Amount: {args.value.toNumber()} Wei</MDBCardText>
                                            <MDBCardText>Sender: {args.sender}</MDBCardText>
                                        </>}
                                        <MDBBtn href={`https://ropsten.etherscan.io/tx/${transactionHash}`}>
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

