import React, { useEffect } from 'react';
import { Card, Button, Accordion} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingSection from '../RatingSection/RatingSection';

//! Bug: When the page refreshes the page is lost and the user will have to go back to the product page
//! Not updating state for 'car' when calling props.getSingleCar() function

function CarDetails(props) {
    
    const car = props.cars.filter(car => car.id === props.location.state.carID)
    
    useEffect(() => {
        props.getCarRatings(car[0].id)
    }, []);

    
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                <div className="container">
                    <h4>Related Cars</h4>
                    {/* Related Cars Cards - Filters cars by Type and excludes the current car from the list */}
                    {props.cars.filter(
                        value => value.type.toLowerCase() === car[0].type.toLowerCase() 
                        && value.id != car[0].id
                    )
                    .map((car)=>(
                        <Card className="mb-4">
                            <div className="container mt-4">
                                <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
                            </div>
                            <Card.Body>
                                <Card.Title>{car.make} {car.model}</Card.Title>
                                <Card.Text>
                                    ${car.price} | {car.type}
                                </Card.Text>
                                <hr />
                                {/* Related Cars - Link to car-details */}
                                <Link to={{ pathname: "/car-details", state: { carID: car.id} }}>
                                        <span class="material-icons">info</span>
                                        Car Details
                                    </Link>
                            </Card.Body>
                            {/* Related Cars - Add to cart btn */}
                            <div className="container col-sm-10">
                                <Button className="form-control mb-2" onClick={() => props.addToCart({
                                        UserId: props.user.id,
                                        CarId: car.id,
                                        Quantity: 1
                                    })} variant="success btn-sm">
                                    <span class="material-icons">add_shopping_cart</span>
                                    Add to Cart
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            {/* Car Details Card */}
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
                        {/* Car Details - Add to cart btn */}
                        <div className=" container col-md-6">
                            <Button className="form-control" 
                                onClick={() => props.addToCart({
                                    UserId: props.user.id,
                                    CarId: car.id,
                                    Quantity: 1
                                })} 
                                variant="success">
                                <span class="material-icons">add_shopping_cart</span>
                                Add to Cart
                            </Button> 
                        </div>
                    </Card.Body>
                </Card>
                {/* TODO: Add Accordion here for reviews section */}
            <RatingSection 
                carID={props.location.state.carID} 
                postRating={props.postRating} 
                getCarRatings={props.getCarRatings} 
                ratings={props.ratings} 
            />
            </div>
        </div>
    );
}
export default CarDetails;