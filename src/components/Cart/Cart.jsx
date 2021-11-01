import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import './Cart.css'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cars: [],
            cartTotal: 0,
            showSuccess: false,
        }
    }

    componentDidMount() {
        this.getShoppingCart();
    }

    getShoppingCart = async () => {
        let cartCarDetails = await axios.get(`https://localhost:44394/api/shoppingcart/details/${this.props.user.id}`);
        cartCarDetails = cartCarDetails.data
        let carArray = []
        let total = 0
        for (let x = 0; x < cartCarDetails.length; x++){
            carArray.push(cartCarDetails[x]);
            total+= cartCarDetails[x].extendedPrice
        }
        console.log(cartCarDetails);
        this.setState({
            cars: carArray,
            cartTotal: total
        })
    }

    deleteCar = async (carId) => {
        await this.props.removeCarFromCart(carId)
        let newCarList = this.state.cars
        for (let x = 0; x < this.state.cars; x++){
            if (this.state.cars.carId === carId){
                newCarList.slice(x, 1);
            }
        }
        this.getShoppingCart()
    }

    createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.state.cartTotal,
              },
            },
          ],
        });
    }
    
      onApprove(data, actions) {
        this.state.cars.map(car => {
            this.props.removeCarFromCart(car.carId) 
        })
        this.setState({
            cars: [],
            cartTotal: 0,
            showSuccess: true,
        })
        this.props.carsInCart = 0
        return actions.order.capture();
      }

    render() {
    return ( 
        <div className="container mx-auto my-auto overflow-hidden shadow shopping-cart-text" id='cart-panel'>
            <div className="row align-item-middle">
                <div className="col-md-7 m-2 p-5" align = "center" >
                    <div className='shopping-cart-title'>Shopping Cart</div>
                    <Table striped borderless hover className = "cartTable">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className = "cartTable">
                            {this.state.cars.map(car => {
                                return <tr key = {car.carId}><td>{car.make} {car.model}</td><td>${car.price}</td><td>{car.quantity}</td><td>
                                    <Button onClick = {() => this.deleteCar(car.carId)} id='form-button-style'>Delete</Button></td></tr>
                            })}
                        </tbody>
                    </Table>
                    <Alert variant="success" onClose={() => this.setState({showSuccess: false})} dismissible show = {this.state.showSuccess}>
                        <Alert.Heading>Payment Approved!</Alert.Heading>
                        <p>
                          Congratulations, your order has successfully been placed!
                        </p>
                        </Alert>
                </div>
                <div className="col-md-3 p-5 checkout-background ms-auto shopping-cart-text-color shadow overflow-auto" align = "center">
                    <h2 className='shopping-cart-title mt-3'>Checkout</h2>
                    <br />
                    <p>Total | ${(this.state.cartTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    <PayPalScriptProvider>
                        <PayPalButtons
                          createOrder={(data, actions) => this.createOrder(data, actions)}
                          onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
     );
    }
}
 
export default Cart;