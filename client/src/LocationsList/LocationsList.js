import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import "./LocationList.scss";
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
      this.setState({ faves: faves })
    }
  }

  renderFaves = (locations, faves) => {
    return (
      locations &&
      locations.map((location, index) => (
        faves.includes(location) &&
        this.renderList(location, index)
      ))
    )
  }

  renderDateOrder = (locationsTemp) => {

    let locationsOrder = locationsTemp
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
    this.props.clickedLocation(location)
    this.setState({ ClickedLocation: location })
  }

  renderList = (location, index) => {
    let className
    if (this.state.ClickedLocation === location) {
      className = "clicked-location"
    }

    return (
      <div className={`location-wrapper ${className}`}>
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
                <span className='fav-star' name={'name'} value={location.city} onClick={() => this.favClick(location)}> {this.state.faves && this.state.faves.includes(location) ? <span className="blueheart">💙</span> : <span className="greenheart">💚</span>}
                </span>
                <span className='fav-star' name={'name'} value={location.city} onClick={() => this.props.history.push({
                  pathname: '/show_location',
                  location: location
                })}> {<span className="blueheart">👁</span>}
                </span>



                {/* <Link to={{
                  pathname: '/show_location',
                  location: location

                }}>

                  <span className='pencil' name={'name'} value={location.city}><span>👁</span>
                  </span>
                </Link> */}

              </span>

            </div>
          </div>
        </div>
        {/* <img
          src={
            location.images[0].imageBase64 &&
            location.images[0].imageBase64
          }
          alt={location.images[0].name}a
        /> */}

      </div>
    )
  }


  render() {
    const { locations } = this.props;
    let locationsTemp = [...this.state.locations]

    return (
      <div className="locations-list">

        {this.props.renderFavsStatus &&
          this.state.faves && this.state.faves && this.renderFaves(locationsTemp, this.state.faves && this.state.faves)}

        {this.props.renderDateStatus &&
          this.renderDateOrder(locationsTemp)}

        {!this.props.renderFavsStatus && !this.props.renderDateStatus &&
          this.renderAll(this.state.locations)}


      </div>
    );
  }
}

export default withRouter(LocationsList)
