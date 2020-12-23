import React, { Component } from "react";

import "./Home.css";
import { Route, Switch, withRouter } from "react-router-dom"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import Info from "../Info/Info"
import LocationAdd from "../LocationAdd/LocationAdd";
import LocationUpdate from "../LocationUpdate/LocationUpdate";
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
          <div className="homeComponent">

            <Switch>
              <Route path={`/add_location`} render={(props) => <div className="locationsListWrapper">{<LocationAdd {...props} getLocations={this.getLocations}/>}</div>} />
              <Route path={`/update_location`} render={(props) => <div className="locationsListWrapper">{<LocationUpdate {...props} getLocations={this.getLocations} />}</div>} />
              <Route path={`${this.props.match.path}/info`} render={() => <div className="locationsListWrapper"> <Info /></div>} />

              <Route
                path={'/'}
                render={() => <div className="locationsListWrapper"><LocationsList
                  // key={this.state.locations}
                  locations={this.state.locations}
                  renderFavsStatus={this.props.renderFavsStatus}
                  renderDateStatus={this.props.renderDateStatus}
                  getLocations={this.getLocations}
                  clickedLocation={this.getClickedLocation} /></div>} />
            </Switch>
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


export default withRouter(Home);
