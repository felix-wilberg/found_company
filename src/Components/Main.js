import React from 'react';
import {ContractOverview, FoundingProgress, Footer, Form, LeaveOrDissolveCompany}  from './index'
import { MDBContainer, } from 'mdb-react-ui-kit';



const Main = () => {
    return(
        <div>
            <div id='SectionTwo'>
            <MDBContainer className='pt-5'>
                <div className='mb-5 text-center'>
                    <h2 className='mt-5 mb-3'>Gesellschaftervertrag aufsetzen</h2>
                    <p className='p-3'>Zur Erstellung des Gesellschaftervertrags benötigen wir einige Informationen. Bitte fülle das unten stehende Formular aus.</p>
                </div>
                <Form />
            </MDBContainer>
            </div>
            <div id='SectionOne'>
            <ContractOverview />
            </div>
            <div id='SectionTwo'>
            <FoundingProgress />
            </div>
            <div id='SectionOne'>
            <LeaveOrDissolveCompany />
            </div>
            <Footer />
        </div>

        );
}

export default Main;