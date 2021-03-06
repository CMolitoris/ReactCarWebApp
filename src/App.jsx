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
import Seller from './components/Seller/Seller';
import Cart from './components/Cart/Cart';


class App extends Component {
  state = {
    loggedUser: null,
    loginModalShow: false,
    regModalShow: false,
    cars: [],
    car: [],
    location: null,
    ratings: [],
    sellerFlag: true,
    carModels: [],
    carData: [],
    carsInCart: 0,
    userInfo: ''
  }

  registerURL = "https://localhost:44394/api/authentication/"
  loginURL = "https://localhost:44394/api/authentication/login"
  updateAddressURL = "https://localhost:44394/api/users/complete/"

  componentWillMount() {
    this.getAllCars();
    let id = this.getToken();
    this.getUserDetails(id);
  }

    getToken = () => {
      const jwt = localStorage.getItem('token');
      try{
        const user = jwtDecode(jwt);
        this.setState({
          loggedUser: user
        });
        return user.id;
      } catch(err){
          console.log("🚀 ~ file: App.jsx ~ line 26 ~ App ~ componentDidMount ~ err", err)
        }
    }

    updateAddressDetails = async (updateInfo) => {
      try {
        await axios.put(`${this.updateAddressURL}${this.state.loggedUser.id}`, updateInfo);
        window.location = "/account";
      } catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 36 ~ App ~ updateAddressDetails= ~ err", err)
      }
    }

    registerUser = async (userToRegister) => {
      try {
        await axios.post(this.registerURL, userToRegister);
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
      let auth = localStorage.getItem('token');
      try{
      let response = await axios.get(`https://localhost:44394/api/users/${userId}`, {headers: {Authorization:`Bearer ${auth}`}})
      this.setState({
        userInfo: response.data
      })
      console.log(response.data)
      // if (this.state.loggedUser.streetAddress == null || this.state.loggedUser.city == null || this.state.loggedUser.state == null){
      //   //Redirect user to add address details page
      //   window.location = "/account"
      // }
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
      let location = window.location.pathname;
      this.setState({
        loggedUser: null
      })
      if (location === '/account' || location === '/seller' || location === '/not-found' || location === '/cart'){
        window.location = "/"
      }
    }

    getAllCars = async () => {
      let response = await axios.get('https://localhost:44394/api/car');
      this.getAllModels(response.data)
    }

    getAllModels = async (cars) => {
      let carModels = await axios.get('https://localhost:44394/api/car/all-models');
      this.setState({
        carModels: carModels.data,
        cars: cars
      });
    }

    //GET LAST CAR TO USE AS LAST INDEX
    getNextCarId = async () => {
      let response = await axios.get('https://localhost:44394/api/car/cars/last');
      console.log(response.data);
      return response.data;
      
    }

    postCarPhoto = async (carPhoto) => {
      console.log(carPhoto)
      let response = await axios.post(`https://localhost:44394/api/sellerphotos/`,carPhoto);
      console.log(response.data);
    }

    getSingleCar = async (singleCar) => {
      this.setState({
        car: singleCar
      })
    }

    postCar = async (car,sellerFlag = false,imageResponseData) => {
      await axios.post('https://localhost:44394/api/car/', car)
      .then( res => {
        this.getAllCars();
        })
      .catch(err => {
        console.log("Error in postCar: " + err);
      });

      // if(sellerFlag === true){
      //   let carId = await this.getNextCarId();
      //   this.addToSellerConnection({
      //       UserId: this.state.loggedUser.id,
      //       CarId: carId,
      //       Quantity: 1
      //   });
      // }
    }


    addToSellerConnection = async (car) => {
      try {
        await axios.post('https://localhost:44394/api/seller/',car);
      } catch (e) {
        console.log("Error from addSellerConnection: " + e);
      }
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
        await axios.post('https://localhost:44394/api/shoppingcart/',car);
        let cartTotal = this.state.carsInCart + 1
        this.setState({carsInCart: cartTotal})
      } catch (e) {
        console.log("Error from addShoppingCart: " + e);
      }
    }

    deleteFromCart = async (carId) => {
      try {
        await axios.delete(`https://localhost:44394/api/shoppingcart/${this.state.loggedUser.id}/${carId}`);
        let cartTotal = this.state.carsInCart - 1
        cartTotal = cartTotal > 0 ? cartTotal : 0
        this.setState({carsInCart: cartTotal})
      } catch (e) {
        console.log("Error in deleteFromCart: " + e); 
      }
    }

    deleteFromSellerConnection = async (userId,carId) => {
      try {
        await axios.delete(`https://localhost:44394/api/seller/${userId}/${carId}`);
      } catch (e) {
        console.log("Error in deleteFromSeller: " + e); 
      }
    }

    completeAddressDetails = async (addressDetails) => {
      let userId = this.state.loggedUser.Id;
      try {
        await axios.put(`https://localhost:44394/api/users/complete/${userId}`,addressDetails);
      } catch (e) {
        console.log("Error in completeAddressDetails: " + e); 
      }
    }

    editUser = async (userDetails) => {
      let userId = this.state.loggedUser.id;
      try {
        console.log(userDetails)
        await axios.put(`https://localhost:44394/api/users/edit/${userId}`, userDetails);
      } catch (e) {
        console.log("Error in editUser: " + e); 
      }
    }

    postRating = async (rating) => {
      try {
        await axios.post(`https://localhost:44394/api/rating/`,rating);
        this.getCarRatings(rating.CarId)
      } catch (e) {
        console.log("Error in postRating: " + e); 
      }
    }

    getAllRatings = async () => {
      try {
        await axios.get(`https://localhost:44394/api/rating/all/`);
      } catch (e) {
        console.log("Error in getAllRatings: " + e); 
      }
    }

    getCarRatings = async (carID) => {
      try {
        const response = await axios.get(`https://localhost:44394/api/rating/${carID}/`);
        this.setState({
          ratings: response.data
        })
      } 
      catch (err) {
        console.log("🚀 ~ file: App.jsx ~ line 240 ~ App ~ getCarRatings= ~ e", err)
      }
    }

 
  render() {
    const user = this.state.loggedUser
    return (
      <div className="App">
        <NavBar user = {this.state.loggedUser} login={this.loginUser} logoutUser = {this.logoutUser} 
        toggleLogModal = {this.toggleLoginModal} toggleRegModal = {this.toggleRegModal} carsInCart={this.state.carsInCart}/>
        {this.state.loginModalShow && <Login login = {this.loginUser} modalShow = {this.state.loginModalShow} toggleModal={this.toggleLoginModal}/>}
        {this.state.regModalShow && <RegisterUser register = {this.registerUser} modalShow = {this.state.regModalShow} toggleModal={this.toggleRegModal} registerUser={this.registerUser}/>}
        <div>
        <Switch>
          {/* Home Page */}
          <Route path = "/" exact component={Landing}  />
          {/* Product Page */}
          <Route path = "/products" render={props => <Products {...props} user={this.state.loggedUser} carModels = {this.state.carModels} addToCart={this.addToCart} cars={this.state.cars} getAllCars={this.getAllCars} getSingleCar={this.getSingleCar} car={this.state.car} getCarRatings={this.getCarRatings} />} />
          {/* Product Page */}
          <Route path = "/car-details" render={props => <CarDetails {...props} postRating={this.postRating} user={this.state.loggedUser} addToCart={this.addToCart} cars={this.state.cars} getAllCars={this.getAllCars} getSingleCar={this.getSingleCar} car={this.state.car} getCarRatings={this.getCarRatings} ratings={this.state.ratings}/>} />
          {/* Search Page */}
          {/* <Route path = "/search"/> */}
          {/* Cart Page */}
          <Route path = "/cart" render={props => {
            if (!user){
              return <Redirect to='/'/>;
            } else {
              return <Cart {...props} removeCarFromCart = {this.deleteFromCart} user = {this.state.loggedUser} carsInCart={this.state.carsInCart}/>;
            }}}/>
          {/* Seller Page logged in*/}
          <Route path = "/seller" render={props => {
            if (!user){
              return <Redirect to='/'/>;
            } else {
              return <Seller {...props} getNextCarId={this.getNextCarId} sellerFlag={this.state.sellerFlag} postCar={this.postCar} user={this.state.loggedUser}/>
            }}}/>
          {/* Cart/Account logged in*/}
          <Route path = "/account" render = {props => {
            if (!user){
              return <Redirect to='/'/>;
            } else {
              return <EditAccount {...props } userInfo = {this.state.userInfo} updateDetails = {this.editUser} user = {this.state.loggedUser}/>
          }}}/>
          {/* Invalid Page Redirect */}
          <Redirect to='/not-found' />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;