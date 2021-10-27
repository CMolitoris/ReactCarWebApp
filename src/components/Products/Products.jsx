import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col, Button} from 'react-bootstrap';


const Products = (props) => {
    const [SearchTerm, setSearchTerm] = useState("")
    console.log(props.cars)


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
                                        $ {car.price}
                                    </Card.Text>
                                    <hr />
                                    <h6 className="font-weight-bold"> Description </h6>
                                    <Card.Text>
                                        {car.description}
                                    </Card.Text>
                                </Card.Body>
                                <Button onClick={() => this.props.addToCart({
                                        UserId: this.props.userId,
                                        CarId: car.Id,
                                        Quantitiy: 1
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