import React, { Component} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBCardHeader,
  MDBInput,
  MDBContainer,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbar
} from 'mdb-react-ui-kit';
import "./App.css";

class Main extends Component{
  render(){
    return(
        <>
          {/*NAVBAR*/}
          <MDBNavbar expand='lg' dark bgColor='dark'>
            <MDBContainer fluid>
              <MDBNavbarToggler
                  aria-controls='navbarExample01'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
              >
                <MDBIcon fas icon='bars' />
              </MDBNavbarToggler>
              <div className='collapse navbar-collapse' id='navbarExample01'>
                <MDBNavbarNav right className='mb-2 mb-lg-0'>
                  <MDBNavbarItem active>
                    <MDBNavbarLink aria-current='page' href='#'>
                      Mint
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href='#'>Fractionalize</MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <small className= 'text-white'>
                      Dein Account:
                    </small>
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </div>
            </MDBContainer>
          </MDBNavbar>
          </>
    );
  }
}

class App extends Component{
  state = {
    loading: true,
    drizzleState: null
  };

  componentDidMount = () => {
    const {drizzle} = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if(drizzleState.drizzleStatus.initialized) {
        this.setState({
          loading: false,
          drizzleState
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render(){
    if(this.state.loading) {
      return (
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Drizzle Status</h4>
            <p>Loading...</p>
          </div>
      );
    } else {
      return (
          <Main drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
      );
    }


  }
}

export default App;
