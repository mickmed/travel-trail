import React, { PureComponent } from "react";

class LocationInfo extends PureComponent {
  
  render() {
    
    const { locationInfo } = this.props;
   
    return (
      <div className="popup">
        <p>place: {locationInfo.name}</p>
        <img src={locationInfo.images[0].imageBase64} alt="locationInfo.images[0].imageBase64"></img>
        
      </div>
    );
  }
}

export default LocationInfo;