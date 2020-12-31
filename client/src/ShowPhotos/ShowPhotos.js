import React from "react";
import "./ShowPhotos.css";
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import { Redirect } from "react-router-dom"

class ShowPhotos extends React.Component {
  state = {
    redirect: false
  }

  handleRedirect = () => {

    this.setState({
      redirect: true
    })

  }

  render() {
    let redirect = this.state.redirect && <Redirect to={"/home"} />
    return (
      <div >
        <section className="show-photos">
          <button onClick={this.handleRedirect}>close</button>
          <SimpleSlider locationInfo={this.props.location.locationInfo} />

        </section>
        {redirect}
      </div>
    )
  }
}

export default ShowPhotos
