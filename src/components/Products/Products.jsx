import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'


const Products = (props) => {
    
    const [SearchTerm, setSearchTerm] = useState("")

    return ( 
        <div className="container mx-auto my-auto overflow-auto shadow" id='product-panel'>
            <div className='row'>
                <Col md={3} className='side-panel'>
                    <Row>
                        <p className='details-font mt-4' >Search Filter</p>
                    </Row>
                    {/* SEARCH BAR */}
                    <Row>
                        <Col>
                        <input 
                            type="text" 
                            placeholder="Search By: Make, Model, or Type" 
                            className="form-control input-sm" 
                            onChange={(event) =>{setSearchTerm(event.target.value)}}
                        />
                        </Col>
                    </Row>
                </Col>

                <Col>
                    {/* PRODUCT CARD */}
                    <Row xs={2} md={3} className="g-4 mt-3">
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
                                        <Card>
                                            <Link to="/car-details" onClick={() => props.getSingleCar(car)}>
                                                <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                                            </Link>
                                            <Card.Body>
                                                <Card.Title>{car.make} {car.model}</Card.Title>
                                                <Card.Text>
                                                    <p>${car.price}</p>
                                                    <p>Rating: {car.averageRating}/5</p>
                                                </Card.Text>
                                                <hr />
                                                <h6 className="font-weight-bold"> Description </h6>
                                                <Card.Text>
                                                    {car.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <Button onClick={() => props.addToCart({
                                                    UserId: props.user.id,
                                                    CarId: car.id,
                                                    Quantity: 1
                                                })} variant="primary" size="lg" className='border-circle'>
                                                <i class="bi bi-cart4"></i>
                                            </Button> 
                                        </Card>
                                ))}
                    </Row>
                </Col>
            </div>
        </div>
    );
}
export default Products;