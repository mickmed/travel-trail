import React, { Component } from "react";
import Axios from "axios";
import "./Home.css";
import { Route, Link } from "react-router-dom"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import Info from "../Info/Info"
import LocationAdd from "../LocationAdd/LocationAdd";
import LocationUpdate from "../LocationUpdate/LocationUpdate";


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
      const fetchLocations = await Axios("https://my-travelogue.herokuapp.com/locations/");
      // console.log(fetchLocations)
      const locations = fetchLocations.data;
      this.setState({
        locations: locations,
        loading: true,
        clickedLocation: null
      });
      console.log(locations)
    } catch (err) {
      console.log(err);
    }

   
    
  };

  getClickedLocation = (location) => {

    console.log(location)
    this.setState({ clickedLocation: location })
  }

  componentDidMount = async () => {
    console.log('home cdm')
    await this.getLocations();
  };




  render() {
    //  console.log('home', this.state.locations)
    const { images } = this.state;
    const hasImages = images.length > 0;

    const locationsList =

      <LocationsList
        key={this.state.locations} 
        locations={this.state.locations} 
        renderFavsStatus={this.props.renderFavsStatus} 
        renderDateStatus={this.props.renderDateStatus}
        getLocations={this.getLocations}
        clickedLocation={this.getClickedLocation} />

    // console.log(this.props)

    return (
      <div>

        {this.state.loading == false && "...loading"}
        {this.state.loading == true && (
          <div className="homeComponent">


            <div className="mapWrapper">
              <Map
                className="map"
                key={this.state.locations}
                locations={this.state.locations}
                getLocations={this.getLocations}
                clickedLocation={this.state.clickedLocation}
              />
            </div>


            <Route path={`${this.props.match.path}/update_location`} render={(props) => <div className="locationsListWrapper">{<LocationUpdate {...props} getLocations={this.getLocations} />}</div>} />

            <Route path={`${this.props.match.path}/add_location`} render={(props) => <div className="locationsListWrapper">{<LocationAdd {...props} />}</div>} />

            <Route path={`${this.props.match.path}/locations`} render={() => <div className="locationsListWrapper">{locationsList}</div>} />

            <Route path={`${this.props.match.path}/info`} render={() => <div className="locationsListWrapper"> <Info /></div>} />
            <Route
              exact
              path={this.props.match.path}
              render={() => <div className="locationsListWrapper">{locationsList}</div>} />
          </div>
        )}
      </div>
    );
  }
}

function Topic({ match }) {
  console.log('i')
  return <h3>Requested Param: {match.params.id}</h3>;
}

export default Home;
