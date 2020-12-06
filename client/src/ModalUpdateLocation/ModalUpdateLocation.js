import React, { Component } from "react";
import "./ModalUpdateLocation.css";
import LocationUpdate from "../LocationUpdate/LocationUpdate";
import Axios from 'axios'
import Uploader from '../Uploader/Uploader.js'

class ModalUpdateLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteLocation = async event => {
    event.preventDefault();
    console.log(event.target.getAttribute("data-location-index"))
    try {
      const deleteLocation = await Axios.delete(
        
        "https://my-travelogue.herokuapp.com/locations/" +
          parseInt(event.target.getAttribute("data-location-index"))
      )
      
      .then((res) => this.props.getLocations())
      .then((res) => this.props.handleClose())
    } catch (err) {
      console.log(err);
    }
    
  };

  render() {
    console.log(this.props)
    // const showHideClassName = this.props.show
    //   ? "modalUpdate displayBlockUpdate"
    //   : "modalUpdate displayNoneUpdate";
    return (
      <div className="modalUpdate" >
        <section className="updateModal">
          <p>{'Update Location'}</p>
          {/* <Uploader  location={this.props.location} handleClose={this.props.handleClose} passer={'modalUpdate'} getLocations={this.props.getLocations}/> */}
          <button className="close-button" onClick={this.props.handleClose}>close</button>/>
        
        <form
          className="deleteForm"
          onSubmit={this.deleteLocation}
          data-location-index={this.props.location && this.props.location.id}
        >
          <button className="deleteButton" name="delete" value={this.props.location && this.props.location.id}>
            Delete
          </button>
        </form>
        
        </section>
      </div>
    );
  }
}

export default ModalUpdateLocation;
