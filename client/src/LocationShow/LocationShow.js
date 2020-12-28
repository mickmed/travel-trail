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
      // linkProps: this.props && this.props.location.locationInfo

    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {
    console.log(this.props)
    this.setState({ location: this.props.location.location })
  }
  // handleEdit = async event => {
  //   event.preventDefault();
  //   this.props.handleClose();

  //   let answer = window.confirm('Are you sure you want to edit?');
  //   if (answer === true) {
  //     let updateInfo = {
  //       city: this.state.city,
  //       country: this.state.country,
  //       summary: this.state.summary,
  //     };

  //     axios
  //       .put(
  //         `http://localhost:3000/locations/${this.props.location.locationInfo.id}`,
  //         updateInfo
  //       )
  //       .then(res => console.log(res.data));
  //   }
  // };
  //component mounts before props from modal are passed, so this is needed to set state for controlled form
  // componentDidUpdate(prevProps) {
  //   console.log('here')
  //   prevProps !== this.props &&
  //     this.setState({
  //       city: this.props.location && this.props.location.locationInfo.city,
  //       country: this.props.location && this.props.location.locationInfo.country,
  //       summary: this.props.location.location && this.props.locationInfo.summary
  //     })
  // }



  render() {

    console.log(this.state)
    const { latitude, longitude, city, country, summary, Images } = this.state.location
    let redirectFromRefresh = !this.props.location.location && <Redirect to={'/'} />
    let uploader = this.state.deleting ? '' : <Uploader update={true} getLocations={this.props.getLocations} />
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
              <button onClick={this.props.handleClose}>
                close
            </button>
            </Link>
            <Link to={{
              pathname: '/update_location',
              location: this.state.location

            }}>

              <span className='pencil' name={'name'} value={this.state.location.city}><span>🖋</span>
              </span>
            </Link>
          </div>
        </div>


      </div>
    );
  }
}

export default withRouter(LocationShow)


