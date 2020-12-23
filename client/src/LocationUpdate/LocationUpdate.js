import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import './LocationUpdate.css'
import Uploader from '../Uploader/Uploader.js'
import api from '../Services/ApiHelper'

class LocationUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      redirect: false,
      deleting: false,
      // linkProps: this.props && this.props.location.locationInfo

    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

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

    let redirectFromRefresh = !this.props.location.location && <Redirect to={'/'} />
    let uploader = this.state.deleting ? '' : <Uploader update={true} getLocations={this.props.getLocations} />
    return (
      <div className={"modalAddLocation"}>
        <section className="modalMainAddLocation">
          <div className="toprowAddLocation">
            <h1 className="title">Edit location</h1>
            {redirectFromRefresh}


            <button
              className="deleteButton"
              onClick={(e) => this.deleteLocation(e)}
              name="delete"
              value={this.props.location.location && this.props.location.location.id}>
              {this.state.deleting ? '...deleting' : 'Delete'}
            </button>

            <Link to="/">
              <button onClick={this.props.handleClose}>
                close
              </button>
            </Link>

          </div>

          {uploader}


        </section>
      </div>
    );
  }
}

export default withRouter(LocationUpdate)


