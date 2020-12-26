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


  deleteLocation = async event => {
    event.preventDefault();

    try {

      api.delete("/locations/" + parseInt(event.target.value))
      console.log('help me')
      await this.props.getLocations()
      this.props.history.push('/')



    } catch (err) {
      console.log(err);
    }

  };
  render() {

    console.log(this.state)
    const { latitude, longitude, city, country, summary, Images } = this.state.location
    let redirectFromRefresh = !this.props.location.location && <Redirect to={'/'} />
    let uploader = this.state.deleting ? '' : <Uploader update={true} getLocations={this.props.getLocations} />
    return (
      <div className={"show-location"}>
        <section className="show-location-section">
          <div className="title-wrapper">
            <h1 className="title">Show location</h1>
            {redirectFromRefresh}




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
          <div className='lat-long'>
            <div>{latitude}</div>
            <div>{longitude}</div>
          </div>
          <div className='location-info'>
            <div>{city}</div>
            <div>{country}</div>
            <div>{summary}</div>
          </div>
          <div classsName='images'>
            {Images && Images.map(image => (
              <img src={image.imageBase64} alt="img" />

            ))}

          </div>




          {/* 
          {uploader} */}


        </section>
      </div>
    );
  }
}

export default withRouter(LocationShow)


