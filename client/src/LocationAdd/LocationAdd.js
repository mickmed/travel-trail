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
   
    this.setState({ latitude: this.props.history.location.latitude, longitude: this.props.history.location.longitude })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log(this.state.data, prevState.data !== null && prevState.data.results)
  //   if (prevProps.lat !== prevState.lat) {
  //     this.setState({ lat: prevProps.lat, long: prevProps.long })
  //   }
  // }

  render() {
    let redirectFromRefresh = this.props.location.latitude === undefined && <Redirect to={'./'} />

    return (
      <div className={"modalAddLocation"}>

        <section className="modalMainAddLocation">
          <div className="toprowAddLocation">
            <h1 className="title">Add a new location</h1>
            {redirectFromRefresh}
            <Link to="/">
              <button>
                close
              </button>
            </Link>
          </div>

          {true ?
            <Uploader /> :
            <p>Click a location on the map</p>
          }
        </section>
      </div>
    );
  }
};

export default LocationAdd;
