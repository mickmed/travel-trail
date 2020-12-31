import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import Uploader from '../Uploader/Uploader.js'
import api from '../Services/ApiHelper'
import './LocationUpdate.css'

class LocationUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      redirect: false,
      deleting: false,

    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  deleteLocation = async event => {
    event.preventDefault();
    try {
      api.delete("/locations/" + parseInt(event.target.value))
      this.props.history.push({ pathname: '/', images: 'images' })

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { location, handleClose } = this.props
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
              value={location.location && location.location.id}>
              {this.state.deleting ? '...deleting' : 'Delete'}
            </button>

            <Link to="/">
              <button onClick={handleClose}>
                close
              </button>
            </Link>
          </div>
          {uploader}
        </section>
      </div>
    )
  }
}

export default withRouter(LocationUpdate)


