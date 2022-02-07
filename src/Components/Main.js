import React from 'react';
import {ContractOverview, Footer, Form, LeaveOrDissolveCompany}  from './index'
import { MDBContainer, } from 'mdb-react-ui-kit';
import TxList from "./TxList";



const Main = () => {
    return(
        <div>
            <div id='FoundCompany'>
            <MDBContainer className='pt-5'>
                <div className='mb-5 text-center'>
                    <h2 className='mt-5 mb-3'>Gesellschaftervertrag aufsetzen</h2>
                    <p className='p-3'>Zur Erstellung des Gesellschaftervertrags benötigen wir einige Informationen. Bitte fülle das unten stehende Formular aus.</p>
                </div>
                <Form />
            </MDBContainer>
            </div>
            <div id='Overview'>
            <ContractOverview />
            </div>
            <div id='LeaveCompany'>
            <LeaveOrDissolveCompany />
                <TxList />
            </div>
            <Footer />
        </div>

        );
}

export default Main;