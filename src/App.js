import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import './App.css';
import jwtDecode from 'jwt-decode';
import NavBar from './components/Navbar/Navbar';

class App extends Component {
  state = {
    loggedUser: null
  }

  componentDidMount() {
    this.setUserToken();
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

    setUserToken = () => {
      localStorage.setItem('token', '');
    }
  
  
  render() {
    return (
      <div className="App">
        <NavBar user = {this.state.loggedUser}/>
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
