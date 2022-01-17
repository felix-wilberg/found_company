import React from 'react';
import Form from "./Form";
import ContractOverview from './ContractOverview';
import FoundingProgress from './FoundingProgress';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';



export default function Main(){
    return(
        <div>
            <MDBContainer className='pt-5 pb-5'>
                <div className='p-5 mt-5 text-center' id='test'>
                    <MDBRow className='pt-5 pb-5'>
                        <MDBCol size='6'>
                            <h1 className='mt-5 mb-5'>Unternehmensgründung auf der Blockchain</h1>
                            <p className='mt-5 mb-5'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                            <a className='btn btn-primary' href='App.js' role='button'>
                                Jetzt starten
                            </a>
                        </MDBCol>
                        <MDBCol size='6'>
                            <img src='https://freellustrustrations.s3.us-east-2.amazonaws.com/free-images/freeimg_61877018freejpg850.jpg' className='pr-5'></img>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>
            <MDBContainer className='pt-5'>
                <div className='mb-5 text-center'>
                    <h2 className='mt-5 mb-3'>Gesellschaftervertrag aufsetzen</h2>
                    <p className='p-3'>Zur Erstellung Ihres Gesellschaftervertrags benötigen wir einige Informationen. Bitte füllen Sie das unten stehende Formular aus.</p>
                </div>
                <Form />
            </MDBContainer>
            <MDBContainer>
                <div className='p-5 mt-5 text-center'>
                    <h2 className='mt-5 mb-3'>
                        Übersicht Gesellschaftervertrag
                    </h2>
                </div>
            </MDBContainer>
            <ContractOverview />
            <FoundingProgress />
        </div>

    );
}