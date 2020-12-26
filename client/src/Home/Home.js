import React, { Component } from "react";

import "./Home.scss";
import { Route, Switch, withRouter } from "react-router-dom"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import Info from "../Info/Info"
import LocationAdd from "../LocationAdd/LocationAdd";
import LocationUpdate from "../LocationUpdate/LocationUpdate";
import LocationShow from "../LocationShow/LocationShow";

import api from '../Services/ApiHelper'

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

  componentDidMount = async () => {
    console.log('home cdm')
    await this.getLocations();
  };

  getLocations = async (req, res) => {
    try {
      const fetchLocations = await api.get("/locations/");
      const locations = fetchLocations.data;
      this.setState({
        locations: locations,
        loading: true,
        clickedLocation: null,

      });
    } catch (err) {
      console.log(err);
    }
  };

  getClickedLocation = (location) => {
    this.setState({ clickedLocation: location })
  }

  // getMapClickLatLong = (lat, long) => {
  //   console.log(lat, long)
  //   this.setState({ lat: lat, long: long })

  // }
  render() {
    const { images } = this.state;
    const hasImages = images.length > 0;


    return (
      <div>

        {this.state.loading == false && "...loading"}
        {this.state.loading == true && (
          <div className="home">

            <Switch>
              <Route path={`/add_location`} render={(props) => (
                <LocationAdd {...props} getLocations={this.getLocations} />
              )} />
              <Route path={`/update_location`} render={(props) => (
                <LocationUpdate {...props} getLocations={this.getLocations} />
              )} />
              <Route path={`/show_location`} render={(props) => (
                <LocationShow {...props} getLocations={this.getLocations} />
              )} />
              <Route path={`/info`} render={() => <Info />} />

              <Route
                path={'/'}
                render={() => <LocationsList
                  // key={this.state.locations}
                  locations={this.state.locations}
                  renderFavsStatus={this.props.renderFavsStatus}
                  renderDateStatus={this.props.renderDateStatus}
                  getLocations={this.getLocations}
                  clickedLocation={this.getClickedLocation} />} />
            </Switch>
            <div className="map-wrapper">
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


export default withRouter(Home);
