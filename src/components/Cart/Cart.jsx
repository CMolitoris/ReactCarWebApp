import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import './Cart.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cars: [],
            userId: this.props.user.id,
            cartTotal: 0,
        }
    }

    componentDidMount() {
        this.getShoppingCart();
    }

    getShoppingCart = async () => {
        let cartCarDetails = await axios.get(`https://localhost:44394/api/shoppingcart/details/${this.state.userId}`)
        let carArray = []
        let total = 0
        for (let x = 0; x < cartCarDetails.data.length; x++){
            carArray.push(cartCarDetails.data[x]);
            total+= cartCarDetails.data[x].price
        }
        this.setState({
            cars: carArray,
            cartTotal: total
        })
    }

    deleteCar = async (carId) => {
        await this.props.removeCarFromCart(this.state.userId ,carId)
        let newCarList = this.state.cars
        for (let x = 0; x < this.state.cars; x++){
            if (this.state.cars.carId === carId){
                newCarList.slice(x, 1);
            }
        }
        this.getShoppingCart()
    }

    

    render() {
    return ( 
        <div className="container mx-auto my-auto">
            <div className="row">
                <div className="col"></div>
                <div className="col-lg-6 m-2 p-5 cartTableContainer background" align = "center">
                    <h2>Shopping Cart</h2>
                    <Table className = "cartTable">
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
                                    <Button onClick = {() => this.deleteCar(car.carId)} variant = "light">Delete</Button></td></tr>
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="col-lg-3 m-2 p-5 background" align = "center">
                    <h2>Checkout</h2>
                    <br />
                    <p>Total: ${(this.state.cartTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    <PayPalScriptProvider options={{"client-id": "AVG4Oa1RLFSqTn602N2kjF7l-qmZoqeTmXAkmQlfOmZqm3qo3IceqspCV_4o6dnYo7rOFjtva3CkG-l4"}}>
                        <PayPalButtons total = {this.state.cartTotal} updateOrder = {this.createOrder} style={{layout: "vertical"}} />
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
     );
    }
}
 
export default Cart;