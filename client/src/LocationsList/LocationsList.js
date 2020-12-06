import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./LocationList.css";
import ModalUpdateLocation from "../ModalUpdateLocation/ModalUpdateLocation"
let faves = []
class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalUpdate: false,
      location: null,
      isFavorite: false,
      isFave: null,
      locations: this.props.locations
    };
  }

  showModalUpdate = (arr) => {
    // console.log(arr)
    this.setState({ showModalUpdate: !this.state.showModalUpdate });
    this.setState({ location: arr })

  };


  favClick = (loc) => {
    console.log(loc)
    if (faves.includes(loc)) {
      let fav = faves.indexOf(loc)
      faves.splice(fav, 1)
    } else {
      faves.push(loc)
      // console.log(faves)
      this.setState({ faves: faves })
    }

  }

  renderFaves = (locations, faves) => {

    // console.log(locations, faves)
    return (
      locations &&
      locations.map((location, index) => (
        faves.includes(location) &&
        this.renderList(location, index)
      ))
    )
  }



  renderDateOrder = (locationsTemp) => {

    console.log('locTemp', locationsTemp)
    let locationsOrder = locationsTemp
    console.log(locationsOrder)
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const dateA = a.createdAt
      const dateB = b.createdAt

      let comparison = 0;
      if (dateA > dateB) {
        comparison = 1;
      } else if (dateA < dateB) {
        comparison = -1;
      }
      return comparison;
    }

    locationsOrder.sort(compare);
    console.log(locationsOrder)
    console.log(locationsTemp)
    // this.setState({dateOrder: locations})
    return (
      locationsOrder.map((location, index) => (
        this.renderList(location, index)
      ))
    )

  }


  renderAll = (locations) => {

    return (
      locations &&
      locations.map((location, index) => (
        this.renderList(location, index)
      ))
    )
  }

  renderClickedLocation = (location) => {
    // console.log(location)
    this.props.clickedLocation(location)
    this.setState({ ClickedLocation: location })


  }

  renderList = (location, index) => {

    let className
    if (this.state.ClickedLocation === location) {
      className = "clickedLocation"

    }

    return (
      <div className={`location-wrapper ${className}`}>
        <div
          key={index}
          className={`location`}
          onClick={() => this.renderClickedLocation(location)}
        >
          <div className='left-panel'>
            <p className="location-name">
              {location.city + ' '}
            </p>

            <div className='icons'>
              <span className='icons-wrapper'>
                <span className='favStar' name={'name'} value={location.city} onClick={() => this.favClick(location)}> {this.state.faves && this.state.faves.includes(location) ? <span className="blueheart">💙</span> : <span className="greenheart">💚</span>}
                </span>

                <Link to={{
                  pathname: '/home/update_location',
                  linkProps: {
                    location: location
                  }
                }}>

                  {/* <span className='pencil' name={'name'} value={location.city}><span>🖋</span>
                </span> */}
                </Link>

                {/* <span className='pencil' name={'name'} value={location.city} onClick={() => this.showModalUpdate(location)}><span>📖</span>
              </span> */}
              </span>
            </div>
          </div>
          <span className="stubborn">{location.country}</span>
        </div>
        <img
          src={
            location.images[0].imageBase64 &&
            location.images[0].imageBase64
          }
          alt={location.images[0].name}
        />

      </div>




    )
  }


  render() {
    const { locations } = this.props;
    // console.log('fav', this.props.renderFavsStatus)
    // console.log('date', this.props.renderDateStatus)
    let locationsTemp = [...this.state.locations]
    // console.log('state.loc', this.state.locations)
    // console.log(locationsTemp)
    // console.log('locations props', this.props)
    // console.log('locations state', this.state)
    return (
      <div className="locationsList">

        {this.props.renderFavsStatus &&
          this.state.faves && this.state.faves && this.renderFaves(locationsTemp, this.state.faves && this.state.faves)}

        {this.props.renderDateStatus &&
          this.renderDateOrder(locationsTemp)}

        {!this.props.renderFavsStatus && !this.props.renderDateStatus &&
          this.renderAll(this.state.locations)}

        {/* {this.state.showModalUpdate ?
          <ModalUpdateLocation
            handleClose={this.showModalUpdate}
            location={this.state.location}
            getLocations={this.props.getLocations}
          >

          </ModalUpdateLocation> : null} */}
      </div>
    );
  }
}

export default LocationsList;
