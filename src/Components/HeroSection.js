import React from "react";
import {MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'


export default function HeroSection() {
    return(
        <div id='HeroSection'>
        <video id='background-video' autoPlay loop muted>
            <source src='background.mp4' type='video/mp4'></source>
        </video>
    <MDBContainer className='pt-5 pb-5'>
        <div className='p-5 mt-5 text-center' id='test'>
            <MDBRow className='pt-5 pb-5'>
                <MDBCol className='pt-5' size='12'>
                    <h1 className='mt-5 mb-5'>Unternehmensgründung auf der Blockchain</h1>
                    <p className='mt-5 mb-5'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
                    <a className='btn btn-primary' href='App.js' role='button'>
                        Jetzt starten
                    </a>
                </MDBCol>
            </MDBRow>
        </div>
    </MDBContainer>
    </div>
    );
}