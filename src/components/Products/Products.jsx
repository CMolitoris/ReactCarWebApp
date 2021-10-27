import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Products = (props) => {
    
    const [SearchTerm, setSearchTerm] = useState("")

    return ( 
        <div className="container">

            <Row xs={1} md={3} className="g-4">
                <input 
                    type="text" 
                    placeholder="Search By: Make, Model, or Type" 
                    className="form-control input-sm" 
                    onChange={(event) =>{setSearchTerm(event.target.value)}}
                />
                    {props.cars.filter(value =>{
                        if (SearchTerm === ""){
                            return value
                        } else if(
                            value.make.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                            || value.model.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                            || value.type.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                        ){
                            return value
                        }
                    }).map((car) =>(
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                                <Card.Body>
                                    <Card.Title>{car.make} {car.model}</Card.Title>
                                    <Card.Text>
                                        <p>${car.price}</p>
                                        <br />
                                        <p>Average Rating: {car.rating}</p>
                                    </Card.Text>
                                    <hr />
                                    <h6 className="font-weight-bold"> Description </h6>
                                    <Card.Text>
                                        {car.description}
                                    </Card.Text>
                                    <Card.Text>
                                            <Link to="/car-details">
                                                <Button variant="btn-link" onClick={() => props.getSingleCar(car.id)} size="lg">
                                                <span class="material-icons">info</span>
                                                Car Details
                                                </Button>   
                                            </Link>
                                    </Card.Text>
                                </Card.Body>
                                <Button onClick={() => props.addToCart({
                                        UserId: props.user.id,
                                        CarId: car.id,
                                        Quantity: 1
                                    })} variant="success" size="lg">
                                    <span class="material-icons">add_shopping_cart</span>
                                    Add to Cart
                                </Button>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>

    );
}

export default Products;