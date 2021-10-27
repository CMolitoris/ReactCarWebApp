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
import CarDetails from './components/CarDetails/CarDetails';


class App extends Component {
  state = {
    loggedUser: null,
    loginModalShow: false,
    regModalShow: false,
    cars: [],
    carDetails: []
  }

  registerURL = "https://localhost:44394/api/authentication/"
  loginURL = "https://localhost:44394/api/authentication/login"
  updateAddressURL = "https://localhost:44394/api/users/complete/"

  componentDidMount() {
    this.getAllCars();
    this.getToken();
  }

    getToken = () => {
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
        let response = await axios.put(`${this.updateAddressURL}${this.state.loggedUser.id}`, updateInfo);
        window.location = "/account";
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
        this.getToken();
        this.getUserDetails(this.state.loggedUser.id);
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 51 ~ App ~ loginUser= ~ err", err)
      }
    }

    getUserDetails = async (userId) => {
      try{
      let response = await axios.get(`https://localhost:44394/api/users/${userId}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      this.setState({
        loggedUser: response.data
      })
      if (this.state.loggedUser.streetAddress == null || this.state.loggedUser.city == null || this.state.loggedUser.state == null){
        //Redirect user to add address details page
        window.location = "/account"
      }
      }catch(err) {
        console.log("Error in getting user details", err)
      }
    }

    toggleLoginModal = () => {
      this.setState({
        loginModalShow: !this.state.loginModalShow
      })
    }

    toggleRegModal = () => {
      this.setState({
        regModalShow: !this.state.regModalShow
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

    getSingleCar = async (carID) => {
      try{
        let response = await axios.get(`https://localhost:44394/api/car/${carID}`);
        this.setState({
            cars: response.data
        });
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 116 ~ App ~ getAllCars= ~ err", err)
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
      let response = await axios.post('https://localhost:44394/api/shoppingcart/',car);
      console.log(response);
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
        <NavBar user = {this.state.loggedUser} login={this.loginUser} logoutUser = {this.logoutUser} toggleLogModal = {this.
          toggleLoginModal} toggleRegModal = {this.toggleRegModal}/>
        {this.state.loginModalShow && <Login login = {this.loginUser}modalShow = {this.state.loginModalShow} toggleModal={this.toggleLoginModal}/>}
        {this.state.regModalShow && <RegisterUser register = {this.registerUser} modalShow = {this.state.regModalShow} toggleModal={this.toggleRegModal} registerUser={this.registerUser}/>}
        <div>
        <Switch>
          {/* Home Page */}
          <Route path = "/" exact component={Landing}  />
          {/* Product Page */}
          <Route path = "/products" render={props => <Products {...props} user={this.state.loggedUser} addToCart={this.addToCart} cars={this.state.cars} getAllCars={this.getAllCars} getSingleCar={this.getSingleCar}/>} />
          {/* Product Page */}
          <Route path = "/car-details" render={props => <CarDetails {...props} user={this.state.loggedUser} addToCart={this.addToCart} cars={this.state.cars} getAllCars={this.getAllCars} getSingleCar={this.getSingleCar}/>} car={this.state.carDetails} />
          {/* Search Page */}
          <Route path = "/search"/>
          {/* Seller Page logged in*/}
          <Route path = "/seller" />
          {/* Cart/Account logged in*/}
          <Route path = "/account" render = {props => <EditAccount {...props }updateDetails = {this.updateAddressDetails}/>} />
          {/* Invalid Page Redirect */}
          <Redirect to='/not-found' />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
