import React, { Component } from "react";

import "./App.css";
import Header from "../Header/Header"
import Map from "../Map/Map";
import LocationsList from "../LocationsList/LocationsList";
import ShowPhotos from "../ShowPhotos/ShowPhotos"
import Home from "../Home/Home";
import Info from "../Info/Info"
import { Route, Link, Redirect, Switch } from "react-router-dom"
// import Test from "../Test/test.js"
import LocationAdd from "../LocationAdd/LocationAdd.js"
import Test from "../test"

class App extends Component {
  state = {
    renderFavsStatus: false,
    renderDateStatus: false,
  }


  renderList = (e) => {

    // console.log(e.target.getAttribute('value'))
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

        <div className="AppMargin">
         
            <Route exact path="/" render={(props) => <Redirect to={"/home"} {...props}
              renderFavsStatus={this.state.renderFavsStatus}
              renderDateStatus={this.state.renderDateStatus}
            />} />


            <Route path="/home" render={(props) => <Home {...props}
              renderFavsStatus={this.state.renderFavsStatus}
              renderDateStatus={this.state.renderDateStatus}
            />} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/showpics" component={ShowPhotos} />


        </div>


      </div>
    );
  }
}
// function Home({ match }) {
//   console.log(match.url)
//   return (
//     <div>
//       <Link to={`${match.url}/info`}>Components</Link>

//       <Route path={`${match.path}/:id`} component={Send} />
//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       /></div>)

// }
// function Send({ match }) {
//   return <h3>Requested Param: {match.params.id}</h3>
// }
export default App;
