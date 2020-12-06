import React, { Component } from "react";


import { Route, Link} from "react-router-dom"

class Info extends Component {
  state = {
   
  }


  render() {

    return (
      <div className="App">
        Click on the map to add a new location. Click on the hearts to save favorites. Click on the pins to review.
      </div>
    );
  }
}

export default Info;