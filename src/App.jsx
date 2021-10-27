import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import './App.css';
import jwtDecode from 'jwt-decode';
import NavBar from './components/Navbar/Navbar';
import axios from 'axios';
import Login from './components/Login/Login';
import RegisterUser from './components/RegisterUser/RegisterUser';
import Landing from './components/Landing/Landing';
import EditAccount from './components/Account/EditAccount';
import Products from './components/Products/Products';

class App extends Component {
  state = {
    loggedUser: null,
    loginModalShow: false,
    car: [],
    cars: []
  }

  registerURL = "https://localhost:44394/api/authentication/"
  loginURL = "https://localhost:44394/api/authentication/login"
  updateAddressURL = "https://localhost:44394/api/users/complete/"

  componentDidMount() {
    this.getAllCars()
    const jwt = localStorage.getItem('token');
    try{
      const user = jwtDecode(jwt);
      this.setState({
        loggedUser: user
      });
    } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 26 ~ App ~ componentDidMount ~ err", err)
      }
  }

    updateAddressDetails = async (updateInfo) => {
      try {
        debugger
        let response = await axios.put(`${this.updateAddressURL}${this.state.loggedUser.id}`, updateInfo);
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 36 ~ App ~ updateAddressDetails= ~ err", err)
      }
    }

    registerUser = async (userToRegister) => {
      try {
        let response = await axios.post(this.registerURL, userToRegister);
        this.loginUser({'username': userToRegister.username, 'password': userToRegister.password})
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 40 ~ App ~ registerUser= ~ err", err)
      }
    }

    loginUser = async (userToLogin) => {
      try {
        const response = await axios.post(this.loginURL, userToLogin);
        localStorage.setItem('token', response.data.token)
        window.location = "/";
        
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 51 ~ App ~ loginUser= ~ err", err)
      }
    }

    toggleLoginModal = () => {
      this.setState({
        loginModalShow: !this.state.loginModalShow
      })
    }

    logoutUser = () => {
      localStorage.removeItem('token');
      window.location = "/";
      this.setState({
        loggedUser: null
      })
    }

    getAllCars = async () => {
      let response = await axios.get('https://localhost:44394/api/car');
      this.setState({
          cars: response.data
      });
    }

    getCar = async (carID) => {
      try{
        let response = await axios.get(`https://localhost:44394/api/car/${carID}`);
        this.setState({
            car: response.data
        });
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 96 ~ App ~ getCar= ~ err", err)
      }
    }

    postCar = async (car) => {
      await axios.post('https://localhost:44394/api/car/', car)
      .then( res => {
        this.getAllCars();
        })
      .catch(err => {
        console.log(err);
      });
    }

    editCar = async (id, car) => {
      const path = 'https://localhost:44394/api/car/edit/' + id + '/'
      await axios.put(path, car)
      .then(res => {
        this.getAllCars();
        })
      .catch(err => {
        console.log(err);
      });
    }

    addToCart = async (car) => {
      try {
        let response = await axios.post('https://localhost:44394/api/shoppingcart/',car);
        console.log(response);
      } catch (e) {
        console.log("Error in add to cart: " + e); 
      }
    }

    completeAddressDetails = async (addressDetails) => {
      let userId = this.state.loggedUser.Id;
      try {
        let response = await axios.post(`https://localhost:44394/api/users/complete/${userId}`,addressDetails);
        console.log(response);
      } catch (e) {
        console.log("Error in completeAddressDetails: " + e); 
      }
    }

    editUser = async (userDetails) => {
      let userId = this.state.loggedUser.Id;
      try {
        let response = await axios.post(`https://localhost:44394/api/users/edit/${userId}`,userDetails);
        console.log(response);
      } catch (e) {
        console.log("Error in editUser: " + e); 
      }
    }

    postRating = async (rating) => {
      try {
        let response = await axios.post(`https://localhost:44394/api/rating/`,rating);
        console.log(response);
      } catch (e) {
        console.log("Error in postRating: " + e); 
      }
    }

  render() {
    return (
      <div className="App">
        <NavBar user = {this.state.loggedUser} login={this.loginUser} logoutUser = {this.logoutUser} toggleModal = {this.toggleLoginModal}/>
        <div>
        <Switch>
          {/* Home Page */}
          <Route path = "/" exact component={Landing}  />
          {/* Product Page */}
          <Route path = "/products" render={props => <Products {...props} postRating={this.postRating} userId={this.state.loggedUser.Id} addToCart={this.addToCart} cars={this.state.cars} getAllCars={this.getAllCars}/>} />
          {/* Search Page */}
          <Route path = "/search"/>
          {/* Seller Page logged in*/}
          <Route path = "/seller" />
          {/* Cart/Account logged in*/}
          <Route path = "/account" render = {props => <EditAccount {...props } updateDetails = {this.updateAddressDetails}/>} />
          {/* Login Page */}
          <Route path = "/login" render = {props => <Login {...props} login = {this.loginUser}modalShow = {this.state.loginModalShow} toggleModal={this.toggleLoginModal}/>} />
          {/* Register user */}
          <Route path = "/register" render = {props => <RegisterUser {...props} register = {this.registerUser} modalShow = {this.state.loginModalShow} toggleModal={this.toggleLoginModal} registerUser={this.registerUser}/>} />

          {/* Invalid Page Redirect */}
          <Redirect to='/not-found' />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
