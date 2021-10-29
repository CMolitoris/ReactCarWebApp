import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import CarAverageRating from '../CarAverageRating/CarAverageRating';
import RatingSection from '../RatingSection/RatingSection';


//! On page refresh all props are lost.
function CarDetails(props) {
    
    useEffect(() => {
        props.getCarRatings(car.id)
    }, [props.car]);

    const car = props.car
    
    
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                {/*//? RELATED CARS SIDE-PANEL */}
                <div className="container">
                    <h4>Related Cars</h4>
                    {/*//? Filters cars by Type and excludes the current car from the list */}
                    {props.cars.filter(
                        value => value.type === car.type 
                        && value.id !== car.id
                    )
                    .map((related)=>(
                        <Card className="mb-4">
                            {/*//? Related Cars - Link to car-details */}
                            <div className="container mt-4">
                                <Link to="/car-details" onClick={() => props.getSingleCar(related)}>
                                    <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg" />
                                </Link>
                            </div>
                            <Card.Body>
                                <Card.Title>{related.make} {related.model}</Card.Title>
                                <Card.Text>
                                    ${related.price} | {related.type}
                                </Card.Text>
                                <hr />
                            </Card.Body>
                            {/*//? Related Cars - Add to cart btn */}
                            <div className="container col-sm-10">
                                <AddToCartButton 
                                    addToCart={props.addToCart} 
                                    userID={props.user} 
                                    carID={car.id} 
                                /> 
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            {/*//? CAR DETAILS CARD */}
            <div className="col-md-8 card">
                <Card>
                    <div className="col-md-6 container mt-3">
                        <Card.Img src="staticImages\Ford_Shelby.jpg" fluid />
                    </div>
                    <Card.Body>
                        <Card.Title className="fs-4 fw-bold">{car.make} {car.model}</Card.Title>
                        <Card.Text className="fs-5">
                            MSRP | ${car.price}
                        </Card.Text>
                        <hr />
                        {/*//? Car Average Rating */}
                        <CarAverageRating ratings={props.ratings} />
                        <hr />
                        <Card.Text>
                            {car.description}
                        </Card.Text>
                        <Card.Text>
                            Type: {car.type} | Make: {car.make} | Model: {car.model}
                        </Card.Text>
                        <Card.Text>
                            Mileage: {car.mileage}
                        </Card.Text>
                        <hr />
                        {/*//? Car Details - Add to cart btn */}
                        <div className=" container col-md-6">
                            <AddToCartButton 
                                addToCart={props.addToCart} 
                                userID={props.user}  
                                carID={car.id} 
                            /> 
                        </div>
                    </Card.Body>
                </Card>
                {/*//? REVIEWS SECTION - Accordion */}
                <RatingSection
                    username={props.username} 
                    carID={car.id} 
                    postRating={props.postRating} 
                    getCarRatings={props.getCarRatings} 
                    ratings={props.ratings}
                    user={props.user} 
                />
            </div>
        </div>
    );
}

export default CarDetails;