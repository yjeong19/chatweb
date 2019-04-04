import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./views/dashboard";
import LoginPage from "./views/login";
import PrivateRoute from "./components/privateRoute";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <PrivateRoute exact path="/chat" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
