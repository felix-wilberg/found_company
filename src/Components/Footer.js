import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 '>
          </section>
    
          <section className=''>
            <div className='container text-center text-md-start mt-5'>
              <div className='row mt-3'>
                <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <i className></i>STABU - Start A Business
                  </h6>
                  <p>
                  Schluss mit Bürokratie und wochenlangen Wartezeiten. Starte und verwalte den Gründungsprozess deiner neuen Firma einfach und bequem von zu Hause.
                  </p>
                </div>
    
    
                {/* <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Pricing
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Settings
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Help
                    </a>
                  </p>
                </div> */}
    
                <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Kontakt</h6>
                  <p>
                    <i className='fas fa-home me-3'></i> Sanderheinrichtsleitweg 20 97074 Würzburg
                  </p>
                  <p>
                    <i className='fas fa-envelope me-3'></i>
                    info@example.com
                  </p>
                  <p>
                    <i className='fas fa-phone me-3'></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className='fas fa-print me-3'></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
    
          <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © 2022 Copyright: 
            <a className='text-reset fw-bold' href='#!'>
                  STABU - Start A Business
            </a>
          </div>
        </MDBFooter>
      );
}

export default Footer;
