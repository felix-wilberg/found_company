import React, {useState} from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBBtn,
    MDBIcon } from 'mdb-react-ui-kit';

export default function Navbar({onConnectWalletHandler}) {
    const [address, setAddress] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header>
            <MDBNavbar expand='lg' light bgColor='white'>
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
                                <MDBNavbarLink aria-current='page' href='#'>
                                    Home
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Features</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='#'>About</MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem className= 'ml-auto'>
                                <MDBBtn onClick={onConnectWalletHandler} className='cta-button connect-wallet-button'>
                                    {isLoggedIn ?  'Your Account:' + {address} : 'Connect Wallet'}
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </div>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
}