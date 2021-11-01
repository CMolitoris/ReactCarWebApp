import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import CarAverageRating from '../CarAverageRating/CarAverageRating';
import RatingSection from '../RatingSection/RatingSection';
import RelatedCars from '../RelatedCars/RelatedCars';
import './CarDetails.css'


//! On page refresh all props are lost.
function CarDetails(props) {
    
    useEffect(() => {
        props.getCarRatings(car.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.car]);

    const car = props.car
    
    
    return ( 
        <div className="container mx-auto my-auto overflow-auto shadow" id='product-panel'>
            <div className='row'>
                <div className="col-sm-3 side-panel shadow">
                    {/*//? RELATED CARS SIDE-PANEL */}
                    <div className="col-10 mx-auto">
                        <p className='mt-3  make-title'>Related Cars</p>
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
                            <Card.Img src={car.image} className='card-image shadow' id='card' fluid />
                        </div>
                        <Card.Body>
                            <Card.Title className="fs-4 fw-bold" >
                                {car.year} {car.make} {car.model} 
                            </Card.Title>
                            <Card.Text className="fs-5">
                                MSRP | ${car.price}
                            </Card.Text>
                            <hr />
                            {/*//? Car Average Rating */}
                            <h6 className="fw-bold">Average Rating:</h6>
                            <CarAverageRating ratings={props.ratings} />
                            <hr />
                            <Card.Text>
                                {car.mileage === 0
                                    ?  <span className="badge bg-success me-2">Condition: New</span>
                                    : <span className="badge bg-warning text-dark me-2">Condition: Used</span>
                                }
                                Type: {car.type} | Make: {car.make} | Model: {car.model}
                                {car.mileage ? `| ${car.mileage} miles` : null}
                            </Card.Text>
                            <Card.Text>
                                {car.description}
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
                        hasReviews={props.ratings.length > 0}
                        />
                </div>
            </div>
        </div>
    );
}

export default CarDetails;