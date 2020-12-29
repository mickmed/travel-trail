import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import "./LocationList.scss";
let faves = []

class LocationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      isFavorite: false,
      isFave: null,
      locations: this.props.locations
    };
  }

  favClick = (loc) => {
    console.log(loc)
    if (faves.includes(loc)) {
      let fav = faves.indexOf(loc)
      faves.splice(fav, 1)
    } else {
      faves.push(loc)
      this.setState({ faves: faves })
    }
  }

  renderClickedLocation = (location) => {
    this.props.clickedLocation(location)
    this.setState({ ClickedLocation: location })
  }

  renderFaves = (locations, faves) => {
    console.log(locations, faves)
    return (
      locations &&
      faves.map((location, index) => (
        // faves.includes(location) &&
        this.renderList(location, index)
      ))
    )
  }

  renderDateOrder = (locationsTemp) => {
    let locationsOrder = locationsTemp
    function compare(a, b) {
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

  

  renderList = (location, index) => {
    let className
    if (this.state.ClickedLocation === location) {
      className = "clicked-location"
    }

    return (
      <div className={`location-wrapper ${className}`} onDoubleClick={() => this.props.history.push({
        pathname: '/show_location',
        location: location
      })}>
        <div
          key={index}
          className={`location`}
          onClick={() => this.renderClickedLocation(location)}
        >
          <p className="location-name">
            {location.city + ' '}
          </p>
          <div className="country-wrapper">
            <span className="country">{location.country}</span>
            <div className='icons'>
              <span className='icons-wrapper'>
                <span className='heart' name={'name'} value={location.city} onClick={() => this.favClick(location)}> {this.state.faves && this.state.faves.includes(location) ? <span className="heart">💚</span> : <span className="heart">💜</span>}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    const { locations, renderFavsStatus, renderDateStatus } = this.props
    const { faves } = this.state
    let locationsTemp = [...this.state.locations]
    console.log(locationsTemp)

    return (
      <div className="locations-list">

        {renderFavsStatus &&
          faves && faves && this.renderFaves(locationsTemp, faves && faves)}

        {renderDateStatus &&
          this.renderDateOrder(locationsTemp)}

        {!renderFavsStatus && !renderDateStatus &&
          this.renderAll(locations)}


      </div>
    );
  }
}

export default withRouter(LocationsList)
