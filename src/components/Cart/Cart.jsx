import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Cart = (props) => {
    const [userCars, setUserCars] = useState({cars: []})

    useEffect(() => {
        getShoppingCart()
    }, [])

    const getShoppingCart = async () => {
        let cartCarDetails = await axios.get(`https://localhost:44394/api/shoppingcart/details/${props.user.id}`)
        console.log(cartCarDetails.data)
        setUserCars({
            cars: userCars.cars.push(cartCarDetails)
        })
        console.log(userCars)
    }

    return ( 
        <div className="container mx-auto my-auto" id = "main-panel">
            <div className="row">
                <div className="col"></div>
                <div className="col-lg-6" align = "center">
                    <h2>Shopping Cart</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
                <div className="col"></div>
            </div>
        </div>
     );
}
 
export default Cart;