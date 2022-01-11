import React from 'react';
import {Navbar} from "./Navbar";
import {Form} from "./Form";
import {ContractOverview} from './ContractOverview';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';


export class Main extends React.Component{
    render(){
        return(
            <div>
            <Navbar />
              <MDBContainer>
              <div className='p-5 mt-5 text-center bg-light'>
                  <MDBRow>
                    <MDBCol size='6'>
                    <h1 className='mb-5'>Unternehmensgründung auf der Blockchain</h1>
                    <p className='mb-5'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                    <a className='btn btn-primary' href='App.js' role='button'>
                      Jetzt starten
                    </a>
                  </MDBCol>
                  <MDBCol size='6'>
                    <img src='https://mdbcdn.b-cdn.net/img/new/slides/041.webp' className='img-fluid' alt='...' />
                  </MDBCol>
                  </MDBRow>
              </div>
              <div className='mb-5 text-center'>
                  <h2 className='mt-5 mb-3'>Gesellschaftervertrag aufsetzen</h2>
                  <p className='p-3'>Zur Erstellung Ihres Gesellschaftervertrags benötigen wir einige Informationen. Bitte füllen Sie das unten stehende Formular aus.</p>
              </div>
              </MDBContainer>
              <Form />
              <MDBContainer>
                  <div className='p-5 mt-5 text-center'>
                      <h2 className='mt-5 mb-3'>
                          Übersicht Gesellschaftervertrag
                      </h2>
                  </div>
              </MDBContainer>
              <ContractOverview />
            </div>
              
        );
    }
}