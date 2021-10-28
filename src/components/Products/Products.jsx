import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'


const Products = (props) => {
    
    const [SearchTerm, setSearchTerm] = useState("")

    return ( 
        <div className="container mx-auto my-auto overflow-auto" id='product-panel'>
            <div className='row'>

                {/* SEARCH BAR */}
                <Row>
                    <Col></Col>
                    <Col>
                    <input 
                        type="text" 
                        placeholder="Search By: Make, Model, or Type" 
                        className="form-control input-sm" 
                        onChange={(event) =>{setSearchTerm(event.target.value)}}
                    />
                    </Col>
                    <Col></Col>
                </Row>


                    {/* PRODUCT CARD */}
                <Row xs={1} md={3} className="g-4">
                    <Col>a</Col>
                        {props.cars.filter(value => {
                            if (SearchTerm === "") {
                                return value
                            } 
                            else if(
                                value.make.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                                || value.model.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                                || value.type.toLowerCase().includes(SearchTerm.toLocaleLowerCase())
                            )
                            {
                                return value
                            }
                        })
                        .map((car) => (
                                <Col >
                                    <Card className='rounded-3'>
                                        <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                                        <Card.Body>
                                            <Card.Title>{car.make} {car.model}</Card.Title>
                                            <Card.Text>
                                                <p>${car.price}</p>
                                                <br />
                                                <p>Average Rating: {car.averageRating}/5</p>
                                            </Card.Text>
                                            <hr />
                                            <h6 className="font-weight-bold"> Description </h6>
                                            <Card.Text>
                                                {car.description}
                                            </Card.Text>
                                            <Link 
                                                to="/car-details"
                                                onClick={() => props.getSingleCar(car)}
                                            >
                                                <span class="material-icons">info</span>
                                                Car Details
                                            </Link>
                                        </Card.Body>
                                        <Button onClick={() => props.addToCart({
                                                UserId: props.user.id,
                                                CarId: car.id,
                                                Quantity: 1
                                            })} variant="success" size="lg" className='border-circle'>
                                            <i class="bi bi-cart4"></i>
                                        </Button> 
                                    </Card>
                                </Col>
                        ))}
                </Row>
                
            </div>
        </div>
    );
}
export default Products;