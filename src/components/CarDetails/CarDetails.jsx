import React from 'react';
import { Card, Button, Accordion} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function CarDetails(props) {

    const car = props.cars.filter(car => car.id === props.location.state.carID)
    
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                <div className="container">
                    <h4>Related Cars</h4>
                    {/* Related Cars - Filters cars by Type and excludes the current car from the list */}
                    {props.cars.filter(
                        value => value.type.toLowerCase() === car[0].type.toLowerCase() 
                        && value.id != car[0].id
                    )
                    .map((car)=>(
                        <Card className="mb-4">
                            <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                            <Card.Body>
                                <Card.Title>{car.make} {car.model}</Card.Title>
                                <Card.Text>
                                    $ {car.price} | {car.type}
                                </Card.Text>
                                <hr />
                                <Link to={{ pathname: "/car-details", state: { carID: car.id} }}>
                                        <span class="material-icons">info</span>
                                        Car Details
                                    </Link>
                            </Card.Body>
                            <div className="container col-sm-10">
                                <Button className="form-control" onClick={() => props.addToCart({
                                        UserId: props.user.id,
                                        CarId: car.id,
                                        Quantity: 1
                                    })} variant="success btn-sm">
                                    <span class="material-icons">add_shopping_cart</span>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="col-md-8 card">
                <Card>
                    <div className="col-md-6 container mt-3">
                        <Card.Img src="staticImages\Ford_Shelby.jpg" fluid />
                    </div>
                    <Card.Body>
                        <Card.Title>{car[0].make} {car[0].model}</Card.Title>
                        <Card.Text>
                            <h6>${car[0].price}</h6>
                        </Card.Text>
                        <hr />
                        <Card.Text>
                            <h6>Average Rating: {car[0].averageRating}/5</h6>
                        </Card.Text>
                        <hr />
                        <Card.Text>
                            {car[0].description}
                        </Card.Text>
                        <Card.Text>
                            Type: {car[0].type} | Make: {car[0].make} | Model: {car[0].model}
                        </Card.Text>
                        <Card.Text>
                            Mileage: {car[0].mileage}
                        </Card.Text>
                        <hr />
                        <Button onClick={() => props.addToCart({
                                        UserId: props.user.id,
                                        CarId: car.id,
                                        Quantity: 1
                                    })} variant="success">
                                    <span class="material-icons">add_shopping_cart</span>
                                    Add to Cart
                                </Button> 
                     
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default CarDetails;