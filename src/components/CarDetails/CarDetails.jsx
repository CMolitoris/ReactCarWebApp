import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import CarAverageRating from '../CarAverageRating/CarAverageRating';
import RatingSection from '../RatingSection/RatingSection';
import RelatedCars from '../RelatedCars/RelatedCars';
import './CarDetails.css'


//! On page refresh all props are lost.
function CarDetails(props) {
    
    useEffect(() => {
        props.getCarRatings(car.id)
    }, [props.car]);

    const car = props.car
    
    
    return ( 
        <div className="container mx-auto my-auto overflow-hidden shadow" id='product-panel'>
            <div className='row'>
                <div className="col-sm-3 bg-danger shadow">
                    {/*//? RELATED CARS SIDE-PANEL */}
                    <div className="col-10 mx-auto">
                        <h4>Related Cars</h4>
                        {/*//? Filters cars by Type and excludes the current car from the list */}
                        <RelatedCars 
                            cars={props.cars} 
                            car={car} 
                            user={props.user} 
                            addToCart={props.addToCart}
                            getSingleCar={props.getSingleCar} 
                        />
                    </div>
                </div>
                {/*//? CAR DETAILS CARD */}
                <div className='col card' id='card'>
                    <Card id='card'>
                        <div className="col-md-6 mx-auto mt-3">
                            <Card.Img src="staticImages\Ford_Shelby.jpg" className='card-image shadow' fluid />
                        </div>
                        <Card.Body>
                            <Card.Title className="fs-4 fw-bold" >{car.make} {car.model}</Card.Title>
                            <Card.Text className="fs-5">
                                MSRP | ${car.price}
                            </Card.Text>
                            <hr />
                            {/*//? Car Average Rating */}
                            <CarAverageRating ratings={props.ratings} />
                            <hr />
                            <Card.Text>
                                Type: {car.type} | Make: {car.make} | Model: {car.model}
                            </Card.Text>
                            <Card.Text>
                                {car.description}
                            </Card.Text>
                            <Card.Text>
                                Mileage: {car.mileage}
                            </Card.Text>
                            <hr />
                            {/*//? Car Details - Add to cart btn */}
                            <div className="mx-auto col-md-6">
                                <AddToCartButton 
                                    addToCart={props.addToCart} 
                                    userID={props.user ? props.user.id : null}  
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
        </div>
    );
}

export default CarDetails;