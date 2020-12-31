import React, { Component } from "react";
import Header from "../Header/Header"
import Layout from "../Layout/Layout";
import { Route } from "react-router-dom"
import "./App.css";

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

        <Route path="/" render={(props) => <Layout {...props}
          renderFavsStatus={this.state.renderFavsStatus}
          renderDateStatus={this.state.renderDateStatus}
        />} />
      </div>
    );
  }
}

export default App;
