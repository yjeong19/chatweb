import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './views/dashboard';
import LoginPage from './views/login';
import PrivateRoute from './components/privateRoute';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      message: '',
      receivedMsg: ['test'],
      room: ''
    }
  }


   
  render() {
    return (
    <Router>
      <div className="App" >
       <Route exact path='/' component={LoginPage}/>
       <PrivateRoute exact path='/chat' component={Dashboard}/>
      </div>
    </Router>
    );
  }
}


export default App;
