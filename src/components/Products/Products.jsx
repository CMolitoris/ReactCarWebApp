import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';


const Products = (props) => {
    const [SearchTerm, setSearchTerm] = useState("")
    console.log(props.cars)


    return ( 
        <Row xs={1} md={3} className="g-4">
            <input 
                type="text" 
                placeholder="Search By: Make, Model, or Type" 
                className="form-control" 
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
                                <Card.Img variant="top" src=""/>
                                <Card.Body>
                                    <Card.Title>{car.make, car.model}</Card.Title>
                                    <Card.Text>
                                        {car.price}
                                        {car.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                ))}
        </Row>
    );
}

export default Products;