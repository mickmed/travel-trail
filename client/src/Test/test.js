import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Topic from './Topic.js'


import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Test extends Component {
    render(){
      return (    
          <div>
          <h2>Topics</h2>
  
          
              <Link to={`${this.props.match.url}/components`}>Components</Link>
          
              <Link to={`${this.props.match.url}/props-v-state`}>Props v. State</Link>
         
  
          <Route path={`${this.props.match.path}/:id`} component={Topic} />
          <Route
          exact
          path={this.props.match.path}
          render={() => <h3>Please select a topic.</h3>}
          />
      </div>
      );
    }
  }
  function Topic({ match }) {
      return <h3>Requested Param: {match.params.id}</h3>;
    }
  export default Test