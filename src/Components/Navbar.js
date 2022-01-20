import React from 'react';
import ConnectWalletButton from './ConnectWalletButton'
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon } from 'mdb-react-ui-kit';

// in case it is needed, uncomment
// import {useStore} from "./App";



export default function Navbar() {

    return (
        <header>
            <MDBNavbar id='nav' expand='lg' light >
                <MDBContainer >
                    <MDBNavbarToggler
                        aria-controls='navbarExample01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <MDBIcon fas icon='bars'/>
                    </MDBNavbarToggler>
                    <div className='collapse navbar-collapse' id='navbarExample01'>
                        <MDBNavbarNav right className='mb-2 mb-lg-0'>
                            <MDBNavbarItem active>
                                <MDBNavbarLink id='NavLink' aria-current='page' href='#'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem> 
                                <MDBNavbarLink id='NavLink' href='#'>Features</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink id='NavLink' href='#'>Pricing</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink id='NavLink' href='#'>About</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className= 'ml-auto'>
                                <ConnectWalletButton />
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </div>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
}