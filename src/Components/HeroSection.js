import React from "react";
import {MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'




const HeroSection= () => {



    return (
        <div id='HeroSection'>
        <MDBContainer className='pt-5 pb-5'>
            <div className='p-5 mt-5 text-center' id='test'>
                <MDBRow className='pt-5 pb-5'>
                    <MDBCol className='pt-5' size='12'>
                        <h1 className='mt-5 mb-5'>Unternehmensgründung auf der Blockchain</h1>
                        <p className='mt-5 mb-5'>Schluss mit Bürokratie und wochenlangen Wartezeiten. <br/>Starte und verwalte den Gründungsprozess deiner neuen Firma einfach und bequem von zu Hause.</p>
                        <a className='btn btn-primary' href='Form.js' role='button' >
                        Jetzt gründen
                        </a>
                    </MDBCol>
                </MDBRow>
            </div>
        </MDBContainer>
        </div>
    );
}
export default HeroSection;