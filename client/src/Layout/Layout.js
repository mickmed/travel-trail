import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import Info from "../Info/Info"
import LocationAdd from "../LocationAdd/LocationAdd";
import LocationUpdate from "../LocationUpdate/LocationUpdate";
import LocationShow from "../LocationShow/LocationShow";
import api from '../Services/ApiHelper'
import "./Layout.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: false
    };
  }

  componentDidMount = async () => {
    await this.getLocations();
  };
  async componentDidUpdate(prevProps, prevState) {
    console.log(JSON.stringify(prevProps.history.location.images) !== JSON.stringify(prevState.images))
    if ('location' in prevProps.history && JSON.stringify(prevProps.history.location.images) !== JSON.stringify(prevState.images)) {
      await this.getLocations()
      this.setState({ images: prevProps.location.images })
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

  render() {
    const { locations } = this.state
    const { renderFavsStatus, renderDateStatus } = this.props
    const { getLocations, getClickedLocation } = this
    // const hasImages = images.length > 0;


    return (
      this.state.loading == false ? "...loading" : (
        <div className='layout'>
          <div className="content">
            <Switch>
              <Route path={`/add_location`} render={(props) => (
                <LocationAdd {...props} getLocations={getLocations} />
              )} />
              <Route path={`/update_location`} render={(props) => (
                <LocationUpdate {...props} getLocations={getLocations} />
              )} />
              <Route path={`/show_location`} render={(props) => (
                <LocationShow {...props} locations={locations} getLocations={getLocations} />
              )} />
              <Route path={`/info`} render={() => <Info />} />

              <Route
                path={'/'}
                render={() => <LocationsList
                  locations={locations}
                  renderFavsStatus={renderFavsStatus}
                  renderDateStatus={renderDateStatus}
                  getLocations={getLocations}
                  clickedLocation={getClickedLocation} />} />
            </Switch>
          </div>
          <div className='map'>
            <Map
              key={locations}
              locations={locations}
              getLocations={getLocations}
              clickedLocation={this.state.clickedLocation}
              getMapClickLatLong={this.getMapClickLatLong}
            />
          </div>
        </div>
      )
    );
  }
}


export default withRouter(Home);
