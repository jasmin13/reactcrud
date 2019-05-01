import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/home/Home";
import Add from "./components/home/Add";
import Edit from "./components/home/Edit";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/add" component={Add} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
