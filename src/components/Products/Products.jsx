import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css'
import AddToCartButton from '../AddToCartButton/AddToCartButton';


const Products = (props) => {
    const [SearchTerm, setSearchTerm] = useState("")

    const setSearch = (make) => {
        setSearchTerm(make)
    }

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
                    <Row>
                        <div align = "center" className = "p-4">
                        <Form>
                            <FloatingLabel className = "make-title">Filter by Make</FloatingLabel>
                            <Form.Control 
                                as='select' 
                                aria-label='Make Filter' 
                                onChange = {(event) => {setSearchTerm(event.target.value)}}>
                                    <option defaultValue value = "">
                                        Please Select a Make...
                                    </option>
                                {props.carModels.map(car => {
                                    return <option  
                                    value = {car} >
                                        {car}
                                    </option>
                            })}</Form.Control>
                        </Form>
                        <Button id='form-button-style' className='mt-3 details-font' onClick = {() => {setSearchTerm("")}}>Reset</Button>
                        </div>
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
                            return null
                        })
                        .map((car) => (
                                <Card key={car.id.toString()} id='card'>
                                    <Link to="/car-details" onClick={() => props.getSingleCar(car)}>
                                        <Card.Img variant="top" src={car.image} className= 'shadow' id='card'/>
                                    </Link>
                                    <Card.Body>
                                        <Card.Title>{car.year} {car.make} {car.model}</Card.Title>
                                        <Card.Text>
                                            MSRP | ${car.price}
                                        </Card.Text>
                                        <hr />
                                        <h6 className="font-weight-bold"> Description </h6>
                                        <Card.Text>
                                            {car.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <AddToCartButton 
                                        addToCart={props.addToCart} 
                                        userID={ props.user ? props.user.id : null} 
                                        carID={car.id} 
                                    />  
                                </Card>
                            ))}
                    </Row>
                </Col>
            </div>
        </div>
    );
}

export default Products;