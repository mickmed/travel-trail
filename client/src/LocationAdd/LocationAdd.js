import React, { Component } from "react";
import "./LocationAdd.css";
import Uploader from "../Uploader/Uploader";
import { Link, Redirect } from "react-router-dom"


class LocationAdd extends Component {

  state = {
    lat: 0,
    long: 0,
    data: null

  }
  async componentDidMount() {
    //  console.log(geolocationUrl, this.props)
    this.setState({ lat: this.props.lat, long: this.props.long })


  }



  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.data, prevState.data !== null && prevState.data.results)
    if (prevProps.lat !== prevState.lat) {
      this.setState({ lat: prevProps.lat, long: prevProps.long })


    }

  }

  render() {

    // this.state.linkProps

    let redct = this.props.location.linkProps === undefined && <Redirect to={'./locations'} />
    // console.log('locAdd-state', this.state)
    console.log(this.state)
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
            <Uploader location={this.state} long={this.state.long} lat={this.state.lat}/> :
            <p>Click a location on the map</p>


          }
        </section>
      </div>
    );
  }
};

export default LocationAdd;
