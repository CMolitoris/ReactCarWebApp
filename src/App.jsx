import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import './App.css';
import jwtDecode from 'jwt-decode';
import NavBar from './components/Navbar/Navbar';
import axios from 'axios';

class App extends Component {
  state = {
    loggedUser: null
  }
  registerURL = "https://localhost:5000/api/authentication/"
  loginURL = "https://localhost:5000/api/authentication/login"

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try{
      const user = jwtDecode(jwt);
      this.setState({
        loggedUser: user
      });
    } catch(err){
      console.log("Error in component Did mount", err)
      }
    }

    registerUser = async (userToRegister) => {
      try {
        let response = await axios.post(this.registerURL, userToRegister);
        console.log(response);
      } catch(err){
        console.log("🚀 ~ file: App.js ~ line 39 ~ App ~ registerUser= ~ err", err)
      }
    }

    loginUser = async (userToLogin) => {
      try {
        const response = await axios.post(this.loginURL,userToLogin)
        console.log(response);
        localStorage.setItem('token', response.token)
        window.location = "/";
        
      } catch(err){
        console.log("🚀 ~ file: App.js ~ line 41 ~ App ~ loginUser= ~ err", err)
      }
    }
  
  
  render() {
    return (
      <div className="App">
        <NavBar user = {this.state.loggedUser} login={this.loginUser} registerUser={this.registerUser}/>
        <div>
        <Switch>
          {/* Home Page */}
          <Route path = "/" exact />
          {/* Product Page */}
          <Route path = "/products" />
          {/* Search Page */}
          <Route path = "/search"/>
          {/* Seller Page logged in*/}
          <Route path = "/seller" />
          {/* Cart/Account logged in*/}
          <Route path = "/account" />
          {/* Invalid Page Redirect */}
          <Redirect to='/not-found' />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
