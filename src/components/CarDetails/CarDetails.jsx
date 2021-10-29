import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RatingSection from '../RatingSection/RatingSection';

//! Bug: When the page refreshes the page is lost and the user will have to go back to the product page
//! Not updating state for 'car' when calling props.getSingleCar() function

function CarDetails(props) {
    
    useEffect(() => {
        props.getCarRatings(car.id)
    }, [props.car]);

    const car = props.car
    
    const averageRating = function(ratings) {
        let avg = 0
        let stars = []
        ratings.forEach(rating => avg += rating.ratingScore)
        avg = Math.round(avg / ratings.length)
        for (let i = 0; i < 5; i++) {
            if (i < avg){
                stars.push("bi bi-star-fill text-warning")
            }
            else {
                stars.push("bi bi-star-fill text-dark")
            }
        }
        return stars
    }
   
    return ( 
        <div className="row">
            <div className="col-sm-3 bg-danger">
                <div className="container">
                    <h4>Related Cars</h4>
                    {/*//? Related Cars Cards - Filters cars by Type and excludes the current car from the list */}
                    {props.cars.filter(
                        value => value.type === car.type 
                        && value.id != car.id
                    )
                    .map((related)=>(
                        <Card className="mb-4">
                            {/*//? Related Cars - Link to car-details */}
                            <div className="container mt-4">
                                <Link to="/car-details" onClick={() => props.getSingleCar(related)}>
                                    <Card.Img variant="top" src="staticImages\Ford_Shelby.jpg"/>
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
                                <Button className="form-control mb-2" onClick={() => props.addToCart({
                                        UserId: props.user.id,
                                        CarId: related.id,
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
            {/*//? Car Details Card */}
            <div className="col-md-8 card">
                <Card>
                    <div className="col-md-6 container mt-3">
                        <Card.Img src="staticImages\Ford_Shelby.jpg" fluid />
                    </div>
                    <Card.Body>
                        <Card.Title>{car.make} {car.model}</Card.Title>
                        <Card.Text>
                            <h6>${car.price}</h6>
                        </Card.Text>
                        <hr />
                        <Card.Text>
                        {/*//? Car Rating */}
                            <h5>Average Rating:</h5>
                           {
                            averageRating(props.ratings).map((star) =>{
                                return <i class={star}></i>
                            })
                           }
                            <p>({props.ratings.length} reviews)</p>
                        </Card.Text>
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
            {/*//? Accordion for reviews section */}
            <RatingSection 
                carID={car.id} 
                postRating={props.postRating} 
                getCarRatings={props.getCarRatings} 
                ratings={props.ratings} 
            />
            </div>
        </div>
    );
}
export default CarDetails;