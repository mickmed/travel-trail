import React, { Component } from "react";

import "./Layout.scss";
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
      // locations: [],
      // name: "",
      // summary: "",
      images: [],
      loading: false
    };
  }

  componentDidMount = async () => {
    console.log('home cdm')
    await this.getLocations();
  };
  async componentDidUpdate(prevProps, prevState) {
    console.log(JSON.stringify(prevProps.history.location.images) !== JSON.stringify(prevState.images))
    if ('location' in prevProps.history && JSON.stringify(prevProps.history.location.images) !== JSON.stringify(prevState.images)){
      // this.setState({ latitude: prevProps.latitude, longitude: prevProps.longitude })
     await this.getLocations()
      this.setState({images:prevProps.location.images})
    }
  }

  getLocations = async (req, res) => {
    try {
      const locations = await api.get("/locations/");
      this.setState({
        locations: locations.data,
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
    // const hasImages = images.length > 0;


    return (
      this.state.loading == false ? "...loading" : (
        <div className='layout'>  <div className='map'>
            <Map

              key={this.state.locations}
              locations={this.state.locations}
              getLocations={this.getLocations}
              clickedLocation={this.state.clickedLocation}
              getMapClickLatLong={this.getMapClickLatLong}
            />
          </div>
          <div className="content">

            <Switch>
              <Route path={`/add_location`} render={(props) => (
                <LocationAdd {...props} getLocations={this.getLocations} />
              )} />
              <Route path={`/update_location`} render={(props) => (
                <LocationUpdate {...props} getLocations={this.getLocations} />
              )} />
              <Route path={`/show_location`} render={(props) => (
                <LocationShow {...props} locations={this.state.locations} getLocations={this.getLocations} />
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
          </div>
        

        </div>
      )
    );
  }
}


export default withRouter(Home);
