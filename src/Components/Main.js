import React from 'react';
import {Navbar} from "./Navbar";


export class Main extends React.Component{
    render(){
        return(
          <div>
              <Navbar />
              <div className='p-5 text-center bg-light'>
                  <h1 className='mb-3'>Heading</h1>
                  <h4 className='mb-3'>Subheading</h4>
                  <a className='btn btn-primary' href='App.js' role='button'>
                      Call to action
                  </a>
              </div>
          </div>
        );
    }
}