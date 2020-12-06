import React, { Component } from "react";
import "./LocationAdd.css";
import Uploader from "../Uploader/Uploader";
import { Link, Redirect } from "react-router-dom"


class LocationAdd extends Component {

  state={
    
  } 
  componentDidMount(){
  
    
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState)
  }

  render() {
   
    // this.state.linkProps

    let redct = this.props.location.linkProps === undefined && <Redirect to={'./locations'} />
    console.log('locAdd-state', this.state)
    // console.log(this.props.location.linkProps)
// 
    return (
      <div className={"modalAddLocation"}>
       
        <section className="modalMainAddLocation">
          <div className="toprowAddLocation">
            <h1 className="title">Add a new location</h1>
            {redct}
            <Link to="/home">
              <button>
                close
              </button>
            </Link>
          </div>

           {/* {this.props.location.linkProps && this.state.renderUploader ?
            <Uploader long={this.state.linkProps.long} lat={this.state.linkProps.lat} getLocations={this.state.linkProps.getLocations} /> :
            <p>Click a location on the map</p>
            

          }  */}

           {true ?
            <Uploader long={this.state} lat={this.state.lat} getLocations={this.state.getLocations} /> :
            <p>Click a location on the map</p>
            

          } 
        </section>
      </div>
    );
  }
};

export default LocationAdd;
