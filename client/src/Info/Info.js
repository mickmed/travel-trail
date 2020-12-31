import React, { Component } from "react";
import './Info.scss'

class Info extends Component {

  render() {
    return (
      <div className="info">
        <ul className='info-list'>
          <li>Click on the map to add a new location. Your pin will be saved to the map and your details to the list</li>
          <li>Double click on each location to see the location pics and details</li>
          <li>Click on the 💜s on the location list to save favorites. Retreive them by clicking on the 💚 up top</li>
          <li>Click on your saved pins to edit your location pics and details.</li>
          <li>Sort locations by list order by clicking on the 🌎</li>
          <li>Sort locations by date order by clicking on the 🕛</li>



        </ul>
      </div>
    )
  }
}

export default Info