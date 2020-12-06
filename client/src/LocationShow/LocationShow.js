import React, { Component } from "react";
import "./ModalShowLocation.css";
// import { Link } from "react-router-dom";

// const Modal = ({ handleClose, show, children, locationInfo }) => {
class ModalShowLocation extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const showHideClassName = show ? "modal displayBlock" : "modal displayNone";

  
    return (
      <div className={showHideClassName}>
        <section className="modalMain">
          {children}

          {/* {locationInfo.id} */}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  }
}

export default ModalShowLocation;
