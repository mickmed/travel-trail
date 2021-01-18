import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import './LocationShow.scss'
import Uploader from '../Uploader/Uploader.js'
import api from '../Services/ApiHelper'

class LocationShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      redirect: false,
      deleting: false,
      location: ''

    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    const locationById = this.props.locations.find(location => location.id === this.props.location.location.id)
    console.log(locationById)
    this.setState({ location: locationById })
  }
 
  render() {

    const { latitude, longitude, city, country, summary, Images } = this.state.location
    let redirectFromRefresh = !this.props.location.location && <Redirect to={'/'} />
    // let uploader = this.state.deleting ? '' : <Uploader update={true} getLocations={this.props.getLocations} />
    return (

      <div className={`location-show`}>
        {redirectFromRefresh}
        <div className={`location`}>
          <div className='lat-long'>
            <div>{`lat: ${latitude && latitude.toFixed(4)}`}</div>
            <div>{`long: ${longitude && longitude.toFixed(4)}`}</div>
          </div>
          <p className="location-name">
            {city + ' '}
          </p>
          <div className="country-wrapper">
            <span className="country">{country}</span>
          </div>
          <div className='summary'>{summary}</div>
        </div>
        <div className='images'>
          {Images && Images.map(image => (
            <img src={image.imageBase64} alt="img" />

          ))}
          <div className='buttons'>
            <Link to="/">
            <span className='cross' name={'name'} value={this.state.location.city}><span>❌ </span>
              </span>
            </Link>
            <Link to={{
              pathname: '/update_location',
              location: this.state.location
            }}>
              <span className='pencil' name={'name'} value={this.state.location.city}><span>🖋 </span>
              </span>
            </Link>
          </div>
        </div>


      </div>
    );
  }
}

export default withRouter(LocationShow)


