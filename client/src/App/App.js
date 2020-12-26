import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header"
import Home from "../Home/Home";
import { Route } from "react-router-dom"

class App extends Component {
  state = {
    renderFavsStatus: false,
    renderDateStatus: false,
  }

  renderList = (e) => {
    e.target.getAttribute('value') === 'favs' ?
      this.setState({
        renderFavsStatus: true
      }) :
      this.setState({
        renderFavsStatus: false
      })

    e.target.getAttribute('value') === 'date' ?
      this.setState({
        renderDateStatus: true
      }) :
      this.setState({
        renderDateStatus: false
      })
  }
  render() {

    return (
      <div className="App">
        <Header renderList={this.renderList} />
        <div className="app-margin">

          <Route path="/" render={(props) => <Home {...props}
            renderFavsStatus={this.state.renderFavsStatus}
            renderDateStatus={this.state.renderDateStatus}
          />} />
         </div>
      </div>
    );
  }
}

export default App;
