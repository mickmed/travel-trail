import React, { Component } from "react";
import Axios from "axios";
import "./Home.css";
import { Route, Link, Redirect } from "react-router-dom"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import Info from "../Info/Info"
import LocationAdd from "../LocationAdd/LocationAdd";
import LocationUpdate from "../LocationUpdate/LocationUpdate";
import api from '../Services/ApiHelper'


// import { Redirect } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      name: "",
      summary: "",
      images: [],
      loading: false
    };
  }
  getLocations = async (req, res) => {

    try {
     
      const fetchLocations = await api.get("http://localhost:3000/api/locations/");
      const locations = fetchLocations.data;
      this.setState({
        locations: locations,
        loading: true,
        clickedLocation: null,
        redirect: false
      });
    } catch (err) {
      console.log(err);
    }



  };

  getClickedLocation = (location) => {

    this.setState({ clickedLocation: location })
  }

  componentDidMount = async () => {
    await this.getLocations();
  };

  getMapClickLatLong = (lat, long) => {
    console.log(lat, long)
    this.setState({ lat: lat, long: long })
    this.setState({ redirect: true })
  }


  render() {
    const { images, lat, long } = this.state;
    const hasImages = images.length > 0;

    const locationsList =

      <LocationsList
        key={this.state.locations}
        locations={this.state.locations}
        renderFavsStatus={this.props.renderFavsStatus}
        renderDateStatus={this.props.renderDateStatus}
        getLocations={this.getLocations}
        clickedLocation={this.getClickedLocation} />

    let redirect = this.state.redirect && <Redirect to={{
      pathname: '/home/add_location',
      linkProps: {
        // long: this.state.pinLong,
        // lat: this.state.pinLat,
        // getLocations: this.props.getLocations,
        // renderLocationAdd: this.state.renderLocationAdd
      }
    }} />
    return (
      <div>

        {this.state.loading == false && "...loading"}
        {this.state.loading == true && (
          <div className="homeComponent">


            {redirect}


            <Route path={`${this.props.match.path}/update_location`} render={(props) => <div className="locationsListWrapper">{<LocationUpdate {...props} getLocations={this.getLocations} />}</div>} />

            <Route path={`${this.props.match.path}/add_location`} render={(props) => <div className="locationsListWrapper">{<LocationAdd {...props} lat={lat} long={long} />}</div>} />

            <Route path={`${this.props.match.path}/locations`} render={() => <div className="locationsListWrapper">{locationsList}</div>} />

            <Route path={`${this.props.match.path}/info`} render={() => <div className="locationsListWrapper"> <Info /></div>} />
            <Route
              exact
              path={this.props.match.path}
              render={() => <div className="locationsListWrapper">{locationsList}</div>} />

            <div className="mapWrapper">
              <Map

                className="map"
                key={this.state.locations}
                locations={this.state.locations}
                getLocations={this.getLocations}
                clickedLocation={this.state.clickedLocation}
                getMapClickLatLong={this.getMapClickLatLong}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

export default Home;
