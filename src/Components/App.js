import React, { Component} from "react";

import "./App.css";
import { Main } from "./Main";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      drizzleState: null
    };
  }


/*  componentDidMount = () => {
    const {drizzle} = this.props;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleStates = drizzle.store.getState();

      if(drizzleStates.drizzleStatus.initialized) {
        this.setState({
          loading: false,
          drizzleState: drizzleStates
        });
      }
    });
  }*/

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render(){
/*    if(this.state.loading) {
      return (
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading">Drizzle Status</h4>
            <p>Loading...</p>
          </div>
      );
    } else {*/
      return (
          <>
            <Main drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
              <div></div>
          </>
      );
    }


 // }
}

export default App;
