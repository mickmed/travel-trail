
import React from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import MapPin from "./MapPin";
import LocationInfo from "./LocationInfo.js";
import "./Map.css"
import { withRouter } from 'react-router-dom'

const MAPBOX_TOKEN = "pk.eyJ1IjoibWlja21lZCIsImEiOiJjanFzdTVtZjEwMnY0NDJzM2g4MXNuNTM0In0.VDbqZxEh0hxXAixRjS9FzA";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
const screenWidth = window.innerWidth

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: this.props.clickedLocation && this.props.clickedLocation.latitude || this.props.locations[0].latitude,
        longitude: this.props.clickedLocation && this.props.clickedLocation.longitude || this.props.locations[0].longitude,
        zoom: 1
      },
      pinLong: 0,
      pinLat: 0,
      random: 0,
      renderLocationAdd: false,
      showpics: false,
      redirect: false,
      locationInfo: null
    };
  }

  componentDidMount() {
    const AppDims = document.querySelector(".App")
    if (AppDims.offsetWidth < 900 && AppDims.offsetWidth < AppDims.offsetHeight) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: '100%',
          height: AppDims.offsetHeight / 2 + 'px',
          appDims: AppDims,
        }
      })
    }
    else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: '100%',
          height: AppDims.offsetHeight / 1.25 + 'px',
          appDims: AppDims,
        }
      })
    }
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.clickedLocation && nextProps.clickedLocation.latitude, prevState.viewport.latitude)
    // console.log(nextProps, prevState)
    if (nextProps.clickedLocation && nextProps.clickedLocation.latitude !== prevState.viewport.latitude) {
      return ({
        viewport: {
          ...prevState.viewport,
          latitude: nextProps.clickedLocation && nextProps.clickedLocation.latitude,
          longitude: nextProps.clickedLocation && nextProps.clickedLocation.longitude
        }
      })
    }
    // return ({
    //   viewport: {
    //     ...prevState.viewport,
    //     pinLat: prevState.viewport.pinLat,
    //     pinLong: prevState.viewport.pinLong
    //   }
    // })
    //  return ({pinLong:prevState.viewport.pinLong, pinLat:prevState.viewport.pinLat})
    // console.log(nextProps, prevState)
    // if(nextProps.clickedLocation && nextProps.clickedLocation.id !== prevState.location.id){
    //   console.log('here')
    // }
  }
  handleClose = () => {
    this.setState({
      showpics: false
    })
  }
  // handleStyleLoad = map => (map.resize())
  _onClickMap = (map, evt) => {
    console.log(map.lngLat)
    this.setState({ pinLat: parseFloat(map.lngLat[1]) });
    this.setState({ pinLong: parseFloat(map.lngLat[0]) });
    // this.setState({ renderLocationAdd: true });
    this.props.history.push({
        pathname:'/add_location',
        latitude:map.lngLat[1],
        longitude:map.lngLat[0]
    })


   
    
  }

  _onClickPin = location => {
    this.props.history.push({
        pathname:'/update_location',
        location
    })
  };

  _renderMarker = (location, index) => {
    let color, size
    if (location === this.props.clickedLocation) {
      color = "blue"
      size = 30
    } else {
      color = "green"
      size = 20
    }
    return (
      <Marker
        key={index}
        longitude={parseFloat(location.longitude)}
        latitude={parseFloat(location.latitude)}
      >
        <div className="treepin">
          <MapPin
            size={size}
            // onClick={() => this.setState({ popupInfo: location })}
            shoonga={this.props.clickedLocationObject}
            color={color}
            onClick={() => this._onClickPin(location)}
          />
        </div>
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <LocationInfo locationInfo={popupInfo} />
        </Popup>
      )
    );
  }


  _onViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _resize = () => {
    const AppDims = document.querySelector(".mapWrapper")
    this._onViewportChange({
      // width: AppDims.offsetWidth,
      // height: AppDims.offsetHeight - AppDims.offsetHeight / 10
    });
  }

  render() {
    const locations = this.props.locations;
    let { viewport } = this.state
    let locationAdd = this.state.renderLocationAdd
 
    return (
      <div className="map-wrap">
        <ReactMapGL className="mapb"
          {...this.state.viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          // onViewportChange={this._updateViewport}
          // onViewportChange={viewport => this._onViewportChange(viewport)}
          onViewportChange={this._updateViewport}

          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
          onClick={this._onClickMap}
        >
          {locations && locations.map(this._renderMarker)}
          {this._renderPopup()}
          {this.state.pinLong !== 0 && (
            <Marker longitude={this.state.pinLong} latitude={this.state.pinLat}>
              <MapPin size={20} />
            </Marker>
          )}
          <div className="nav" style={navStyle}>
            <NavigationControl className="navigation" onViewportChange={this._updateViewport} />
          </div>
        </ReactMapGL>


      </div>
    );
  }
}

export default withRouter(Map);
